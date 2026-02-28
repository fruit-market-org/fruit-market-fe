"use client";

import Link from "next/link";
import Image from "next/image";
import { SITE_INFO, FOOTER_CONTENT, NAV_LINKS } from "@/constants";
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

import logo from "@/assets/images/fruit_market_logo.png";

const iconMap: Record<string, React.ReactNode> = {
  facebook: <Facebook className="w-5 h-5" />,
  twitter: <Twitter className="w-5 h-5" />,
  instagram: <Instagram className="w-5 h-5" />,
  linkedin: <Linkedin className="w-5 h-5" />,
};

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-muted">
                <Image
                  src={logo}
                  alt={`${SITE_INFO.shortName} logo`}
                  className="w-full h-full object-cover"
                  width={48}
                  height={48}
                />
              </div>
              <div>
                <h3 className="text-lg font-serif font-bold">{SITE_INFO.shortName}</h3>
                <p className="text-xs text-background/60">Since 1961</p>
              </div>
            </div>
            <p className="text-background/70 text-sm leading-relaxed mb-6">
              {FOOTER_CONTENT.description}
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {FOOTER_CONTENT.socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                  aria-label={social.name}
                >
                  {iconMap[social.icon]}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-serif font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="text-background/70 hover:text-primary transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2">
            <h4 className="text-lg font-serif font-semibold mb-6">Contact Us</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h5 className="font-medium text-sm mb-1">Address</h5>
                  <p className="text-background/70 text-sm">
                    {SITE_INFO.address}
                    <br />
                    {SITE_INFO.addressLine2}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h5 className="font-medium text-sm mb-1">Phone</h5>
                  <p className="text-background/70 text-sm">{SITE_INFO.phone}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h5 className="font-medium text-sm mb-1">Email</h5>
                  <p className="text-background/70 text-sm">{SITE_INFO.email}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h5 className="font-medium text-sm mb-1">Working Hours</h5>
                  <p className="text-background/70 text-sm">{SITE_INFO.workingHours}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-background/60 text-sm">
            {FOOTER_CONTENT.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
