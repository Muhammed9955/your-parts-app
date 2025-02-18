// components/Navbar.tsx
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between gap-4">
          <a href="/" className="text-xl font-bold text-blue-600">
            blog
          </a>
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
}
