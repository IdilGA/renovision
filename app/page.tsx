"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Root() {
  const router = useRouter();
  useEffect(() => {
    const seen = localStorage.getItem("renovision_onboarded");
    if (seen) router.replace("/home");
    else router.replace("/onboarding");
  }, [router]);

  return (
    <div style={{ minHeight: "100dvh", background: "#faf9f7", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ fontSize: 32 }}>🏠</div>
    </div>
  );
}
