"use client";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, AlertCircle } from "lucide-react";

export type ToastType = "success" | "error" | "info";

interface ToastProps {
  message: string;
  type?: ToastType;
  visible: boolean;
  onClose: () => void;
  duration?: number;
}

const icons = {
  success: <Check size={16} strokeWidth={3} color="#fff" />,
  error: <X size={16} strokeWidth={3} color="#fff" />,
  info: <AlertCircle size={16} color="#fff" />,
};

const colors = {
  success: "#5c7d63",
  error: "#c0504d",
  info: "#1c1917",
};

export default function Toast({ message, type = "success", visible, onClose, duration = 2400 }: ToastProps) {
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(onClose, duration);
    return () => clearTimeout(t);
  }, [visible, duration, onClose]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.94 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          style={{
            position: "fixed",
            bottom: "calc(90px + env(safe-area-inset-bottom, 0px) + 12px)",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1000,
            width: "calc(100% - 48px)",
            maxWidth: 342,
          }}
        >
          <div
            style={{
              background: colors[type],
              borderRadius: 18,
              padding: "14px 18px",
              display: "flex",
              alignItems: "center",
              gap: 12,
              boxShadow: "0 8px 32px rgba(0,0,0,0.22)",
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.18)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {icons[type]}
            </div>
            <span style={{ fontSize: 14, fontWeight: 600, color: "#fff", flex: 1, lineHeight: 1.4 }}>
              {message}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Hook for easy toast usage
import { useState, useCallback } from "react";

export function useToast() {
  const [state, setState] = useState({ visible: false, message: "", type: "success" as ToastType });

  const show = useCallback((message: string, type: ToastType = "success") => {
    setState({ visible: true, message, type });
  }, []);

  const hide = useCallback(() => {
    setState((s) => ({ ...s, visible: false }));
  }, []);

  return { ...state, show, hide };
}
