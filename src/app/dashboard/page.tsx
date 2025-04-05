import { default as HomePage } from "@/app/(home)/page";

type DashboardPageProps = {};

export default function DashboardPage(props: DashboardPageProps) {
  return <HomePage className="min-h-[calc(100vh-100px)]" {...props} />;
}
