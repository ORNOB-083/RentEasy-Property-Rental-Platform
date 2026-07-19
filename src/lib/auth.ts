import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";

if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not set in .env");
}

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("RentEasy");

export const auth = betterAuth({
    baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000",
    secret: process.env.BETTER_AUTH_SECRET,

    emailAndPassword: {
        enabled: true,
    },

    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },

    database: mongodbAdapter(db, { client }),

    user: {
        additionalFields: {
            role: {
                type: "string",
                defaultValue: "user",
                required: false,
                input: true,
            },
            phone: {
                type: "string",
                required: false,
                input: true,
            },
        },
    },

    databaseHooks: {
        user: {
            create: {
                before: async (user) => {
                    return {
                        data: {
                            ...user,
                            role: user.role || "user",
                        },
                    };
                },
            },
        },
    },

    session: {
        expiresIn: 30 * 24 * 60 * 60,
        cookieCache: {
            enabled: true,
            maxAge: 5 * 60,
        },
    },

    plugins: [
        jwt({
            jwt: {
                expirationTime: '7d',
            },
            schema: {
                jwks: {
                    modelName: 'jwks',
                },
            },
        })
    ],
    /* plugins: [
      admin(),
    ] */
});

