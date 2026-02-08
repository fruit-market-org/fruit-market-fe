"use client";

import { useState, useEffect } from "react";
import { MEMBERS_PAGE_CONTENT } from "@/constants";
import {
  Search,
  MapPin,
  Phone,
  Mail,
  Package,
  User,
  Building2,
  Globe,
  ChevronDown,
  LayoutGrid,
  List,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getMembers } from "@/lib/members-api";
import type { ApiMember } from "@/types/member";
import { useDebounce } from "@/hooks/use-debounce";
import { cn } from "@/lib/utils";

const DEFAULT_FRUIT_IMAGE =
  "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&q=80";

type ViewMode = "grid" | "accordion";

function MemberImageCarousel({
  imageUrls,
  alt,
  className,
  onClick,
}: {
  imageUrls: string[] | null;
  alt: string;
  className?: string;
  onClick?: () => void;
}) {
  const urls = imageUrls?.length ? imageUrls : [DEFAULT_FRUIT_IMAGE];
  const hasMultiple = urls.length > 1;

  if (urls.length === 1) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cn("block w-full h-full focus:outline-none", className)}
      >
        <img
          src={urls[0]}
          alt={alt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </button>
    );
  }

  return (
    <Carousel
      opts={{ align: "start", loop: true }}
      className={cn("w-full", className)}
    >
      <CarouselContent>
        {urls.map((url, i) => (
          <CarouselItem key={`${url}-${i}`}>
            <button
              type="button"
              onClick={onClick}
              className="block w-full aspect-video focus:outline-none"
            >
              <img
                src={url}
                alt={`${alt} ${i + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </button>
          </CarouselItem>
        ))}
      </CarouselContent>
      {hasMultiple && (
        <>
          <CarouselPrevious className="left-2 h-8 w-8" />
          <CarouselNext className="right-2 h-8 w-8" />
        </>
      )}
    </Carousel>
  );
}

function MemberCard({
  member,
  onImageClick,
}: {
  member: ApiMember;
  onImageClick: (member: ApiMember) => void;
}) {
  const hasAccordionContent =
    member.contactPerson1 ||
    member.contactPerson2 ||
    member.companyEmailAddress ||
    member.website ||
    member.productsDealing ||
    member.createdAt ||
    member.created_at ||
    member.updated_at;

  return (
    <div className="bg-card rounded-2xl overflow-hidden shadow-card hover-lift border border-border/50 group">
      {/* Image */}
      <div className="aspect-video relative overflow-hidden bg-muted">
        <MemberImageCarousel
          imageUrls={member.imageUrls}
          alt={member.companyName}
          onClick={() => onImageClick(member)}
        />
        {member.membershipNumber && (
          <span className="absolute top-4 right-4 px-3 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
            {member.membershipNumber}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl accent-gradient flex items-center justify-center flex-shrink-0">
            <Building2 className="w-6 h-6 text-accent-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-serif font-bold text-foreground leading-tight">
              {member.companyName}
            </h3>
            {(member.createdAt || member.created_at) && (
              <p className="text-sm text-muted-foreground">
                Joined{" "}
                {new Date(
                  member.createdAt || member.created_at!
                ).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>

        {/* Important fields - shown directly */}
        <div className="space-y-3 text-sm">
          {member.owner && (
            <div className="flex items-center gap-3 text-foreground/80">
              <User className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="truncate">{member.owner}</span>
            </div>
          )}
          {member.ownerMobileNumber && (
            <div className="flex items-center gap-3 text-foreground/80">
              <Phone className="w-4 h-4 text-primary flex-shrink-0" />
              <a
                href={`tel:${member.ownerMobileNumber}`}
                className="truncate hover:underline"
              >
                {member.ownerMobileNumber}
              </a>
            </div>
          )}
          {member.address && (
            <div className="flex items-start gap-3 text-foreground/80">
              <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <span className="line-clamp-2">{member.address}</span>
            </div>
          )}
          {member.shopContactNumbers && (
            <div className="flex items-center gap-3 text-foreground/80">
              <Phone className="w-4 h-4 text-primary flex-shrink-0" />
              <a
                href={`tel:${member.shopContactNumbers}`}
                className="hover:underline"
              >
                {member.shopContactNumbers}
              </a>
            </div>
          )}
          {(member.emailAddress || member.companyEmailAddress) && (
            <div className="flex items-center gap-3 text-foreground/80">
              <Mail className="w-4 h-4 text-primary flex-shrink-0" />
              <a
                href={`mailto:${member.emailAddress || member.companyEmailAddress}`}
                className="truncate hover:underline"
              >
                {member.emailAddress || member.companyEmailAddress}
              </a>
            </div>
          )}
        </div>

        {/* Expandable accordion for other fields */}
        {hasAccordionContent && (
          <Accordion type="single" collapsible className="mt-4 border-t border-border pt-4">
            <AccordionItem value="more" className="border-none">
              <AccordionTrigger className="py-0 text-sm font-medium text-muted-foreground hover:text-foreground [&[data-state=open]>svg]:rotate-180">
                <span className="flex items-center gap-2">
                  <ChevronDown className="h-4 w-4 shrink-0 transition-transform" />
                  More details
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-0 pt-2">
                <div className="space-y-2 text-sm text-muted-foreground">
                  {member.contactPerson1 && (
                    <p>
                      <span className="font-medium text-foreground/80">Contact 1:</span>{" "}
                      {member.contactPerson1}
                      {member.mobileNumberContactPerson1 && (
                        <> · {member.mobileNumberContactPerson1}</>
                      )}
                    </p>
                  )}
                  {member.contactPerson2 && (
                    <p>
                      <span className="font-medium text-foreground/80">Contact 2:</span>{" "}
                      {member.contactPerson2}
                      {member.mobileNumberContactPerson2 && (
                        <> · {member.mobileNumberContactPerson2}</>
                      )}
                    </p>
                  )}
                  {member.companyEmailAddress && member.companyEmailAddress !== member.emailAddress && (
                    <p>
                      <span className="font-medium text-foreground/80">Company email:</span>{" "}
                      {member.companyEmailAddress}
                    </p>
                  )}
                  {member.website && (
                    <p className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      <a
                        href={member.website.startsWith("http") ? member.website : `https://${member.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {member.website}
                      </a>
                    </p>
                  )}
                  {member.productsDealing && (
                    <p className="flex items-center gap-2">
                      <Package className="w-4 h-4" />
                      {member.productsDealing}
                    </p>
                  )}
                  {member.updated_at && (
                    <p className="text-xs pt-2 border-t border-border/50">
                      Last updated: {new Date(member.updated_at).toLocaleString()}
                    </p>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </div>
    </div>
  );
}

function MemberAccordionRow({
  member,
  onImageClick,
}: {
  member: ApiMember;
  onImageClick: (member: ApiMember) => void;
}) {
  return (
    <AccordionItem value={member.id} className="border border-border/50 rounded-xl overflow-hidden mb-3 last:mb-0 bg-card shadow-card">
      <AccordionTrigger className="px-6 py-4 hover:no-underline [&[data-state=open]]:rounded-b-none">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-left">
          <span className="font-serif font-bold text-foreground">
            {member.companyName}
          </span>
          {member.owner && (
            <span className="text-muted-foreground flex items-center gap-2">
              <User className="w-4 h-4 text-primary" />
              {member.owner}
            </span>
          )}
          {member.membershipNumber && (
            <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
              {member.membershipNumber}
            </span>
          )}
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-6 pb-6 pt-2 border-t border-border/50 bg-muted/30">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Images */}
          <div className="w-full md:w-80 flex-shrink-0">
            <p className="text-sm font-medium text-foreground mb-2">Images</p>
            <div className="aspect-video rounded-xl overflow-hidden bg-muted border border-border/50">
              <MemberImageCarousel
                imageUrls={member.imageUrls}
                alt={member.companyName}
                onClick={() => onImageClick(member)}
              />
            </div>
          </div>
          {/* All other fields */}
          <div className="flex-1 min-w-0 space-y-4">
            {(member.createdAt || member.created_at) && (
              <p className="text-sm text-muted-foreground">
                Joined{" "}
                {new Date(
                  member.createdAt || member.created_at!
                ).toLocaleDateString()}
              </p>
            )}
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              {member.address && (
                <div className="flex items-start gap-3 text-foreground/90">
                  <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>{member.address}</span>
                </div>
              )}
              {member.ownerMobileNumber && (
                <div className="flex items-center gap-3 text-foreground/90">
                  <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                  <a href={`tel:${member.ownerMobileNumber}`} className="hover:underline">
                    {member.ownerMobileNumber}
                  </a>
                </div>
              )}
              {member.shopContactNumbers && (
                <div className="flex items-center gap-3 text-foreground/90">
                  <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                  <a href={`tel:${member.shopContactNumbers}`} className="hover:underline">
                    {member.shopContactNumbers}
                  </a>
                </div>
              )}
              {(member.emailAddress || member.companyEmailAddress) && (
                <div className="flex items-center gap-3 text-foreground/90">
                  <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                  <a
                    href={`mailto:${member.emailAddress || member.companyEmailAddress}`}
                    className="hover:underline truncate block"
                  >
                    {member.emailAddress || member.companyEmailAddress}
                  </a>
                </div>
              )}
              {member.contactPerson1 && (
                <div className="sm:col-span-2">
                  <span className="font-medium text-foreground/80">Contact 1:</span>{" "}
                  {member.contactPerson1}
                  {member.mobileNumberContactPerson1 && (
                    <> · {member.mobileNumberContactPerson1}</>
                  )}
                </div>
              )}
              {member.contactPerson2 && (
                <div className="sm:col-span-2">
                  <span className="font-medium text-foreground/80">Contact 2:</span>{" "}
                  {member.contactPerson2}
                  {member.mobileNumberContactPerson2 && (
                    <> · {member.mobileNumberContactPerson2}</>
                  )}
                </div>
              )}
              {member.companyEmailAddress && member.companyEmailAddress !== member.emailAddress && (
                <div className="flex items-center gap-3 text-foreground/90">
                  <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>Company: {member.companyEmailAddress}</span>
                </div>
              )}
              {member.website && (
                <div className="flex items-center gap-3 text-foreground/90 sm:col-span-2">
                  <Globe className="w-4 h-4 text-primary flex-shrink-0" />
                  <a
                    href={member.website.startsWith("http") ? member.website : `https://${member.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {member.website}
                  </a>
                </div>
              )}
              {member.productsDealing && (
                <div className="flex items-center gap-3 text-foreground/90 sm:col-span-2">
                  <Package className="w-4 h-4 text-primary flex-shrink-0" />
                  {member.productsDealing}
                </div>
              )}
              {member.updated_at && (
                <p className="text-xs text-muted-foreground sm:col-span-2 pt-2 border-t border-border/50">
                  Last updated: {new Date(member.updated_at).toLocaleString()}
                </p>
              )}
            </div>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

const MembersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [members, setMembers] = useState<ApiMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lightboxMember, setLightboxMember] = useState<ApiMember | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const debouncedSearch = useDebounce(searchQuery, 400);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    getMembers(debouncedSearch)
      .then((data) => {
        if (!cancelled) setMembers(data);
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message || "Failed to load members");
          setMembers([]);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [debouncedSearch]);

  const urlsForLightbox =
    (lightboxMember?.imageUrls?.length ?? 0) > 0
      ? lightboxMember!.imageUrls!
      : [DEFAULT_FRUIT_IMAGE];

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 hero-gradient fruit-pattern overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4 animate-fade-up">
            Our Network
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-6 animate-fade-up">
            {MEMBERS_PAGE_CONTENT.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-up">
            {MEMBERS_PAGE_CONTENT.description}
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-muted border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder={MEMBERS_PAGE_CONTENT.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-lg bg-card border-border/50 shadow-soft"
              />
            </div>
            <div className="flex items-center gap-1 rounded-lg border border-border/50 bg-card p-1 shadow-soft">
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="sm"
                className="gap-2"
                onClick={() => setViewMode("grid")}
                aria-pressed={viewMode === "grid"}
                aria-label="Grid view"
              >
                <LayoutGrid className="w-5 h-5" />
                <span className="hidden sm:inline">Grid</span>
              </Button>
              <Button
                variant={viewMode === "accordion" ? "secondary" : "ghost"}
                size="sm"
                className="gap-2"
                onClick={() => setViewMode("accordion")}
                aria-pressed={viewMode === "accordion"}
                aria-label="List accordion view"
              >
                <List className="w-5 h-5" />
                <span className="hidden sm:inline">List</span>
              </Button>
            </div>
          </div>
          <p className="text-center text-muted-foreground mt-4">
            {loading
              ? "Searching..."
              : `Showing ${members.length} member${members.length === 1 ? "" : "s"}`}
          </p>
        </div>
      </section>

      {/* Members Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {error && (
            <div className="text-center py-8 text-destructive mb-6 rounded-lg bg-destructive/10">
              {error}
            </div>
          )}

          {loading && members.length === 0 ? (
            viewMode === "grid" ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="bg-card rounded-2xl overflow-hidden shadow-card border border-border/50 animate-pulse"
                  >
                    <div className="aspect-video bg-muted" />
                    <div className="p-6 space-y-3">
                      <div className="h-5 bg-muted rounded w-3/4" />
                      <div className="h-4 bg-muted rounded w-full" />
                      <div className="h-4 bg-muted rounded w-5/6" />
                      <div className="h-4 bg-muted rounded w-4/6" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="max-w-3xl mx-auto space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="h-16 rounded-xl bg-muted border border-border/50 animate-pulse"
                  />
                ))}
              </div>
            )
          ) : viewMode === "accordion" ? (
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {members.map((member) => (
                  <MemberAccordionRow
                    key={member.id}
                    member={member}
                    onImageClick={setLightboxMember}
                  />
                ))}
              </Accordion>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {members.map((member) => (
                <MemberCard
                  key={member.id}
                  member={member}
                  onImageClick={setLightboxMember}
                />
              ))}
            </div>
          )}

          {!loading && members.length === 0 && !error && (
            <div className="text-center py-16">
              <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-foreground mb-2">
                No members found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your search by company name to find what you&apos;re
                looking for.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox: bigger carousel when user clicks image */}
      <Dialog
        open={!!lightboxMember}
        onOpenChange={(open) => !open && setLightboxMember(null)}
      >
        <DialogContent className="max-w-4xl w-[95vw] p-2 sm:p-6">
          <DialogHeader>
            <DialogTitle className="text-center pr-8">
              {lightboxMember?.companyName}
            </DialogTitle>
          </DialogHeader>
          {lightboxMember && (
            <Carousel
              opts={{ align: "center", loop: true }}
              className="w-full"
            >
              <CarouselContent>
                {urlsForLightbox.map((url, i) => (
                  <CarouselItem key={`lb-${url}-${i}`}>
                    <div className="relative w-full aspect-[4/3] bg-muted rounded-lg overflow-hidden">
                      <img
                        src={url}
                        alt={`${lightboxMember.companyName} ${i + 1}`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {urlsForLightbox.length > 1 && (
                <>
                  <CarouselPrevious className="left-2" />
                  <CarouselNext className="right-2" />
                </>
              )}
            </Carousel>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export { MembersPage };
