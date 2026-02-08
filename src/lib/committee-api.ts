import { api } from "@/lib/api";
import type {
  ApiCommitteeMember,
  GetCommitteeMembersResponse,
} from "@/types/committee";

export async function getCommitteeMembers(): Promise<{
  current: ApiCommitteeMember[];
  old: ApiCommitteeMember[];
}> {
  const { data } = await api.get<GetCommitteeMembersResponse>(
    "/committee-members"
  );
  if (!data.success || !data.data) {
    return { current: [], old: [] };
  }
  return {
    current: data.data.currentCommitteeMembers ?? [],
    old: data.data.oldCommitteeMembers ?? [],
  };
}
