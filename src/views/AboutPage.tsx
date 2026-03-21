import Image from "next/image";
import { ABOUT_CONTENT } from "@/constants";
import { Award, Scale, Users, Lightbulb, Target, Eye } from "lucide-react";

import historyImage from "@/assets/images/fruits_4.jpeg";
import strip1 from "@/assets/images/fruits_7.jpeg";
import strip2 from "@/assets/images/fruits_8.jpeg";
import strip3 from "@/assets/images/fruits_9.jpeg";
import strip4 from "@/assets/images/fruits_10.jpeg";
import strip5 from "@/assets/images/fruits_11.jpeg";

const GALLERY_STRIP_IMAGES = [
  { src: strip1, alt: "Fresh fruits" },
  { src: strip2, alt: "Fruit variety" },
  { src: strip3, alt: "Market produce" },
  { src: strip4, alt: "Quality fruits" },
  { src: strip5, alt: "Fruit display" },
];

const iconMap: Record<string, React.ReactNode> = {
  award: <Award className="w-8 h-8" />,
  scale: <Scale className="w-8 h-8" />,
  users: <Users className="w-8 h-8" />,
  lightbulb: <Lightbulb className="w-8 h-8" />,
};

const AboutPage = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 hero-gradient fruit-pattern overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4 animate-fade-up">
            Our Story
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-6 animate-fade-up">
            {ABOUT_CONTENT.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-up">
            {ABOUT_CONTENT.subtitle}
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-foreground text-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {ABOUT_CONTENT.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-serif font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-background/70 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <span className="inline-block px-4 py-2 bg-secondary/10 text-secondary text-sm font-medium rounded-full mb-4">
                Our History
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
                A Legacy of Trust & Excellence
              </h2>
              <div className="prose prose-lg text-muted-foreground">
                {ABOUT_CONTENT.history.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2 relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-elevated">
                <Image
                  src={historyImage}
                  alt="Our history"
                  className="w-full h-full object-cover"
                  placeholder="blur"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-2xl shadow-card hidden md:block">
                <div className="text-4xl font-serif font-bold">1961</div>
                <div className="text-sm text-primary-foreground/80">Year Established</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-muted fruit-pattern">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-card rounded-2xl p-10 shadow-card hover-lift">
              <div className="w-16 h-16 rounded-2xl accent-gradient flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-accent-foreground" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-foreground mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                {ABOUT_CONTENT.mission}
              </p>
            </div>

            {/* Vision */}
            <div className="bg-card rounded-2xl p-10 shadow-card hover-lift">
              <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-secondary-foreground" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-foreground mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                {ABOUT_CONTENT.vision}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
              Our Core Values
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
              Principles That Guide Us
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {ABOUT_CONTENT.values.map((value, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-8 shadow-card hover-lift text-center group border border-border/50"
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

      {/* Image Gallery Strip */}
      <section className="py-12 overflow-hidden">
        <div className="flex gap-4 animate-slide-in">
          {GALLERY_STRIP_IMAGES.map((item, index) => (
            <div key={index} className="w-72 h-48 flex-shrink-0 rounded-xl overflow-hidden">
              <Image
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover"
                placeholder="blur"
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export { AboutPage };
