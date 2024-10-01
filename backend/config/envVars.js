import dotenv from "dotenv"

dotenv.config()

export const ENV_VARS = {
    MONGO_URL: process.env.MONGO_URL,
    PORT: process.env.PORT || 5050,
    JWT_SECRET: process.env.JWT_SECRET,
    NODE_ENV: process.env.NODE_ENV,
    TMDB_API_KEY: process.env.TMDB_API_KEY,
    // JWT_EXPIRATION_TIME: process.env.JWT_EXPIRATION_TIME,
}