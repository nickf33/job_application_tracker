"use client";

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";

export default function AuthForm() {
  const [name, setName] = useState(null);
  const [error, setError] = useState(null);
  const supabase = createClientComponentClient();

  const handleAuthError = (error) => {
    console.error("Auth error:", error);
    setError(error.message || "An error occurred during authentication");
  };

  return (
    <div className="w-full max-w-lg mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}
      <Auth
        supabaseClient={supabase}
        view="magic_link"
        showLinks={false}
        providers={[]}
        redirectTo={`${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`}
        onError={handleAuthError}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "rgb(79, 70, 229)", // indigo-600
                brandAccent: "rgb(99, 102, 241)", // indigo-500
              },
            },
          },
          className: {
            container: "space-y-4",
            label: "block text-sm font-medium text-gray-700",
            input:
              "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50",
            button:
              "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
          },
        }}
      />
    </div>
  );
}
