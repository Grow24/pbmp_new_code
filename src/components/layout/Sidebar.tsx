import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Settings,
  FileText,
  Bell,
  HelpCircle,
  ChevronLeft,
  Shield,
  TrendingUp,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface NavItem {
  label: string;
  icon: React.ElementType;
  href: string;
  badge?: string;
  badgeVariant?: "default" | "secondary" | "destructive" | "success" | "warning";
}

const navItems: NavItem[] = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Analytics", icon: BarChart3, href: "/dashboard/analytics" },
  { label: "Users", icon: Users, href: "/dashboard/users", badge: "248" },
  { label: "Reports", icon: FileText, href: "/dashboard/reports" },
  { label: "Messages", icon: MessageSquare, href: "/dashboard/messages", badge: "5", badgeVariant: "destructive" },
  { label: "Trends", icon: TrendingUp, href: "/dashboard/trends" },
];

const bottomNavItems: NavItem[] = [
  { label: "Notifications", icon: Bell, href: "/dashboard/notifications", badge: "3" },
  { label: "Settings", icon: Settings, href: "/dashboard/settings" },
  { label: "Help & Support", icon: HelpCircle, href: "/dashboard/help" },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (href: string) => {
    if (href === "/dashboard") return location.pathname === "/dashboard";
    return location.pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex flex-col bg-gray-900 text-white transition-all duration-300 ease-in-out",
          collapsed ? "w-16" : "w-64",
          "lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className={cn("flex items-center h-16 px-4 border-b border-gray-700", collapsed && "justify-center")}>
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shrink-0">
            <Shield className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <span className="ml-3 text-lg font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Dashboard Pro
            </span>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          {!collapsed && (
            <p className="px-4 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
              Main Menu
            </p>
          )}
          <ul className="space-y-0.5 px-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group relative",
                    isActive(item.href)
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  <item.icon className={cn("w-5 h-5 shrink-0", isActive(item.href) ? "text-white" : "text-gray-400 group-hover:text-white")} />
                  {!collapsed && (
                    <>
                      <span className="flex-1">{item.label}</span>
                      {item.badge && (
                        <Badge variant={item.badgeVariant || "secondary"} className="text-xs px-1.5 py-0">
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                  {collapsed && item.badge && (
                    <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {!collapsed && (
            <p className="px-4 mt-6 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
              Account
            </p>
          )}
          {!collapsed && <div className="mt-2 mx-4 h-px bg-gray-700" />}
          <ul className="space-y-0.5 px-2 mt-2">
            {bottomNavItems.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group relative",
                    isActive(item.href)
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  <item.icon className={cn("w-5 h-5 shrink-0", isActive(item.href) ? "text-white" : "text-gray-400 group-hover:text-white")} />
                  {!collapsed && (
                    <>
                      <span className="flex-1">{item.label}</span>
                      {item.badge && (
                        <Badge variant={item.badgeVariant || "secondary"} className="text-xs px-1.5 py-0">
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Collapse button — desktop only */}
        <div className="hidden lg:flex items-center justify-end p-3 border-t border-gray-700">
          <button
            onClick={() => setCollapsed((v) => !v)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <ChevronLeft className={cn("w-5 h-5 transition-transform", collapsed && "rotate-180")} />
          </button>
        </div>
      </aside>
    </>
  );
}
