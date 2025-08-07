import React from "react";
import { Droplets, Settings, Home, BarChart3, LogIn, MapPin, Github} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navigationItems = [
  { title: "דף הבית", url: "/", icon: Home },
  { title: "לוח בקרה", url: "/dashboard", icon: BarChart3 },
  { title: "מפת השקיה", url: "/map", icon: MapPin },
  { title: "כניסה", url: "/login", icon: LogIn },
  { title: "לגיט הפרויקט!", url:"https://github.com/Amityst12/PlantProject"  , icon: Github, external: true }

];

export default function Layout({ children }) {
  const location = useLocation();

  return (
    <div className="min-h-screen flex w-full bg-gradient-to-br from-emerald-50 to-blue-50" dir="rtl">
      {/* Sidebar */}
      <aside className="w-72 border-l border-emerald-200 flex flex-col h-screen sticky top-0">
        {/* Header */}
        <div className="border-b border-emerald-200 p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center">
              <Droplets className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900 text-lg">השקיה אוטומטית</h2>
              <p className="text-sm text-emerald-600">קמפוס HIT</p>
            </div>
          </div>
        </div>
        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider px-3 py-2">
            ניווט ראשי
          </div>
          <ul>
            {navigationItems.map((item) => (
              <li key={item.title} className="mb-1">
                <Link
                  to={item.url}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                    font-medium hover:bg-emerald-50 hover:text-emerald-700
                    ${location.pathname === item.url ? "bg-emerald-100 text-emerald-700 border-r-4 border-emerald-500" : ""}
                  `}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {/* Footer */}
        <div className="border-t border-emerald-200 p-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
              <Settings className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 text-sm">מערכת השקיה</p>
              <p className="text-xs text-gray-500">גרסה 1.0</p>
            </div>
          </div>
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="bg-white/80 backdrop-blur-sm border-b border-emerald-100 px-6 py-4 lg:hidden">
          <div className="flex items-center gap-4">
            {/* אפשר להוסיף כאן כפתור לפתיחת Sidebar במובייל */}
            <h1 className="text-xl font-bold text-gray-900">השקיה אוטומטית</h1>
          </div>
        </header>
        <div className="flex-1 overflow-auto">{children}</div>
      </main>
    </div>
  );
}
