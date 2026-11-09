import { useState } from "react";
import { Film, User, LogOut, Menu, X } from "lucide-react";
import { SidebarNavigation } from "@/components/SidebarNavigation";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile Hamburger Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 p-4 bg-background border-b border-border flex justify-between items-center z-40">
        <div className="flex items-center gap-2 font-bold text-primary">
          <Film className="h-6 w-6" />
          <span className="text-xl tracking-tighter">OGRA AI</span>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-foreground">
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Sidebar / Mobile Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-border bg-background p-6 flex flex-col transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:relative lg:flex ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-3 font-bold text-primary px-2">
            <Film className="h-8 w-8" />
            <span className="text-2xl tracking-tighter">OGRA AI</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="lg:hidden p-2 text-foreground">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div onClick={() => setIsOpen(false)}>
          <SidebarNavigation />
        </div>

        <div className="pt-6 border-t border-border mt-auto" onClick={() => setIsOpen(false)}>
          <div className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-primary transition cursor-pointer">
            <User className="h-5 w-5" />
            <span className="font-medium">Account</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 text-red-500/80 hover:text-red-500 transition cursor-pointer">
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Sign Out</span>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto mt-16 lg:mt-0">
        <div className="max-w-7xl mx-auto p-4 md:p-8 lg:p-12">{children}</div>
      </main>
    </div>
  );
}
