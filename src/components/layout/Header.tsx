"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NAV_LINKS, SITE_INFO } from "@/constants";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import logo from "@/assets/images/fruit_market_logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-muted/98 backdrop-blur supports-[backdrop-filter]:bg-muted/95">
      <div className="container mx-auto px-4">
        <div className="flex h-25 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 shadow-soft bg-muted">
              <Image
                src={logo}
                alt={`${SITE_INFO.shortName} logo`}
                className="w-full h-full object-cover"
                width={100}
                height={100}
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-serif font-bold text-foreground leading-tight">
                {SITE_INFO.shortName}
              </h1>
              <p className="text-xs text-muted-foreground">Since 1961</p>
            </div>
          </Link>

          {/* Full association name - size controlled by .header-association-name in globals.css */}
          <p className="header-association-name flex-1 min-w-0 text-center font-serif font-bold text-foreground px-2 sm:px-4 mx-2 sm:mx-4 line-clamp-2">
            {SITE_INFO.name}
          </p>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 flex-shrink-0">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                  pathname === link.path
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "text-foreground/80 hover:text-foreground hover:bg-muted"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-border animate-fade-up">
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200",
                    pathname === link.path
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground/80 hover:text-foreground hover:bg-muted"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
