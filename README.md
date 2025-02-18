# Telegram Weather Bot

This is a Telegram bot built with NestJS that provides daily weather updates to users. It integrates with the OpenWeatherMap API and features an admin panel secured with Google Login authentication. The bot uses PostgreSQL for data storage.

[Dashboard Link](https://telegram-weather-bot-1-7p2l.onrender.com)

## Features
- 🌤️ Daily weather updates via Telegram.
- 🔑 Admin panel with Google Login authentication.
- ☁️ Integration with OpenWeatherMap API for accurate weather data.
- 💾 PostgreSQL for storing user and weather data.

## Prerequisites
- Node.js and npm
- NestJS CLI
- PostgreSQL
- OpenWeatherMap API Key
- Google OAuth credentials for admin panel login

## Installation
1. Clone the repository:
    ```bash
    git clone <repository_url>
    cd Telegram_Weather_Bot
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Copy the `.env.example` file to `.env` and fill in the required environment variables:

    **Backend (.env)**
env
- `DATABASE_URL="postgresql://user:password@localhost:5432/telegram_bot"`

- `PORT=3000`

- `TELEGRAM_BOT_TOKEN="your_bot_token"`

- `WEATHER_API_KEY="your_weather_api_key"`

- `GOOGLE_CLIENT_ID="your_google_client_id"`

- `GOOGLE_CLIENT_SECRET="your_google_client_secret"`

- `JWT_SECRET="your_jwt_secret"`

**Frontend (.env)**
env
- `VITE_FIREBASE_API_KEY=your_api_key`

- `VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com`

- `VITE_FIREBASE_PROJECT_ID=your_project_id`

- `VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com`

- `VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id`

- `VITE_FIREBASE_APP_ID=your_app_id`

## Running the Application
- Start the development server:
    ```bash
    npm run start:dev
    ```
- Build and run in production:
    ```bash
    npm run build
    npm run start:prod
    ```

## Project Structure
```
telegram-weather-bot/
├── backend/
│   ├── src/
│   │   ├── admin/         # Admin panel logic
│   │   ├── auth/          # Authentication
│   │   ├── config/        # Configuration
│   │   ├── prisma/        # Database connection
│   │   ├── telegram/      # Telegram bot logic
│   │   ├── weather/       # Weather API integration
│   │   ├── app.module.ts
│   │   └── main.ts
│   └── prisma/
│       └── schema.prisma  # Database schema
├── frontend/
│   ├── src/
│   │   ├── components/AdminPanel
│   │   ├── App.jsx
│   ├── public/
│   ├── package.json
└── README.md
```
#  Bot Commands

- /start - Initialize the bot
- /subscribe <city> - Subscribe to daily weather updates
- /unsubscribe - Unsubscribe from updates
- /weather <city> - Get current weather


#  License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to copy this and use it in your GitHub repository. If you need more sections or adjustments, let me know! 🚀

