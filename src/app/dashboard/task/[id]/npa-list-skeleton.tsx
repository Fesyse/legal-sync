"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const skeletonVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.4,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
};

export function NpaListSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.4 } }} // 👈 Плавное исчезновение всего блока
      className="grid grid-cols-1 gap-4 sm:grid-cols-2"
    >
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          custom={i}
          initial="hidden"
          animate="visible"
          variants={skeletonVariants}
        >
          <Skeleton className={cn("h-24 w-full rounded-xl")} />
        </motion.div>
      ))}
    </motion.div>
  );
}
