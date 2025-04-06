"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { Icons } from "../ui/icons";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Pickaxe } from "lucide-react";

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
      <Button
        className="relative"
        variant="outline"
        type="button"
        onClick={signIn("vk")}
        disabled
      >
        <Icons.vk />
        VK
        <Pickaxe className="animate-mine absolute top-0 left-2 origin-bottom-left" />
        <Pickaxe className="animate-mine absolute right-2 bottom-1 origin-bottom-left rotate-15" />
      </Button>
      <Button variant="outline" type="button" onClick={signIn("github")}>
        <GitHubLogoIcon className="size-5" />
        Github
      </Button>
    </div>
  );
};
