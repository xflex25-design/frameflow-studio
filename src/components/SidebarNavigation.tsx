import { Link } from "@tanstack/react-router";
import { Sparkles, Film, CreditCard, Settings } from "lucide-react";

export function SidebarNavigation() {
  const navItems = [
    { icon: Sparkles, label: "Generation", to: "/studio" },
    { icon: Film, label: "History", to: "/dashboard" },
    { icon: CreditCard, label: "Subscription", to: "/dashboard" },
    { icon: Settings, label: "Settings", to: "/studio" },
  ];

  return (
    <nav className="space-y-2 flex-1">
      {navItems.map((item) => (
        <Link
          key={item.label}
          to={item.to}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all duration-200"
          activeProps={{
            className:
              "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground shadow-glow",
          }}
        >
          <item.icon className="h-5 w-5" />
          <span className="font-medium">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}
