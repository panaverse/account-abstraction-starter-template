
import postgres from "postgres";

export const dbClient = postgres(process.env.CONNECTION_STRING, { ssl: true });

