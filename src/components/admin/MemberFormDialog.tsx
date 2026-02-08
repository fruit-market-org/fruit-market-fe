"use client";

import { useState, useEffect } from "react";
import type { ApiMember } from "@/types/member";
import type { MemberFormPayload } from "@/lib/member-form-data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

const FORM_KEYS: (keyof MemberFormPayload)[] = [
  "companyName",
  "membershipNumber",
  "address",
  "shopContactNumbers",
  "owner",
  "ownerMobileNumber",
  "contactPerson1",
  "mobileNumberContactPerson1",
  "contactPerson2",
  "mobileNumberContactPerson2",
  "companyEmailAddress",
  "website",
  "productsDealing",
  "emailAddress",
];

const LABELS: Record<string, string> = {
  companyName: "Company name",
  membershipNumber: "Membership number",
  address: "Address",
  shopContactNumbers: "Shop contact numbers",
  owner: "Owner",
  ownerMobileNumber: "Owner mobile number",
  contactPerson1: "Contact person 1",
  mobileNumberContactPerson1: "Mobile (contact 1)",
  contactPerson2: "Contact person 2",
  mobileNumberContactPerson2: "Mobile (contact 2)",
  companyEmailAddress: "Company email",
  website: "Website",
  productsDealing: "Products dealing",
  emailAddress: "Email address",
};

interface MemberFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "add" | "edit";
  member?: ApiMember;
  onSubmit: (payload: MemberFormPayload, options?: { existingUrlsToKeep?: string[] }) => Promise<void>;
}

export function MemberFormDialog({
  open,
  onOpenChange,
  mode,
  member,
  onSubmit,
}: MemberFormDialogProps) {
  const [form, setForm] = useState<Record<string, string>>({});
  const [newImageFiles, setNewImageFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  /** URLs of existing images that the user chose to remove (edit mode). */
  const [removedExistingUrls, setRemovedExistingUrls] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!open) {
      setNewImageFiles([]);
      setPreviewImageUrl(null);
      setRemovedExistingUrls(new Set());
      return;
    }
    if (mode === "add") {
      setForm({});
      setNewImageFiles([]);
      setRemovedExistingUrls(new Set());
    } else if (member) {
      setForm({
        companyName: member.companyName ?? "",
        membershipNumber: member.membershipNumber ?? "",
        address: member.address ?? "",
        shopContactNumbers: member.shopContactNumbers ?? "",
        owner: member.owner ?? "",
        ownerMobileNumber: member.ownerMobileNumber ?? "",
        contactPerson1: member.contactPerson1 ?? "",
        mobileNumberContactPerson1: member.mobileNumberContactPerson1 ?? "",
        contactPerson2: member.contactPerson2 ?? "",
        mobileNumberContactPerson2: member.mobileNumberContactPerson2 ?? "",
        companyEmailAddress: member.companyEmailAddress ?? "",
        website: member.website ?? "",
        productsDealing: member.productsDealing ?? "",
        emailAddress: member.emailAddress ?? "",
      });
      setNewImageFiles([]);
      setRemovedExistingUrls(new Set());
    }
  }, [open, mode, member]);

  // Object URLs for new file previews (revoked when files change or unmount)
  const [newImagePreviewUrls, setNewImagePreviewUrls] = useState<string[]>([]);
  useEffect(() => {
    const urls = newImageFiles.map((f) => URL.createObjectURL(f));
    setNewImagePreviewUrls(urls);
    return () => urls.forEach(URL.revokeObjectURL);
  }, [newImageFiles]);

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.length) {
      setNewImageFiles((prev) => [...prev, ...Array.from(files)]);
    }
    e.target.value = "";
  };

  const removeNewImage = (index: number) => {
    setNewImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (url: string) => {
    setRemovedExistingUrls((prev) => new Set(prev).add(url));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.companyName?.trim()) return;
    setSubmitting(true);
    try {
      const payload: MemberFormPayload = {
        ...form,
        companyName: form.companyName.trim(),
        imageFiles: newImageFiles.length ? newImageFiles : undefined,
      };
      const existingUrls = member?.imageUrls ?? [];
      const existingUrlsToKeep =
        mode === "edit" && existingUrls.length > 0
          ? existingUrls.filter((url) => !removedExistingUrls.has(url))
          : undefined;
      await onSubmit(payload, { existingUrlsToKeep });
      onOpenChange(false);
    } finally {
      setSubmitting(false);
    }
  };

  const existingUrls = member?.imageUrls ?? [];
  const existingUrlsToShow = existingUrls.filter((url) => !removedExistingUrls.has(url));

  return (
    <>
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] h-[90vh] flex flex-col overflow-hidden p-0 gap-0">
        <DialogHeader className="shrink-0 px-6 pt-6 pb-4">
          <DialogTitle>
            {mode === "add" ? "Add new member" : "Edit member"}
          </DialogTitle>
        </DialogHeader>
        <form id="member-form" onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0 overflow-hidden">
          <div className="flex-1 min-h-0 overflow-hidden px-6">
            <ScrollArea className="h-full">
              <div className="space-y-4 py-2 pr-4 pb-4">
              {FORM_KEYS.map((key) => (
                <div key={key} className="space-y-2">
                  <Label htmlFor={key}>
                    {LABELS[key] ?? key}
                    {key === "companyName" && " *"}
                  </Label>
                  <Input
                    id={key}
                    value={form[key] ?? ""}
                    onChange={(e) => handleChange(key, e.target.value)}
                    placeholder={LABELS[key]}
                    required={key === "companyName"}
                  />
                </div>
              ))}

              <div className="space-y-2">
                <Label>Images</Label>
                {mode === "edit" && existingUrlsToShow.length > 0 && (
                  <div className="mb-2">
                    <p className="text-xs text-muted-foreground mb-2">
                      Existing images (will be re-sent on save). Click to enlarge, or remove to drop from member:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {existingUrlsToShow.map((url, i) => (
                        <div key={i} className="flex flex-col items-center gap-1">
                          <button
                            type="button"
                            onClick={() => setPreviewImageUrl(url)}
                            className="w-14 h-14 shrink-0 rounded border border-border overflow-hidden bg-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:opacity-90 transition-opacity"
                          >
                            <img
                              src={url}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeExistingImage(url)}
                            className="text-xs text-destructive hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                />
                {newImageFiles.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {newImageFiles.map((file, i) => (
                      <div
                        key={i}
                        className="flex flex-col items-center gap-1"
                      >
                        <button
                          type="button"
                          onClick={() => newImagePreviewUrls[i] && setPreviewImageUrl(newImagePreviewUrls[i])}
                          className="w-14 h-14 shrink-0 rounded border border-border overflow-hidden bg-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:opacity-90 transition-opacity"
                        >
                          <img
                            src={newImagePreviewUrls[i]}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </button>
                        <span className="text-xs text-muted-foreground truncate max-w-[4.5rem]">
                          {file.name}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeNewImage(i)}
                          className="text-xs text-destructive hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              </div>
            </ScrollArea>
          </div>
          <DialogFooter className="shrink-0 px-6 py-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" form="member-form" disabled={submitting}>
              {submitting ? "Saving..." : mode === "add" ? "Create" : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
      </Dialog>

      {/* Image preview modal */}
      <Dialog open={!!previewImageUrl} onOpenChange={(open) => !open && setPreviewImageUrl(null)}>
        <DialogContent className="max-w-4xl w-[95vw] p-2 border-0 bg-black/90" aria-describedby={undefined}>
          <DialogTitle className="sr-only">Image preview</DialogTitle>
          {previewImageUrl && (
            <img
              src={previewImageUrl}
              alt="Preview"
              className="w-full h-auto max-h-[90vh] object-contain rounded"
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
