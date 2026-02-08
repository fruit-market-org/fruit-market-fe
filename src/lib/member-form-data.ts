/**
 * Fetches image URLs and returns them as File objects for use in edit payload.
 */
export async function fetchImageUrlsAsFiles(
  urls: string[]
): Promise<File[]> {
  const files: File[] = [];
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    try {
      const res = await fetch(url, { mode: "cors" });
      if (!res.ok) continue;
      const blob = await res.blob();
      const name = url.split("/").pop() ?? `image-${i}.jpg`;
      const file = new File([blob], name, { type: blob.type || "image/jpeg" });
      files.push(file);
    } catch {
      // Skip failed fetches
    }
  }
  return files;
}

export interface MemberFormPayload {
  companyName: string;
  membershipNumber?: string;
  address?: string;
  shopContactNumbers?: string;
  owner?: string;
  ownerMobileNumber?: string;
  contactPerson1?: string;
  mobileNumberContactPerson1?: string;
  contactPerson2?: string;
  mobileNumberContactPerson2?: string;
  companyEmailAddress?: string;
  website?: string;
  productsDealing?: string;
  emailAddress?: string;
  /** New image files (from file input). For edit, also add existing images via fetchImageUrlsAsFiles. */
  imageFiles?: File[];
}

const FIELD_KEYS: (keyof MemberFormPayload)[] = [
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

export interface BuildMemberFormDataOptions {
  /** When true, append imageUrls as "[]" so the backend clears existing images. */
  clearImages?: boolean;
}

export function buildMemberFormData(
  payload: MemberFormPayload,
  options?: BuildMemberFormDataOptions
): FormData {
  const form = new FormData();
  for (const key of FIELD_KEYS) {
    const value = payload[key];
    if (value !== undefined && value !== null && value !== "") {
      form.append(key, String(value));
    }
  }
  const files = payload.imageFiles ?? [];
  for (const file of files) {
    form.append("images", file);
  }
  if (options?.clearImages) {
    form.append("images", "[]");
  }
  return form;
}
