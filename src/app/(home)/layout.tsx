import { Header } from "@/components/ui/header";

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
