# ✨ AIWardrobe — AI-Powered Digital Closet & Personal Fashion Assistant

**AIWardrobe** is a full-stack mobile application built with **React Native (Expo)**, **TypeScript**, **Python FastAPI**, and **Google Gemini Multimodal AI**. It digitizes a user's wardrobe using computer vision, recommends weather-aware daily outfits, synthesizes custom looks by occasion, and provides a conversational AI fashion stylist (**Aura**).

---

## 👥 Team Members & Contributions

| Name | Email | Role & Module Ownership | Contribution |
| :--- | :--- | :--- | :---: |
| **MD Sabbir Hushen Riyad** *(ID: 0112310126)* | `sriyadh2002@gmail.com` | **Team Lead** — Core App Architecture, FastAPI & Gemini Vision Engine, API Client Service, Home Dashboard & System Integration | **40%** |
| **Imthiyaz Ahmed** | `imthiyazahmed1425@gmail.com` | **Digital Wardrobe Module** — Wardrobe Catalog Grid, AI Smart Add-Item Flow, Garment Details, Search & Category Filtering | **20%** |
| **Erfan Ali** | `erfanali45452@gmail.com` | **AI Outfit Synthesis Module** — Context-Aware Outfit Generator, Look Details View, Reusable Cards & UI Components | **20%** |
| **Sefaul Islam** | `sefaulislam.off@gmail.com` | **Conversational AI Stylist & User Module** — "Aura" Fashion Concierge Chat, Authentication Screens, Profile & Preferences | **20%** |

---

## 🚀 Key Features

1. **🏠 Smart Home Dashboard**
   - Real-time weather detection card and temperature-adjusted styling context.
   - **"AI Pick For You"** daily outfit recommendation with instant wear tracking.
2. **📸 Multimodal Vision Garment Auto-Tagging**
   - Upload or snap a photo of any garment; **Google Gemini Vision AI** automatically extracts the garment's name, category, color hex code, style taxonomy, season suitability, and styling tips.
3. **🗄️ Interactive Digital Wardrobe**
   - Instant filtering by category (`Tops`, `Bottoms`, `Dresses`, `Shoes`, `Accessories`) and real-time keyword/brand search with persistent storage.
4. **⚡ AI Outfit Generator**
   - Synthesizes complete outfits from the user's wardrobe tailored to specific occasions (`Office`, `Party`, `Date`, `Casual`, `Travel`), aesthetic styles (`Minimal`, `Streetwear`, `Formal`), and color palettes.
5. **💬 "Aura" Conversational AI Stylist**
   - Interactive fashion concierge chatbot providing editorial styling advice and smart follow-up prompt chips.

---

## 🛠️ Tech Stack

- **Frontend (Mobile & Web):** React Native, Expo SDK, Expo Router, TypeScript, NativeWind
- **Backend API:** Python 3.12, FastAPI, Uvicorn, Pydantic
- **AI / ML Engine:** Google Gemini Multimodal Vision & LLM (`google-genai`)
- **Database & Storage:** Local Persistent Store + Supabase Cloud Integration

---

## 📡 Backend REST API Endpoints

Interactive Swagger UI documentation is available at `http://localhost:8000/docs` when the backend server is running.

| Method | Endpoint | Description |
| :---: | :--- | :--- |
| `GET` | `/api/health` | Service health check and live Gemini AI model status |
| `POST` | `/api/wardrobe/auto-tag` | Multimodal Vision garment image analysis & auto-tagging |
| `POST` | `/api/outfits/generate` | Context-aware outfit synthesis from wardrobe inventory |
| `GET` | `/api/outfits/daily-pick` | Generates the signature daily recommended outfit |
| `POST` | `/api/stylist/chat` | Conversational endpoint for the "Aura" AI fashion stylist |

---

## ⚙️ How to Run Locally

### 1. Start the Python FastAPI Backend
```bash
cd backend
pip install -r requirements.txt
python run.py
```
*The API server will start at `http://localhost:8000` (Swagger Docs: `http://localhost:8000/docs`).*

### 2. Start the React Native Expo App
```bash
npm install
npm run web
```
*Open `http://localhost:8081` in your browser or scan the QR code using the Expo Go app on Android/iOS.*
