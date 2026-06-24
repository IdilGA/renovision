"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FolderOpen, Heart, User } from "lucide-react";
import { motion } from "framer-motion";

const tabs = [
  { href: "/home", icon: Home, label: "Home" },
  { href: "/projects", icon: FolderOpen, label: "Ontwerpen" },
  { href: "/favorites", icon: Heart, label: "Favorieten" },
  { href: "/profile", icon: User, label: "Profiel" },
];

export default function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav
      style={{
        position: "fixed",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        maxWidth: 390,
        background: "rgba(255,255,255,0.97)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderTop: "1px solid rgba(236,232,226,0.9)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
        zIndex: 100,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-around", paddingTop: 10, paddingBottom: 8 }}>
        {tabs.map(({ href, icon: Icon, label }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
                padding: "6px 18px",
                minWidth: 60,
                minHeight: 44,
                justifyContent: "center",
                textDecoration: "none",
                color: active ? "#5c7d63" : "#9b9189",
                position: "relative",
              }}
            >
              {active && (
                <motion.div
                  layoutId="nav-indicator"
                  style={{
                    position: "absolute",
                    top: -10,
                    width: 28,
                    height: 3,
                    borderRadius: "0 0 3px 3px",
                    background: "#5c7d63",
                  }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <motion.div
                animate={{ scale: active ? 1.1 : 1 }}
                transition={{ duration: 0.2 }}
              >
                <Icon size={22} strokeWidth={active ? 2.5 : 1.8} />
              </motion.div>
              <span style={{ fontSize: 10, fontWeight: active ? 700 : 500, letterSpacing: 0.2 }}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
