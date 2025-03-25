
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function ActiveTab({ onChange }) {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  useEffect(() => {
    if (tab === "sign-up" || tab === "sign-in") {
      onChange(tab);
    }
  }, [tab, onChange]);

  return null;
}
