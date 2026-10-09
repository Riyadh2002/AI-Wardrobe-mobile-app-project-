import React, { useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { ChatBubble } from '../../components/ChatBubble';
import { AIThinkingIndicator } from '../../components/AIThinkingIndicator';
import { BottomNavigation } from '../../components/BottomNavigation';
import { INITIAL_MESSAGES, SUGGESTED_PROMPTS } from '../../mock/stylist';
import { MOCK_OUTFITS } from '../../mock/outfits';
import { StylistMessage, Outfit } from '../../types';
import { api } from '../../services/api';

export default function AIStylistScreen() {
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);

  const [messages, setMessages] = useState<StylistMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    const userMessage: StylistMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: 'Just now',
    };

    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    if (!textToSend) setInputText('');
    setIsThinking(true);

    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);

    try {
      const result = await api.chatWithStylist(text, newHistory);

      const aiMessage: StylistMessage = {
        id: `ai-${Date.now()}`,
        sender: 'stylist',
        text: result.message,
        timestamp: 'Just now',
        outfitSuggestion: result.outfitSuggestion,
        suggestedPrompts: result.suggestedPrompts,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch {
      // Handled cleanly by api fallback
    } finally {
      setIsThinking(false);
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 150);
    }
  };

  const handlePromptClick = (prompt: string) => {
    handleSend(prompt);
  };

  const handleOutfitPress = (outfit: Outfit) => {
    router.push('/outfits/details' as any);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Top Header */}
        <View style={styles.header}>
          <View style={styles.headerTitleGroup}>
            <View style={styles.sparkleBadge}>
              <Text style={styles.sparkleIcon}>✨</Text>
            </View>
            <View>
              <Text style={styles.headerTitle}>AI Stylist</Text>
              <Text style={styles.headerSubtitle}>
                Your personal fashion assistant • Online
              </Text>
            </View>
          </View>
        </View>

        <KeyboardAvoidingView
          style={styles.keyboardView}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
        >
          <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={styles.chatScrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Ambient Purple Glow behind chat */}
            <View style={styles.ambientGlow} />

            {/* Chat Messages */}
            {messages.map((message) => (
              <ChatBubble
                key={message.id}
                message={message}
                onOutfitPress={handleOutfitPress}
              />
            ))}

            {isThinking && (
              <AIThinkingIndicator label="Stylist is curating combinations..." />
            )}

            {/* Quick Suggested Prompts Horizontal Pills */}
            <View style={styles.suggestionsContainer}>
              <Text style={styles.suggestionsLabel}>SUGGESTED QUESTIONS</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.suggestionsScroll}
              >
                {SUGGESTED_PROMPTS.map((prompt, idx) => (
                  <TouchableOpacity
                    key={idx}
                    activeOpacity={0.75}
                    onPress={() => handlePromptClick(prompt)}
                    style={styles.promptChip}
                  >
                    <Text style={styles.promptChipText}>{prompt}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View style={{ height: 110 }} />
          </ScrollView>

          {/* Chat Input Bar */}
          <View style={styles.inputBarWrapper}>
            <View style={styles.inputContainer}>
              <TextInput
                value={inputText}
                onChangeText={setInputText}
                placeholder="Ask your stylist anything about fashion..."
                placeholderTextColor="#71717A"
                style={styles.textInput}
                onSubmitEditing={() => handleSend()}
              />

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handleSend()}
                disabled={!inputText.trim()}
                style={[
                  styles.sendButton,
                  inputText.trim() ? styles.sendButtonActive : styles.sendButtonDisabled,
                ]}
              >
                <Text style={styles.sendButtonArrow}>↑</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>

        <BottomNavigation currentTab="stylist" />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09090B',
  },
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
    backgroundColor: '#09090B',
  },
  headerTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sparkleBadge: {
    width: 38,
    height: 38,
    borderRadius: 14,
    backgroundColor: '#7C3AED',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 6,
  },
  sparkleIcon: {
    fontSize: 18,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  headerSubtitle: {
    color: '#34D399',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  chatScrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  ambientGlow: {
    position: 'absolute',
    top: 60,
    left: 40,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(124, 58, 237, 0.08)',
    filter: 'blur(50px)',
  },
  suggestionsContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  suggestionsLabel: {
    color: '#71717A',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  suggestionsScroll: {
    gap: 8,
  },
  promptChip: {
    backgroundColor: '#141418',
    borderWidth: 1,
    borderColor: 'rgba(124, 58, 237, 0.3)',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 14,
  },
  promptChipText: {
    color: '#C4B5FD',
    fontSize: 13,
    fontWeight: '600',
  },
  inputBarWrapper: {
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === 'ios' ? 76 : 68,
    backgroundColor: '#09090B',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#141418',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    paddingLeft: 16,
    paddingRight: 6,
    height: 52,
  },
  textInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonActive: {
    backgroundColor: '#7C3AED',
  },
  sendButtonDisabled: {
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  sendButtonArrow: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
    marginTop: -2,
  },
});
