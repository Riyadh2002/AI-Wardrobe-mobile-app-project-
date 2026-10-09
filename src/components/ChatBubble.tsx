import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Image } from 'expo-image';
import { StylistMessage, Outfit } from '../types';

interface ChatBubbleProps {
  message: StylistMessage;
  onOutfitPress?: (outfit: Outfit) => void;
  style?: ViewStyle;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  onOutfitPress,
  style,
}) => {
  const isUser = message.sender === 'user';

  return (
    <View
      style={[
        styles.container,
        isUser ? styles.userContainer : styles.stylistContainer,
        style,
      ]}
    >
      {!isUser && (
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>AI</Text>
        </View>
      )}

      <View style={[styles.bubbleWrapper, isUser && styles.bubbleWrapperUser]}>
        <View
          style={[
            styles.bubble,
            isUser ? styles.userBubble : styles.stylistBubble,
          ]}
        >
          <Text style={[styles.messageText, isUser && styles.userMessageText]}>
            {message.text}
          </Text>
        </View>

        {/* Embedded Outfit Recommendation */}
        {message.outfitSuggestion && (
          <TouchableOpacity
            activeOpacity={0.88}
            onPress={() => onOutfitPress?.(message.outfitSuggestion!)}
            style={styles.outfitCard}
          >
            <Image
              source={{ uri: message.outfitSuggestion.imageUrl }}
              style={styles.outfitImage}
              contentFit="cover"
            />
            <View style={styles.outfitInfo}>
              <View style={styles.badgeRow}>
                <Text style={styles.outfitTag}>✨ Recommended Outfit</Text>
              </View>
              <Text style={styles.outfitTitle}>
                {message.outfitSuggestion.name}
              </Text>
              <Text style={styles.outfitSubtitle} numberOfLines={2}>
                {message.outfitSuggestion.description}
              </Text>
              <Text style={styles.viewLookText}>View Complete Look →</Text>
            </View>
          </TouchableOpacity>
        )}

        <Text style={[styles.timestamp, isUser && styles.userTimestamp]}>
          {message.timestamp}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 10,
  },
  userContainer: {
    justifyContent: 'flex-end',
  },
  stylistContainer: {
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#7C3AED',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  bubbleWrapper: {
    maxWidth: '82%',
  },
  bubbleWrapperUser: {
    alignItems: 'flex-end',
  },
  bubble: {
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  userBubble: {
    backgroundColor: '#7C3AED',
    borderBottomRightRadius: 4,
  },
  stylistBubble: {
    backgroundColor: 'rgba(24, 24, 27, 0.95)',
    borderWidth: 1,
    borderColor: 'rgba(124, 58, 237, 0.25)',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    color: '#F5F5F5',
    fontSize: 14,
    lineHeight: 20,
  },
  userMessageText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  timestamp: {
    color: '#71717A',
    fontSize: 11,
    marginTop: 4,
    marginLeft: 4,
  },
  userTimestamp: {
    marginRight: 4,
  },
  outfitCard: {
    marginTop: 10,
    borderRadius: 16,
    backgroundColor: '#141418',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    overflow: 'hidden',
  },
  outfitImage: {
    width: '100%',
    height: 160,
  },
  outfitInfo: {
    padding: 12,
  },
  badgeRow: {
    marginBottom: 4,
  },
  outfitTag: {
    color: '#C4B5FD',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  outfitTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 2,
  },
  outfitSubtitle: {
    color: '#A1A1AA',
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 8,
  },
  viewLookText: {
    color: '#A78BFA',
    fontSize: 12,
    fontWeight: '700',
  },
});
