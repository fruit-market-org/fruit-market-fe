"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HERO_CONTENT, HERO_SLIDES, ABOUT_CONTENT, SITE_INFO } from "@/constants";
import { ChevronLeft, ChevronRight, ArrowRight, Award, Scale, Users, Lightbulb } from "lucide-react";
import { useState, useEffect } from "react";

const iconMap: Record<string, React.ReactNode> = {
  award: <Award className="w-8 h-8" />,
  scale: <Scale className="w-8 h-8" />,
  users: <Users className="w-8 h-8" />,
  lightbulb: <Lightbulb className="w-8 h-8" />,
};

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  return (
    <>
      {/* Hero Section with Carousel */}
      <section className="relative h-[90vh] min-h-[600px] overflow-hidden">
        {/* Background Slides */}
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-transparent" />
          </div>
        ))}

        {/* Hero Content */}
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-background animate-fade-up">
            <span className="inline-block px-4 py-2 bg-primary/90 text-primary-foreground text-sm font-medium rounded-full mb-6">
              Welcome to {SITE_INFO.shortName}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-6">
              {HERO_CONTENT.title}
            </h1>
            <p className="text-lg md:text-xl text-background/90 mb-8 leading-relaxed">
              {HERO_CONTENT.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="accent-gradient text-accent-foreground hover:opacity-90 shadow-elevated">
                <Link href="/members">
                  {HERO_CONTENT.ctaText}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-background bg-background text-foreground hover:bg-background/90 backdrop-blur-sm">
                <Link href="/contact">{HERO_CONTENT.secondaryCtaText}</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Carousel Controls */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
          <button
            onClick={prevSlide}
            className="w-12 h-12 rounded-full bg-background/20 backdrop-blur flex items-center justify-center text-background hover:bg-background/30 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex gap-2">
            {HERO_SLIDES.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide ? "bg-primary w-8" : "bg-background/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          <button
            onClick={nextSlide}
            className="w-12 h-12 rounded-full bg-background/20 backdrop-blur flex items-center justify-center text-background hover:bg-background/30 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted fruit-pattern">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {ABOUT_CONTENT.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-serif font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-elevated">
                <img
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80"
                  alt="Fruit market"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 rounded-2xl overflow-hidden shadow-card border-4 border-background hidden md:block">
                <img
                  src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&q=80"
                  alt="Fresh fruits"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
                About Us
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
                {ABOUT_CONTENT.subtitle}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {ABOUT_CONTENT.history.split('\n\n')[0]}
              </p>
              <Button asChild className="accent-gradient text-accent-foreground hover:opacity-90">
                <Link href="/about">
                  Learn More About Us
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
              Our Values
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
              What We Stand For
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {ABOUT_CONTENT.values.map((value, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-8 shadow-card hover-lift text-center group"
              >
                <div className="w-16 h-16 rounded-2xl accent-gradient flex items-center justify-center mx-auto mb-6 text-accent-foreground group-hover:scale-110 transition-transform">
                  {iconMap[value.icon]}
                </div>
                <h3 className="text-xl font-serif font-semibold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 hero-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
            Join Our Growing Community
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Become a part of Ahmedabad&apos;s most trusted fruit merchants&apos; association and enjoy exclusive benefits, networking opportunities, and trade support.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="accent-gradient text-accent-foreground hover:opacity-90 shadow-elevated">
              <Link href="/members">View Our Members</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">Get In Touch</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export { HomePage };
