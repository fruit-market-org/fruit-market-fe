"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { CONTACT_CONTENT, SITE_INFO } from "@/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  "map-pin": <MapPin className="w-6 h-6" />,
  phone: <Phone className="w-6 h-6" />,
  mail: <Mail className="w-6 h-6" />,
  clock: <Clock className="w-6 h-6" />,
};

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      toast({
        title: "Message Sent Successfully!",
        description: "We'll get back to you as soon as possible.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch {
      toast({
        title: "Failed to send message.",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 hero-gradient fruit-pattern overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4 animate-fade-up">
            Get In Touch
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-6 animate-fade-up">
            {CONTACT_CONTENT.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-up">
            {CONTACT_CONTENT.description}
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 -mt-16 relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CONTACT_CONTENT.contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-6 shadow-card hover-lift border border-border/50 text-center"
              >
                <div className="w-14 h-14 rounded-2xl accent-gradient flex items-center justify-center mx-auto mb-4 text-accent-foreground">
                  {iconMap[info.icon]}
                </div>
                <h3 className="font-serif font-semibold text-foreground mb-2">{info.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {info.type === "address" ? (
                    <>
                      {SITE_INFO.address}
                      <br />
                      {SITE_INFO.addressLine2}
                    </>
                  ) : (
                    info.value
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-card rounded-3xl p-8 md:p-12 shadow-elevated border border-border/50">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-2">
                Send Us a Message
              </h2>
              <p className="text-muted-foreground mb-8">
                Fill out the form below and we&apos;ll respond within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {CONTACT_CONTENT.formLabels.name}
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="h-12"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {CONTACT_CONTENT.formLabels.email}
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="h-12"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {CONTACT_CONTENT.formLabels.phone}
                    </label>
                    <Input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="h-12"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {CONTACT_CONTENT.formLabels.subject}
                    </label>
                    <Input
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="h-12"
                      placeholder="Membership inquiry"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {CONTACT_CONTENT.formLabels.message}
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="How can we help you?"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full accent-gradient text-accent-foreground hover:opacity-90 shadow-soft"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <CheckCircle className="mr-2 w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 w-5 h-5" />
                      {CONTACT_CONTENT.formLabels.submit}
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Map / Location */}
            <div className="space-y-8">
              <div className="bg-card rounded-3xl overflow-hidden shadow-elevated border border-border/50 aspect-[4/3] min-h-[300px] w-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117537.22899004206!2d72.53118689388133!3d22.98561516043225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e87db6063d53f%3A0x310356a80bbebfa3!2sAhmedabad%20Naroda%20Fruit%20Market!5e0!3m2!1sen!2sin!4v1772298160357!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ahmedabad Naroda Fruit Market - TAWFMA Location"
                />
              </div>

              <div className="bg-muted rounded-3xl p-8 fruit-pattern">
                <h3 className="text-xl font-serif font-bold text-foreground mb-4">
                  Visit Our Office
                </h3>
                <p className="text-muted-foreground mb-6">
                  Our office is located in the heart of Ahmedabad&apos;s fruit market complex. 
                  Feel free to drop by during working hours for any inquiries or to meet 
                  with our team.
                </p>
                <div className="flex items-center gap-3 text-foreground">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-medium">
                    {SITE_INFO.address}
                    <br />
                    {SITE_INFO.addressLine2}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export { ContactPage };
