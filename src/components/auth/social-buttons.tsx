"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export const SocialButtons = () => {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Button
        variant="outline"
        type="button"
        className="w-full text-xs"
        onClick={async () => {
          const result = await authClient.signIn.social({
            provider: "google",
            callbackURL: "/dashboard",
          });

          if (result.error) {
            toast.error(result.error.message);
          }
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
            fill="currentColor"
          />
        </svg>
        Продолжить с Google
      </Button>
      <Button
        variant="outline"
        type="button"
        className="w-full"
        onClick={async () => {
          const result = await authClient.signIn.social({
            provider: "vk",
            callbackURL: "/dashboard",
          });

          if (result.error) {
            toast.error(result.error.message);
          }
        }}
      >
        <svg
          fill="none"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="size-5"
        >
          <path
            clipRule="evenodd"
            d="m4.2653 4.2653c-1.2653 1.2653-1.2653 3.30177-1.2653 7.3747v.72c0 4.0729 0 6.1094 1.2653 7.3747s3.30176 1.2653 7.3747 1.2653h.72c4.0729 0 6.1094 0 7.3747-1.2653s1.2653-3.3018 1.2653-7.3747v-.72c0-4.07293 0-6.1094-1.2653-7.3747s-3.3018-1.2653-7.3747-1.2653h-.72c-4.07294 0-6.1094 0-7.3747 1.2653zm1.7347 4.2347c.09636 4.6823 2.55576 7.5 6.6095 7.5h.2351v-2.6787c1.4764.1499 2.5773 1.2536 3.0268 2.6787h2.1286c-.5775-2.1318-2.0747-3.3105-3.0052-3.7608.9298-.5569 2.2458-1.9071 2.5557-3.7392h-1.9365c-.4064 1.48991-1.6152 2.8401-2.7701 2.9683v-2.9683h-1.9675v5.1967c-1.19737-.2997-2.75931-1.7572-2.82331-5.1967z"
            fill="currentColor"
            fillRule="evenodd"
          />
        </svg>
        Продолжить с VK
      </Button>
    </div>
  );
};
