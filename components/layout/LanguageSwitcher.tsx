"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const languages = [
  { code: "en", label: "English" },
  { code: "ar", label: "العربية" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const params = useParams();

  const switchLanguage = (locale: string) => {
    const segments = pathname.split("/").filter(Boolean);
    if (languages.some((lang) => lang.code === segments[0])) {
      segments.shift();
    }
    const newPath = `/${locale}/${segments.join("/")}`;
    router.push(newPath);
    setDropdownOpen(false);
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px",
        background: "#f8f9fa",
      }}
    >
      {/* <div>My Website</div> */}
      <div style={{ position: "relative" }}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          style={{ cursor: "pointer" }}
        >
          { params?.locale} ▼
        </button>
        {dropdownOpen && (
          <div
            style={{
              position: "absolute",
              background: "white",
              border: "1px solid #ddd",
              padding: "10px",
            }}
          >
            {languages.map(({ code, label }) => (
              <div
                key={code}
                onClick={() => switchLanguage(code)}
                style={{ cursor: "pointer", padding: "5px" }}
              >
                {label}
              </div>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
