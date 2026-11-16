"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { ReactNode } from "react";

export default function GoogleAuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const clientId =
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID?.trim() ||
    "137918537073-o5p7ojshmfj46k3be9joqdfcafk89uvq.apps.googleusercontent.com";

  return (
    <GoogleOAuthProvider clientId={clientId}>{children}</GoogleOAuthProvider>
  );
}
