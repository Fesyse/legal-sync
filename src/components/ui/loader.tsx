import { cn } from "@/lib/utils";
import { LoaderIcon } from "lucide-react";
import React from "react";

type LoaderProps = React.ComponentProps<typeof LoaderIcon>;

export const Loader: React.FC<LoaderProps> = ({ className, ...props }) => {
  return <LoaderIcon className={cn("animate-spin", className)} {...props} />;
};
