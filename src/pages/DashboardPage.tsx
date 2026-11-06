import React from "react";
import {
  Users, TrendingUp, DollarSign, Activity, ArrowUpRight,
  ArrowDownRight, ShoppingCart, Eye, Star, Clock,
  CheckCircle2, AlertCircle, Info, LogOut,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// --- Stat Card ---
interface StatCardProps {
  title: string;
  value: string;
  change: string;
  positive: boolean;
  icon: React.ElementType;
  color: string;
  bgColor: string;
}

function StatCard({ title, value, change, positive, icon: Icon, color, bgColor }: StatCardProps) {
  return (
    <Card className="relative overflow-hidden hover:shadow-md transition-shadow duration-200">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
            <div className="flex items-center gap-1 mt-2">
              {positive ? (
                <ArrowUpRight className={cn("w-4 h-4", color)} />
              ) : (
                <ArrowDownRight className="w-4 h-4 text-red-500" />
              )}
              <span className={cn("text-sm font-medium", positive ? color : "text-red-500")}>
                {change}
              </span>
              <span className="text-xs text-gray-400 ml-1">vs last month</span>
            </div>
          </div>
          <div className={cn("p-3 rounded-xl", bgColor)}>
            <Icon className={cn("w-6 h-6", color)} />
          </div>
        </div>
        <div className={cn("absolute bottom-0 left-0 right-0 h-1 rounded-b-lg", bgColor.replace("bg-", "bg-").replace("100", "400"))} />
      </CardContent>
    </Card>
  );
}

// --- Activity Item ---
interface ActivityItem {
  id: number;
  user: string;
  action: string;
  time: string;
  type: "success" | "warning" | "info" | "default";
  avatar: string;
}

const activities: ActivityItem[] = [
  { id: 1, user: "Sarah Chen", action: "Completed quarterly report", time: "2 min ago", type: "success", avatar: "SC" },
  { id: 2, user: "Marcus Williams", action: "Submitted new project proposal", time: "15 min ago", type: "info", avatar: "MW" },
  { id: 3, user: "Emily Rodriguez", action: "Payment pending approval", time: "1 hr ago", type: "warning", avatar: "ER" },
  { id: 4, user: "James Kim", action: "Updated team permissions", time: "2 hr ago", type: "default", avatar: "JK" },
  { id: 5, user: "Priya Patel", action: "Closed support ticket #4821", time: "3 hr ago", type: "success", avatar: "PP" },
  { id: 6, user: "Daniel Lee", action: "Flagged anomaly in data", time: "5 hr ago", type: "warning", avatar: "DL" },
];

// --- Top Products ---
const products = [
  { name: "Analytics Pro Plan", sales: 1240, revenue: "$48,200", trend: "+12%", positive: true },
  { name: "Team Collaboration Suite", sales: 980, revenue: "$37,850", trend: "+8%", positive: true },
  { name: "Storage Add-on (1TB)", sales: 756, revenue: "$22,680", trend: "-3%", positive: false },
  { name: "API Access Token", sales: 540, revenue: "$16,200", trend: "+19%", positive: true },
  { name: "Custom Integration", sales: 310, revenue: "$43,400", trend: "+5%", positive: true },
];

// --- Chart Bar (simple SVG-free bar) ---
function MiniBar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="flex items-end gap-0.5 h-8">
      {[20, 40, 55, 35, 70, 85, pct].map((h, i) => (
        <div
          key={i}
          className={cn("flex-1 rounded-t-sm transition-all", color)}
          style={{ height: `${i === 6 ? pct : h}%`, opacity: i === 6 ? 1 : 0.4 }}
        />
      ))}
    </div>
  );
}

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  const stats: StatCardProps[] = [
    {
      title: "Total Revenue",
      value: "$128,430",
      change: "+14.5%",
      positive: true,
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Active Users",
      value: "24,891",
      change: "+8.2%",
      positive: true,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "New Orders",
      value: "3,284",
      change: "+22.1%",
      positive: true,
      icon: ShoppingCart,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Conversion Rate",
      value: "3.68%",
      change: "-1.1%",
      positive: false,
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  const activityIcon = { success: CheckCircle2, warning: AlertCircle, info: Info, default: Activity };
  const activityColor = {
    success: "text-green-600 bg-green-100",
    warning: "text-yellow-600 bg-yellow-100",
    info: "text-blue-600 bg-blue-100",
    default: "text-gray-600 bg-gray-100",
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {user?.fullName?.split(" ")[0]} 👋
          </h1>
          <p className="text-gray-500 mt-0.5">
            Here's what's happening with your business today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="success" className="text-sm px-3 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-600 mr-1.5 inline-block" />
            All systems operational
          </Badge>
          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
            className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
          >
            <LogOut className="w-4 h-4 mr-1.5" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s) => (
          <StatCard key={s.title} {...s} />
        ))}
      </div>

      {/* Middle Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Top Products */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Top Products</CardTitle>
                <CardDescription>Performance of your best sellers this month</CardDescription>
              </div>
              <Button variant="outline" size="sm">View All</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {products.map((p, idx) => (
                <div key={p.name} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <span className="w-6 text-sm font-bold text-gray-400">#{idx + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{p.name}</p>
                    <p className="text-xs text-gray-500">{p.sales.toLocaleString()} sales</p>
                  </div>
                  <MiniBar value={p.sales} max={1300} color={p.positive ? "bg-blue-500" : "bg-gray-300"} />
                  <div className="text-right shrink-0">
                    <p className="text-sm font-semibold text-gray-900">{p.revenue}</p>
                    <p className={cn("text-xs font-medium", p.positive ? "text-green-600" : "text-red-500")}>
                      {p.trend}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Profile Card */}
        <Card>
          <CardHeader>
            <CardTitle>Your Profile</CardTitle>
            <CardDescription>Account overview and quick stats</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xl font-bold shrink-0">
                {user?.fullName?.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{user?.fullName}</p>
                <p className="text-sm text-gray-500">{user?.email}</p>
                <Badge variant="default" className="mt-1 text-xs">
                  {user?.role}
                </Badge>
              </div>
            </div>

            <div className="h-px bg-gray-100" />

            <dl className="space-y-2.5">
              <div className="flex items-center justify-between text-sm">
                <dt className="text-gray-500 flex items-center gap-2">
                  <Users className="w-4 h-4" /> Username
                </dt>
                <dd className="font-medium text-gray-900">@{user?.username}</dd>
              </div>
              <div className="flex items-center justify-between text-sm">
                <dt className="text-gray-500 flex items-center gap-2">
                  <Clock className="w-4 h-4" /> Member since
                </dt>
                <dd className="font-medium text-gray-900">
                  {user?.joinedAt
                    ? new Date(user.joinedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                    : "—"}
                </dd>
              </div>
              <div className="flex items-center justify-between text-sm">
                <dt className="text-gray-500 flex items-center gap-2">
                  <Activity className="w-4 h-4" /> Status
                </dt>
                <dd className="flex items-center gap-1.5 font-medium text-green-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Active
                </dd>
              </div>
              <div className="flex items-center justify-between text-sm">
                <dt className="text-gray-500 flex items-center gap-2">
                  <Star className="w-4 h-4" /> Plan
                </dt>
                <dd className="font-medium text-gray-900">Pro</dd>
              </div>
            </dl>

            <div className="h-px bg-gray-100" />

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-2 text-center">
              {[
                { label: "Projects", value: "12" },
                { label: "Tasks", value: "48" },
                { label: "Reports", value: "7" },
              ].map((s) => (
                <div key={s.label} className="bg-gray-50 rounded-lg p-2">
                  <p className="text-lg font-bold text-gray-900">{s.value}</p>
                  <p className="text-xs text-gray-500">{s.label}</p>
                </div>
              ))}
            </div>

            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
              size="sm"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest actions from your team</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="text-blue-600">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activities.map((activity) => {
                const Icon = activityIcon[activity.type];
                return (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className={cn("w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0", activityColor[activity.type])}>
                      {activity.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                      <p className="text-xs text-gray-500 truncate">{activity.action}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Icon className={cn("w-4 h-4", activityColor[activity.type].split(" ")[0])} />
                      <span className="text-xs text-gray-400 whitespace-nowrap">{activity.time}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions & Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "New Report", icon: TrendingUp, color: "bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200" },
                { label: "Add User", icon: Users, color: "bg-purple-50 text-purple-700 hover:bg-purple-100 border-purple-200" },
                { label: "View Analytics", icon: Activity, color: "bg-green-50 text-green-700 hover:bg-green-100 border-green-200" },
                { label: "Page Views", icon: Eye, color: "bg-orange-50 text-orange-700 hover:bg-orange-100 border-orange-200" },
              ].map((action) => (
                <button
                  key={action.label}
                  className={cn(
                    "flex flex-col items-center gap-2 p-4 rounded-xl border text-sm font-medium transition-colors",
                    action.color
                  )}
                >
                  <action.icon className="w-5 h-5" />
                  {action.label}
                </button>
              ))}
            </div>

            <div className="h-px bg-gray-100" />

            {/* Performance meter */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-700">Monthly Performance</p>
              {[
                { label: "Sales Goal", value: 78, color: "bg-blue-500" },
                { label: "User Growth", value: 65, color: "bg-purple-500" },
                { label: "Support SLA", value: 92, color: "bg-green-500" },
                { label: "Uptime", value: 99, color: "bg-orange-500" },
              ].map((metric) => (
                <div key={metric.label} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">{metric.label}</span>
                    <span className="font-medium text-gray-900">{metric.value}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={cn("h-full rounded-full transition-all duration-500", metric.color)}
                      style={{ width: `${metric.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
