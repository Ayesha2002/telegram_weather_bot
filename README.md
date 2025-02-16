# Telegram Weather Bot

This is a Telegram bot built with NestJS that provides daily weather updates to users. It integrates with the OpenWeatherMap API and features an admin panel secured with Google Login authentication. The bot uses MongoDB for data storage.

## Features
- 🌤️ Daily weather updates via Telegram.
- 🔑 Admin panel with Google Login authentication.
- ☁️ Integration with OpenWeatherMap API for accurate weather data.
- 💾 MongoDB for storing user and weather data.

## Prerequisites
- [Node.js](https://nodejs.org/) and npm
- [NestJS CLI](https://docs.nestjs.com/cli/overview)
- [MongoDB](https://www.mongodb.com/)
- [OpenWeatherMap API Key](https://openweathermap.org/api)
- [Google OAuth credentials](https://console.cloud.google.com/) for admin panel login

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
    ```env
    TELEGRAM_BOT_TOKEN=your_telegram_bot_token
    MONGO_URI=your_mongodb_uri
    OPENWEATHER_API_KEY=your_openweather_api_key
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    SESSION_SECRET=your_session_secret
    ```

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
# 🤖 Bot Commands

- /start - Initialize the bot
- /subscribe <city> - Subscribe to daily weather updates
- /unsubscribe - Unsubscribe from updates
- /weather <city> - Get current weather

## Technologies Used
- [NestJS](https://nestjs.com/)
- [Telegram Bot API](https://core.telegram.org/bots/api)
- [OpenWeatherMap API](https://openweathermap.org/api)
- [MongoDB](https://www.mongodb.com/)
- [Google OAuth](https://developers.google.com/identity)

# 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to copy this and use it in your GitHub repository. If you need more sections or adjustments, let me know! 🚀

