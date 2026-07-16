Backend deployment

Required environment variables (set these in your host/provider):

- MONGO_URI: MongoDB connection string
- PORT: optional (default 5000)
- JWT_SECRET: random secret for signing tokens
- RESEND_API_KEY: Resend API key for sending emails
- CLIENT_URL: frontend base URL (e.g. https://your-frontend.vercel.app)
- FRONTEND_URL: optional
- NODE_ENV: production

Deploy options

Render / Heroku / Railway

1. Push your repo to GitHub.
2. Create a new Web Service on Render/Heroku and connect your GitHub repo.
3. Set the environment variables above in the service settings.
4. Build & deploy – the platform will run `npm install` then `npm start` (Procfile present).

Self-hosting / Docker

- Ensure `PORT` and `MONGO_URI` are set.
- Start with `npm install` then `npm start`.

Serving frontend

- If you want to host both frontend and backend together, build the frontend and place the `dist` folder at `frontend/dist` in the repo. The backend `index.js` will serve it when `NODE_ENV === 'production'`.

Notes

- For CORS allow-listing, add your frontend URL in `CLIENT_URL` or `FRONTEND_URL`.
- After deployment, set `VITE_API_URL` in your frontend deployment to `https://<your-backend>/api/auth` so the frontend calls the correct backend API.
