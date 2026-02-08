import { api } from "@/lib/api";
import type { ApiMember, GetMembersResponse } from "@/types/member";
import type { MemberFormPayload } from "@/lib/member-form-data";
import {
  buildMemberFormData,
  fetchImageUrlsAsFiles,
} from "@/lib/member-form-data";

export async function getMembers(search?: string): Promise<ApiMember[]> {
  const params = search?.trim() ? { search: search.trim() } : {};
  const { data } = await api.get<GetMembersResponse>("/members/", { params });
  if (!data.success || !data.data?.members) {
    return [];
  }
  return data.data.members;
}

interface CreateMemberResponse {
  success: boolean;
  member: ApiMember;
}

export async function createMember(payload: MemberFormPayload): Promise<ApiMember> {
  const formData = buildMemberFormData(payload);
  const { data } = await api.post<CreateMemberResponse>("/members", formData);
  if (!data.success || !data.member) throw new Error("Failed to create member");
  return data.member;
}

export async function updateMember(
  id: string,
  payload: MemberFormPayload,
  existingImageUrls: string[] | null
): Promise<ApiMember> {
  let imageFiles = payload.imageFiles ?? [];
  if (existingImageUrls?.length) {
    const existingFiles = await fetchImageUrlsAsFiles(existingImageUrls);
    imageFiles = [...existingFiles, ...imageFiles];
  }
  const clearImages =
    existingImageUrls !== null && existingImageUrls.length === 0 && imageFiles.length === 0;
  const formData = buildMemberFormData(
    { ...payload, imageFiles },
    { clearImages }
  );
  const { data } = await api.put<CreateMemberResponse>(`/members/${id}`, formData);
  if (!data.success || !data.member) throw new Error("Failed to update member");
  return data.member;
}

interface DeleteMemberResponse {
  success: boolean;
}

export async function deleteMember(id: string): Promise<void> {
  const res = await api.delete<DeleteMemberResponse>(`/members/${id}`);
  if (res.data && !res.data.success) throw new Error("Failed to delete member");
}
