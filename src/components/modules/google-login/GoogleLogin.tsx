"use client";

import { toast } from "@/components/ui/toast";
import { useGoogleOAuth } from "@/hooks";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

interface ApiErrorResponse {
  message?: string;
  data?: {
    message?: string;
  };
}

export default function GoogleLoginComponent() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate: googleLogin } = useGoogleOAuth();

  const handleGoogleSuccess = (credentialResponse: { credential?: string }) => {
    const idToken = credentialResponse.credential;

    if (!idToken) {
      toast.add({
        title: "Google OAuth Failed",
        description: "Something went wrong. Please try again",
        type: "error",
      });
      return;
    }

    googleLogin(
      { idToken },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey: ["user"] });
          toast.add({
            title: "Logged in Successfully",
            description: "Welcome back",
            type: "success",
          });
          router.push("/");
          router.refresh();
        },
        onError: (err: ApiErrorResponse) => {
          const errorMessage =
            err?.data?.message ||
            err?.message ||
            "Something went wrong. Please try again";
          toast.add({
            title: "Google OAuth Failed",
            description: errorMessage,
            type: "error",
          });
        },
      },
    );
  };

  const handleGoogleError = () => {
    toast.add({
      title: "Google OAuth Failed",
      description: "Google sign-in was cancelled or failed. Please try again.",
      type: "error",
    });
  };

  return (
    <div className="flex justify-center w-full">
      <GoogleLogin
        theme="outline"
        shape="pill"
        text="continue_with"
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleError}
      />
    </div>
  );
}
