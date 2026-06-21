# Video Brief — Next.js + Google Sheets + Vercel

## Loyiha tuzilmasi

```
video-brief/
├── app/
│   ├── api/brief/route.ts   ← serverless API
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
├── components/
│   └── BriefForm.tsx        ← forma komponenti
├── lib/
│   └── sheets.ts            ← Google Sheets helper
└── .env.example
```

---

## 1. Google Cloud sozlash

### Service Account yaratish

1. https://console.cloud.google.com ga kiring
2. Yangi loyiha yarating (yoki mavjudini tanlang)
3. **APIs & Services → Enable APIs** → "Google Sheets API" ni yoqing
4. **APIs & Services → Credentials → Create Credentials → Service Account**
5. Service account nomini kiriting → **Create and Continue**
6. **Keys** tabiga o'ting → **Add Key → Create new key → JSON**
7. JSON fayl yuklab olindi — uni saqlang


## 2. Google Sheets sozlash

1. https://sheets.google.com da yangi sheet oching
2. Birinchi qatorga sarlavhalar yozing:

```
Sana | Ism | Telefon | Ijtimoiy | Tadbir sanasi | Video turi | Davomiylik | Platform | Uslub | Musiqa | Joylashuv | Talablar | Bujet
```

3. Sheet URL dan ID ni oling:
   `https://docs.google.com/spreadsheets/d/`**`SHU_ID`**`/edit`

4. Sheet ni service account bilan ulashing:
   - Sheet ichida **Share** tugmasi
   - `client_email` ni kiriting → **Editor** roli → **Send**

---

## 3. Lokal ishga tushirish

```bash
# O'rnatish
npm install

# .env.local fayl yarating
cp .env.example .env.local
# Keyin .env.local ni to'ldiring

# Dev server
npm run dev
```

`.env.local` to'ldirish:
```
GOOGLE_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nABC123...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms
```

> **Muhim:** `GOOGLE_PRIVATE_KEY` da `\n` lar qolsin, ularni o'zgartirmang.

---

## 4. Vercel deploy

```bash
# Vercel CLI o'rnatish
npm i -g vercel

# Deploy
vercel
```

### Vercel dashboard da environment variables qo'shish