# MERN Event Planner — 24‑hour Sprint Kit

**API:** Node + Express + Mongoose + Zod  
**Web:** React + Vite + Axios + React Router

## Run

```bash
# API
cd server
cp .env.example .env
npm i && npm run build && npm start

# Web
cd ../client
npm i && npm run dev
```

- API: http://localhost:4000/v1
- Web: http://localhost:5173

### Endpoints
- `POST   /v1/events` — create (title, date required; category enum)
- `GET    /v1/events` — list with filters: `category, from, to, q, page, limit`
- `GET    /v1/events/:id` — get by id
- `PUT    /v1/events/:id` — update (partial validation)
- `DELETE /v1/events/:id` — delete
- `GET    /v1/events/meta/categories` — fixed categories

### Quick cURL
```bash
curl -X POST http://localhost:4000/v1/events   -H 'Content-Type: application/json'   -d '{"title":"Team Sync","date":"2025-09-30T10:00:00Z","category":"work","description":"Weekly"}'

curl 'http://localhost:4000/v1/events?category=work'
```

### Submission
Subject: **Assessment for Associate Mern Stack Developer**  
Include repo link/zip + screenshots (filters, CRUD, validation error).
