import { Header } from "@/components/ui/header";
import { Sidebar } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex flex-col lg:flex-row min-h-screen bg-gray">
        <Sidebar />
        <Header />
        {children}
      </div>
    </>
  );
}
