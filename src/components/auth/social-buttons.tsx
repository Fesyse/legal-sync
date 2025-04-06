"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { Icons } from "../ui/icons";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export const SocialButtons = () => {
  const signIn = (provider: "google" | "vk" | "github") => async () => {
    console.log(true);
    const result = await authClient.signIn.social({
      provider,
      callbackURL: "/dashboard",
    });

    if (result.error) {
      toast.error(result.error.message);
    }
  };

  return (
    <div className="grid grid-cols-3 items-center gap-2">
      <Button variant="outline" type="button" onClick={signIn("google")}>
        <Icons.google />
        Google
      </Button>
      <Button variant="outline" type="button" onClick={signIn("vk")} disabled>
        <Icons.vk />
        VK
      </Button>
      <Button variant="outline" type="button" onClick={signIn("github")}>
        <GitHubLogoIcon className="size-5" />
        Github
      </Button>
    </div>
  );
};
