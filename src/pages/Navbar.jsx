import { Link, useLocation } from "react-router-dom";
import { Home, PlusCircle, User } from "lucide-react";
import { router } from "../config/router";
export default function Navbar() {
  const location = useLocation();

  const navItems = [
     { to: router.add, label: "Добавить", icon:<Home size={22} /> },
    { to: router.products, label: "Товары", icon:  <PlusCircle size={22} /> },
   
    { to: router.category, label: "Профиль", icon: <User size={22} /> },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg border-t border-gray-200 py-2 z-50 flex justify-around items-center rounded-t-xl">
      {navItems.map((item, index) => {
        const active = location.pathname === item.to;

        return (
          <Link
            key={index}
            to={item.to}
            className={`flex flex-col items-center text-sm transition 
              ${active ? "text-blue-600 font-medium" : "text-gray-500"}`}
          >
            {item.icon}
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
