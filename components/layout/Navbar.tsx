// components/Navbar.tsx
import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between gap-4">
          <Link href={`/`}>
            <p className="text-xl font-bold text-blue-600">Blog</p>
          </Link>

          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
}
