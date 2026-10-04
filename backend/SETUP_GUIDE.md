# AIWardrobe Backend & AI Agent Setup Guide 🚀

This guide explains how to configure your credentials, start the backend service, and test the AI agents.

---

## 1. Quick Start (Run Immediately)

The backend is built with **Intelligent Fallback Mode**. You can run and test it **immediately** even before getting external API keys!

### Step 1: Install Python Dependencies
Open PowerShell or your terminal in the `backend` folder:
```powershell
cd "d:\Moblie App development Project\AIWardrobe\backend"
py -3.12 -m pip install -r requirements.txt
```
*(Or use `python -m pip install -r requirements.txt` if python is aliased on your system)*

### Step 2: Start the Backend Server
```powershell
py run.py
```
Your backend will start at:
- **API Server**: `http://localhost:8000`
- **Interactive Swagger Docs**: `http://localhost:8000/docs`
- **Health Check**: `http://localhost:8000/api/health`

---

## 2. Setting Up Live AI Agents (Google Gemini)

To enable live multimodal vision and conversational fashion intelligence:

### Step 1: Get your Free Google Gemini API Key
1. Go to **[Google AI Studio](https://aistudio.google.com/)**.
2. Sign in with any Google account.
3. Click **"Get API key"** in the top-left navigation.
4. Click **"Create API key"** (select "Create in new project").
5. Copy your generated key.
   > **Note**: Google AI Studio provides a free tier for Gemini 2.5 Flash / 1.5 Flash with **no credit card required**!

### Step 2: Add the Key to `.env`
Open `backend/.env` and paste your key:
```env
GEMINI_API_KEY=AIzaSyYourGeneratedKeyHere
```
Save the file. If `py run.py` is running, it will automatically reload with Live AI enabled!

---

## 3. Testing Your AI Endpoints in Swagger

Visit `http://localhost:8000/docs` in your web browser. You will see 3 core AI endpoints:

1. **`POST /api/wardrobe/auto-tag`**:
   - Analyzes any garment image URL or Base64.
   - Example payload:
     ```json
     {
       "image_url": "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800",
       "hint": "Crisp cotton button-down shirt"
     }
     ```
   - Returns structured attributes: Category, Color, Hex code, Style, Season, Material, and Editorial Styling Tips.

2. **`POST /api/outfits/generate`**:
   - Synthesizes an outfit from available items, weather, and occasion.
   - Example payload:
     ```json
     {
       "occasion": "Date",
       "style": "Minimal",
       "color_preference": "Neutral",
       "temperature": "22°C",
       "weather_condition": "Clear evening"
     }
     ```
   - Returns selected pieces, "Why this works" breakdown, and styling tricks.

3. **`POST /api/stylist/chat`**:
   - Talk with "Aura", your personal fashion advisor agent.
   - Example payload:
     ```json
     {
       "message": "What jacket pairs best with my poplin shirt for dinner?"
     }
     ```
   - Returns elevated advice and quick-reply suggestion chips.

---

## 4. Optional: Supabase (Persistent Database & Storage)

If you wish to store user wardrobes permanently in the cloud:

1. Create a free account at **[supabase.com](https://supabase.com/)**.
2. Create a new project (e.g. `closet-ai`).
3. Under **Project Settings > API**, copy:
   - **Project URL** -> `SUPABASE_URL` in `backend/.env`
   - **anon / public key** -> `SUPABASE_ANON_KEY` in `backend/.env`

### Run this SQL in Supabase SQL Editor:
```sql
-- 1. Clothing Items Table
create table public.clothing_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  name text not null,
  category text not null,
  color text not null,
  color_hex text default '#18181B',
  style text not null,
  season text not null,
  brand text,
  image_url text not null,
  is_favorite boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Saved Outfits Table
create table public.outfits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  name text not null,
  occasion text not null,
  style text not null,
  confidence_score int default 95,
  explanation text,
  item_ids text[] not null,
  is_favorite boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Storage Bucket for Garment Photos
insert into storage.buckets (id, name, public) 
values ('wardrobe-images', 'wardrobe-images', true)
on conflict do nothing;
```

---

## 5. Connecting the Mobile App (React Native / Expo)

By default, the React Native app connects to `http://localhost:8000/api` when testing in browser.

### For Physical Phone / Expo Go Testing:
If testing on your physical phone with Expo Go, your phone cannot access `localhost`.
1. Find your computer's local Wi-Fi IP address (e.g. `192.168.1.45`) by running `ipconfig` in PowerShell.
2. In the root of `AIWardrobe`, create or edit `.env`:
   ```env
   EXPO_PUBLIC_API_URL=http://192.168.1.45:8000/api
   ```
3. Restart Expo: `npx expo start -c`.
