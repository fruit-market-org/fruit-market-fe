"use client";

import { useState, useEffect } from "react";
import { COMMITTEE_PAGE_CONTENT } from "@/constants";
import { Mail, Phone, User as UserIcon } from "lucide-react";
import { getCommitteeMembers } from "@/lib/committee-api";
import type { ApiCommitteeMember } from "@/types/committee";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

// Designation order for hierarchical display (current committee). Lower index = higher tier.
const DESIGNATION_ORDER: string[] = [
  "president",
  "vice president",
  "secretary",
  "jt. secretary",
  "joint secretary",
  "ast. secretary",
  "asst. secretary",
  "assistant secretary",
  "treasurer",
  "tresaurer", // typo in some data
  "committee member",
  "executive member",
  "co-op committee member",
];

function designationTier(designation: string): number {
  const normalized = designation.toLowerCase().trim();
  const index = DESIGNATION_ORDER.findIndex((d) => normalized.includes(d));
  return index >= 0 ? index : DESIGNATION_ORDER.length;
}

function CommitteeMemberAvatar({
  name,
  imageUrl,
  className,
  size = "default",
}: {
  name: string;
  imageUrl: string | null;
  className?: string;
  size?: "sm" | "default" | "lg";
}) {
  const sizeClasses = {
    sm: "h-16 w-16",
    default: "h-24 w-24",
    lg: "h-32 w-32",
  };
  const iconSizes = { sm: "h-8 w-8", default: "h-12 w-12", lg: "h-16 w-16" };
  return (
    <Avatar
      className={cn(
        "rounded-lg border-2 border-border shadow-md",
        sizeClasses[size],
        className
      )}
    >
      {imageUrl ? (
        <AvatarImage src={imageUrl} alt={name} className="object-cover" />
      ) : null}
      <AvatarFallback className="rounded-lg bg-muted">
        <UserIcon className={cn("text-muted-foreground", iconSizes[size])} />
      </AvatarFallback>
    </Avatar>
  );
}

function CurrentCommitteeHierarchy({
  members,
}: {
  members: ApiCommitteeMember[];
}) {
  const sorted = [...members].sort(
    (a, b) => designationTier(a.designation) - designationTier(b.designation)
  );
  if (sorted.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-12">
        No current committee members to display.
      </p>
    );
  }

  // Tier layout: 1 (President) -> then groups of 3 -> then rest
  const president = sorted.find(
    (m) => designationTier(m.designation) === 0
  );
  const withoutPresident = president
    ? sorted.filter((m) => m.id !== president.id)
    : sorted;
  const tier2 = withoutPresident.slice(0, 3);
  const tier3 = withoutPresident.slice(3, 6);
  const tier4 = withoutPresident.slice(6);

  const MemberBlock = ({
    member,
    className,
  }: {
    member: ApiCommitteeMember;
    className?: string;
  }) => (
    <div
      className={cn(
        "flex flex-col items-center text-center p-4 bg-card rounded-2xl border border-border/50 shadow-card",
        className
      )}
    >
      <CommitteeMemberAvatar
        name={member.name}
        imageUrl={member.imageUrl}
        size={tier4.length > 0 ? "default" : "lg"}
      />
      <p className="font-serif font-bold text-foreground mt-3 leading-tight">
        {member.name}
      </p>
      <p className="text-sm text-muted-foreground">({member.designation})</p>
    </div>
  );

  return (
    <div className="space-y-10">
      {/* Tier 1: President */}
      {president && (
        <div className="flex justify-center">
          <MemberBlock member={president} className="max-w-[280px]" />
        </div>
      )}

      {/* Tier 2 */}
      {tier2.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {tier2.map((m) => (
            <MemberBlock key={m.id} member={m} />
          ))}
        </div>
      )}

      {/* Tier 3 */}
      {tier3.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {tier3.map((m) => (
            <MemberBlock key={m.id} member={m} />
          ))}
        </div>
      )}

      {/* Tier 4: Rest */}
      {tier4.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {tier4.map((m) => (
            <MemberBlock key={m.id} member={m} />
          ))}
        </div>
      )}
    </div>
  );
}

function OldCommitteeAccordionRow({
  member,
}: {
  member: ApiCommitteeMember;
}) {
  return (
    <AccordionItem
      value={member.id}
      className="border border-border/50 rounded-xl overflow-hidden mb-3 last:mb-0 bg-card shadow-card"
    >
      <AccordionTrigger className="px-6 py-4 hover:no-underline [&[data-state=open]]:rounded-b-none">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-left">
          <span className="font-serif font-bold text-foreground">
            {member.name}
          </span>
          <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
            {member.designation}
          </span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-6 pb-6 pt-2 border-t border-border/50 bg-muted/30">
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex-shrink-0">
            <CommitteeMemberAvatar
              name={member.name}
              imageUrl={member.imageUrl}
              size="lg"
            />
          </div>
          <div className="flex-1 min-w-0 space-y-3 text-sm">
            {member.email && (
              <div className="flex items-center gap-3 text-foreground/90">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <a href={`mailto:${member.email}`} className="hover:underline">
                  {member.email}
                </a>
              </div>
            )}
            {member.phoneNumber && (
              <div className="flex items-center gap-3 text-foreground/90">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <a href={`tel:${member.phoneNumber}`} className="hover:underline">
                  {member.phoneNumber}
                </a>
              </div>
            )}
            {member.year != null && (
              <p className="text-muted-foreground">Year: {member.year}</p>
            )}
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

const CommitteePage = () => {
  const [currentMembers, setCurrentMembers] = useState<ApiCommitteeMember[]>(
    []
  );
  const [oldMembers, setOldMembers] = useState<ApiCommitteeMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    getCommitteeMembers()
      .then(({ current, old }) => {
        if (!cancelled) {
          setCurrentMembers(current);
          setOldMembers(old);
          if (old.length > 0) {
            const years = [...new Set(old.map((m) => m.year).filter((y): y is number => y != null))];
            const latest = Math.max(...years);
            setSelectedYear(latest);
          }
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message || "Failed to load committee members");
          setCurrentMembers([]);
          setOldMembers([]);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const years = [...new Set(oldMembers.map((m) => m.year).filter((y): y is number => y != null))].sort(
    (a, b) => b - a
  );
  const filteredOldMembers =
    selectedYear != null
      ? oldMembers.filter((m) => m.year === selectedYear)
      : oldMembers;

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 hero-gradient fruit-pattern overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4 animate-fade-up">
            Leadership
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-6 animate-fade-up">
            {COMMITTEE_PAGE_CONTENT.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-up">
            {COMMITTEE_PAGE_CONTENT.description}
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          {error && (
            <div className="text-center py-8 text-destructive mb-6 rounded-lg bg-destructive/10">
              {error}
            </div>
          )}

          {loading ? (
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="flex justify-center">
                <div className="h-48 w-56 rounded-2xl bg-muted animate-pulse" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-52 rounded-2xl bg-muted animate-pulse"
                  />
                ))}
              </div>
            </div>
          ) : (
            <Tabs defaultValue="current" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-10">
                <TabsTrigger value="current">Current Committee</TabsTrigger>
                <TabsTrigger value="old">Old Committee</TabsTrigger>
              </TabsList>

              <TabsContent value="current" className="mt-6">
                <div className="max-w-4xl mx-auto">
                  <CurrentCommitteeHierarchy members={currentMembers} />
                </div>
              </TabsContent>

              <TabsContent value="old" className="mt-6">
                <div className="max-w-3xl mx-auto">
                  {years.length > 0 && (
                    <div className="mb-6 flex items-center gap-3">
                      <label
                        htmlFor="year-select"
                        className="text-sm font-medium text-foreground"
                      >
                        Select year:
                      </label>
                      <Select
                        value={selectedYear?.toString() ?? ""}
                        onValueChange={(v) => setSelectedYear(v ? parseInt(v, 10) : null)}
                      >
                        <SelectTrigger id="year-select" className="w-[140px]">
                          <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent>
                          {years.map((y) => (
                            <SelectItem key={y} value={y.toString()}>
                              {y}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  {filteredOldMembers.length === 0 ? (
                    <p className="text-center text-muted-foreground py-12">
                      No committee members for the selected year.
                    </p>
                  ) : (
                    <Accordion type="single" collapsible className="w-full">
                      {filteredOldMembers.map((member) => (
                        <OldCommitteeAccordionRow key={member.id} member={member} />
                      ))}
                    </Accordion>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </section>

      {/* Join Committee CTA */}
      <section className="py-16 bg-muted fruit-pattern">
        <div className="container mx-auto px-4 text-center">
          <div className="w-20 h-20 rounded-full accent-gradient flex items-center justify-center mx-auto mb-6">
            <UserIcon className="w-10 h-10 text-accent-foreground" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-foreground mb-4">
            Want to Serve the Community?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            If you&apos;re a member passionate about contributing to our
            association&apos;s growth and the welfare of fellow merchants,
            consider nominating yourself for the next committee elections.
          </p>
        </div>
      </section>
    </>
  );
};

export { CommitteePage };
