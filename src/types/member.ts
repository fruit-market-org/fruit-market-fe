/**
 * Member type as returned by the GET /members/ API.
 */
export interface ApiMember {
  id: string;
  companyName: string;
  membershipNumber: string;
  address: string;
  shopContactNumbers: string | null;
  owner: string;
  ownerMobileNumber: string | null;
  contactPerson1: string | null;
  mobileNumberContactPerson1: string | null;
  contactPerson2: string | null;
  mobileNumberContactPerson2: string | null;
  companyEmailAddress: string | null;
  website: string | null;
  productsDealing: string | null;
  emailAddress: string | null;
  imageUrls: string[] | null;
  createdAt?: string;
  created_at?: string;
  updated_at?: string;
}

export interface GetMembersResponse {
  success: boolean;
  data: {
    members: ApiMember[];
  };
}
