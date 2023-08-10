import lucia from "lucia-auth";
import { d1 } from "@lucia-auth/adapter-sqlite";
import { h3 } from "lucia-auth/middleware";
import { github, google } from "@lucia-auth/oauth/providers";
import type { Auth as LAuth, Configuration } from "lucia-auth";
import { betterSqlite3 } from "@lucia-auth/adapter-sqlite";
import sqlite from "better-sqlite3";

let _auth: LAuth<Configuration> | null = null;

let _adapter = null;

const mapping = {
  user: "user",
  key: "user_key",
  session: "user_session",
};

export const useAuth = () => {
  if (!_auth) {
    // we will do this calculations internally and decide which database to pick.

    if (process.dev) {
      const db = sqlite("main.db");
      _adapter = betterSqlite3(db, mapping);
    } else {
      _adapter = d1(process.env.DB);
    }

    _auth = lucia({
      adapter: _adapter,
      env: process.dev ? "DEV" : "PROD",
      middleware: h3(),
      transformDatabaseUser: (userData) => {
        return {
          userId: userData.id,
          email: userData.email,
        };
      },
    });
  }

  return _auth;
};

const runtimeConfig = useRuntimeConfig();

export const githubAuth =(auth=useAuth())=> github(auth, {
  clientId: runtimeConfig.githubClientId,
  clientSecret: runtimeConfig.githubClientSecret,
});

export const googleAuth=(auth=useAuth()) => google(auth, {
  clientId: runtimeConfig.googleClientId,
  clientSecret: runtimeConfig.googleClientSecret,
  redirectUri: "http://localhost:3000/api/login/google/callback",
});


export type Auth = typeof _auth;
