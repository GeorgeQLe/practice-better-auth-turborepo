import { createAuthClient as createBetterAuthClient } from 'better-auth/react';

export const createAuthClient = () => createBetterAuthClient();
export type SignIn = ReturnType<typeof createAuthClient>["signIn"];