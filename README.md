# 🇪🇺 Erasmus+ Youth Exchange Portal

Portal do zarządzania wymianami młodzieżowymi w ramach programu Erasmus+.

## 📁 Struktura projektu

```
erasmus-app/
├── erasmus-frontend/    # Next.js 14 frontend
└── eventyay-server/     # Flask/Python backend API
```

## 🚀 Szybki start (lokalne uruchomienie)

### Frontend

```bash
cd erasmus-frontend
npm install
npm run dev
```

Frontend będzie dostępny na: http://localhost:3000

### Backend (z Docker)

```bash
cd eventyay-server
docker-compose -f docker-compose.local.yml up -d  # PostgreSQL + Redis
pip install -r requirements.txt
flask run --port 8080
```

API będzie dostępne na: http://localhost:8080

## ☁️ Deployment na produkcję

### Frontend → Vercel

1. Połącz repozytorium z [Vercel](https://vercel.com)
2. Ustaw "Root Directory" na `erasmus-frontend`
3. Dodaj zmienną środowiskową:
   - `NEXT_PUBLIC_API_URL` = URL twojego backendu

### Backend → Railway

1. Utwórz projekt na [Railway](https://railway.app)
2. Dodaj PostgreSQL i Redis z marketplace
3. Połącz repozytorium, wskaż `eventyay-server`
4. Zmienne środowiskowe zostaną automatycznie skonfigurowane

## 🔧 Zmienne środowiskowe

### Frontend (`erasmus-frontend`)

| Zmienna | Opis | Przykład |
|---------|------|----------|
| `NEXT_PUBLIC_API_URL` | URL API backendu | `https://api.example.com` |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Google OAuth ID | `123...apps.googleusercontent.com` |

### Backend (`eventyay-server`)

| Zmienna | Opis | Przykład |
|---------|------|----------|
| `DATABASE_URL` | PostgreSQL connection | `postgresql://user:pass@host:5432/db` |
| `REDIS_URL` | Redis connection | `redis://host:6379/0` |
| `SECRET_KEY` | Flask secret | losowy ciąg znaków |

## 📋 Funkcjonalności

### Dla uczestników
- 🔍 Przeglądanie dostępnych wymian
- 📝 Aplikowanie na wydarzenia
- 📄 Certyfikaty i Youthpass

### Dla organizacji
- 📅 Tworzenie i zarządzanie wydarzeniami
- 👥 Zarządzanie uczestnikami
- 💰 Budżety i rozliczenia
- 📧 Powiadomienia email

### Dla administratorów
- 🔐 Zarządzanie użytkownikami
- 📊 Raporty i statystyki
- ⚙️ Konfiguracja systemu

## 🛠️ Technologie

- **Frontend**: Next.js 14, React, Tailwind CSS, shadcn/ui
- **Backend**: Flask, SQLAlchemy, PostgreSQL, Redis
- **Auth**: JWT, Google OAuth
- **Deploy**: Vercel, Railway

## 📄 Licencja

MIT License

---

🇪🇺 Współfinansowane przez Unię Europejską w ramach programu Erasmus+

