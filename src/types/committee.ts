/**
 * Committee member as returned by GET /committee-members.
 */
export interface ApiCommitteeMember {
  id: string;
  name: string;
  designation: string;
  email: string | null;
  phoneNumber: string | null;
  imageUrl: string | null;
  year?: number;
  created_at?: string;
  updated_at?: string;
}

export interface GetCommitteeMembersResponse {
  success: boolean;
  data: {
    currentCommitteeMembers: ApiCommitteeMember[];
    oldCommitteeMembers: ApiCommitteeMember[];
  };
}
