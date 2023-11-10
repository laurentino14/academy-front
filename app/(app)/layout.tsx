import { Sidebar } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex min-h-screen bg-gray">
        <Sidebar />
        {children}
      </div>
    </>
  );
}
