'use client';
import { createAuthClient } from '@workspace/auth/client';

import { Button } from '@workspace/ui/components/button';
import { Card, CardHeader, CardTitle, CardContent } from '@workspace/ui/components/card';

export default function LoginPage() {
  const { signIn } = createAuthClient();

  return (
    <div className="bg-gradient-to-br flex from-blue-50 items-center justify-center min-h-screen p-6 to-indigo-100">
      <Card className="max-w-md shadow-lg w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-blue-800">Web App Login</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            className="w-full"
            onClick={() => signIn.social({
              provider: "github",
              callbackURL: "/dashboard"
            })}
          >
            Sign in with GitHub
          </Button>
          <Button
            className="w-full"
            variant="outline"
            onClick={() => signIn.social({
              provider: "google", 
              callbackURL: "/dashboard"
            })}
          >
            Sign in with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};