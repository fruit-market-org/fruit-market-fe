// ============================================
// COMMITTEE MEMBERS DATA
// ============================================

export interface CommitteeMember {
  id: number;
  name: string;
  designation: string;
  email: string;
  phone: string;
  description: string;
  imageUrls: string[];
}

export const COMMITTEE_DATA: CommitteeMember[] = [
  {
    id: 1,
    name: "Shri Rameshbhai Patel",
    designation: "President",
    email: "president@awfma.org",
    phone: "+91 98250 12345",
    description: "Serving the association for over 25 years with dedication and vision. Leading initiatives for modernization and fair trade practices.",
    imageUrls: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80"
    ],
  },
  {
    id: 2,
    name: "Shri Maheshbhai Shah",
    designation: "Vice President",
    email: "vicepresident@awfma.org",
    phone: "+91 98250 23456",
    description: "Passionate about community welfare and member support. Instrumental in organizing annual events and trade fairs.",
    imageUrls: [
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80"
    ],
  },
  {
    id: 3,
    name: "Shri Pravinbhai Mehta",
    designation: "Secretary",
    email: "secretary@awfma.org",
    phone: "+91 98250 34567",
    description: "Ensuring smooth operations and communication between members. Expert in documentation and regulatory compliance.",
    imageUrls: [
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80"
    ],
  },
  {
    id: 4,
    name: "Shri Hasmukhbhai Desai",
    designation: "Joint Secretary",
    email: "jointsecretary@awfma.org",
    phone: "+91 98250 45678",
    description: "Supporting administrative functions and member coordination. Dedicated to improving member services and benefits.",
    imageUrls: [
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&q=80"
    ],
  },
  {
    id: 5,
    name: "Shri Kantibhai Joshi",
    designation: "Treasurer",
    email: "treasurer@awfma.org",
    phone: "+91 98250 56789",
    description: "Managing financial operations with transparency and accountability. Implementing cost-effective solutions for members.",
    imageUrls: [
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80"
    ],
  },
  {
    id: 6,
    name: "Shri Nareshbhai Agarwal",
    designation: "Executive Member",
    email: "naresh@awfma.org",
    phone: "+91 98250 67890",
    description: "Contributing to policy development and market research. Focus on improving trade relationships with farmers.",
    imageUrls: [
      "https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?w=400&q=80"
    ],
  },
  {
    id: 7,
    name: "Shri Dipakbhai Modi",
    designation: "Executive Member",
    email: "dipak@awfma.org",
    phone: "+91 98250 78901",
    description: "Spearheading digital transformation initiatives. Expert in modern supply chain management.",
    imageUrls: [
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80"
    ],
  },
  {
    id: 8,
    name: "Shri Jayeshbhai Thakkar",
    designation: "Executive Member",
    email: "jayesh@awfma.org",
    phone: "+91 98250 89012",
    description: "Focusing on quality standards and member training programs. Advocate for sustainable trade practices.",
    imageUrls: [
      "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&q=80"
    ],
  },
];
