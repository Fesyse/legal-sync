import { motion } from "framer-motion";
export function Animation({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.7 } }}
    >
      {children}
    </motion.div>
  );
}
