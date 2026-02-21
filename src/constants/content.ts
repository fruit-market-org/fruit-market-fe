// ============================================
// SITE CONTENT CONSTANTS
// All text content should be modified here
// ============================================

export const SITE_INFO = {
  name: "The Ahmedabad Wholesale Fruit Merchants Association",
  shortName: "AWFMA",
  tagline: "Uniting Fruit Merchants Since 1952",
  description: "The premier association of wholesale fruit merchants in Ahmedabad, dedicated to promoting fair trade, quality standards, and community welfare among fruit traders.",
  address: "Ahmedabad Fruit Market Complex, Jamalpur, Ahmedabad - 380022, Gujarat, India",
  phone: "+91 79 2535 1234",
  email: "info@awfma.org",
  workingHours: "Monday - Saturday: 4:00 AM - 8:00 PM",
};

export const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Members List", path: "/members" },
  { name: "Committee Members", path: "/committee" },
  { name: "Gallery", path: "/gallery" },
  { name: "Contact Us", path: "/contact" },
];

export const HERO_CONTENT = {
  title: "Fresh From The Heart of Gujarat",
  subtitle: "Connecting Farmers to Markets, Fruits to Families",
  description: "For over seven decades, we have been the backbone of Ahmedabad's fruit trade, ensuring quality produce reaches every corner of the region.",
  ctaText: "Explore Our Members",
  secondaryCtaText: "Contact Us",
};

export const HERO_SLIDES = [
  {
    title: "Quality Fresh Fruits",
    subtitle: "From farm to market with care",
    image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=1920&q=80",
  },
  {
    title: "Trusted Merchants",
    subtitle: "Building relationships since 1952",
    image: "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=1920&q=80",
  },
  {
    title: "Vibrant Marketplace",
    subtitle: "The heart of Gujarat's fruit trade",
    image: "https://images.unsplash.com/photo-1528821128474-27f963b062bf?w=1920&q=80",
  },
];

export const ABOUT_CONTENT = {
  title: "About Our Association",
  subtitle: "A Legacy of Trust and Quality",
  history: `The Ahmedabad Wholesale Fruit Merchants Association was established in 1952 with a vision to organize and uplift the fruit trading community of Ahmedabad. What started as a small group of dedicated merchants has now grown into one of the most respected trade associations in Gujarat.

Our founders believed in the power of unity and fair trade practices. They laid the foundation for an organization that would not only protect the interests of its members but also ensure that consumers receive the freshest and highest quality fruits.

Over the decades, we have witnessed the transformation of Ahmedabad's fruit market from a local trading hub to a major distribution center serving the entire Western India region. Through it all, our commitment to quality, integrity, and community welfare has remained unwavering.`,
  mission: "To foster a thriving community of fruit merchants committed to fair trade, quality excellence, and sustainable practices that benefit farmers, traders, and consumers alike.",
  vision: "To be the most trusted and influential fruit merchants' association in India, setting benchmarks for quality, transparency, and innovation in the fruit trade industry.",
  values: [
    {
      title: "Quality Excellence",
      description: "We maintain the highest standards in fruit quality and freshness.",
      icon: "award",
    },
    {
      title: "Fair Trade",
      description: "We promote ethical business practices and fair pricing for all stakeholders.",
      icon: "scale",
    },
    {
      title: "Community First",
      description: "We prioritize the welfare of our members and the communities we serve.",
      icon: "users",
    },
    {
      title: "Innovation",
      description: "We embrace modern practices while respecting traditional values.",
      icon: "lightbulb",
    },
  ],
  stats: [
    { value: "70+", label: "Years of Legacy" },
    { value: "500+", label: "Active Members" },
    { value: "1000+", label: "Tons Daily Trade" },
    { value: "100+", label: "Fruit Varieties" },
  ],
};

export const CONTACT_CONTENT = {
  title: "Get in Touch",
  subtitle: "We'd love to hear from you",
  description: "Whether you're a merchant looking to join our association, a farmer seeking reliable buyers, or a business interested in partnering with us, we're here to help.",
  formLabels: {
    name: "Your Name",
    email: "Email Address",
    phone: "Phone Number",
    subject: "Subject",
    message: "Your Message",
    submit: "Send Message",
  },
  contactInfo: [
    {
      type: "address",
      title: "Visit Us",
      value: SITE_INFO.address,
      icon: "map-pin",
    },
    {
      type: "phone",
      title: "Call Us",
      value: SITE_INFO.phone,
      icon: "phone",
    },
    {
      type: "email",
      title: "Email Us",
      value: SITE_INFO.email,
      icon: "mail",
    },
    {
      type: "hours",
      title: "Working Hours",
      value: SITE_INFO.workingHours,
      icon: "clock",
    },
  ],
};

export const GALLERY_CONTENT = {
  title: "Our Gallery",
  subtitle: "Glimpses of Our Vibrant Community",
  description: "Explore moments captured from our bustling marketplace, community events, and the beautiful array of fresh fruits we trade.",
  categories: ["All", "Marketplace", "Events", "Fruits", "Community"],
};

export const GALLERY_IMAGES = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=800&q=80",
    alt: "Colorful fruit display",
    category: "Fruits",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1573246123716-6b1782bfc499?w=800&q=80",
    alt: "Fresh mangoes",
    category: "Fruits",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=800&q=80",
    alt: "Fruit market stall",
    category: "Marketplace",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1573246123716-6b1782bfc499?w=800&q=80",
    alt: "Fresh fruit baskets",
    category: "Marketplace",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=800&q=80",
    alt: "Fresh citrus fruits",
    category: "Fruits",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1595475207225-428b62bda831?w=800&q=80",
    alt: "Watermelons",
    category: "Fruits",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=800&q=80",
    alt: "Fresh fruit platter",
    category: "Fruits",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=800&q=80",
    alt: "Tropical fruits",
    category: "Fruits",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=800&q=80",
    alt: "Seasonal fruit harvest",
    category: "Events",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&q=80",
    alt: "Apple varieties",
    category: "Fruits",
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&q=80",
    alt: "Fresh apples",
    category: "Fruits",
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=800&q=80",
    alt: "Exotic fresh fruits",
    category: "Community",
  },
];

export const FOOTER_CONTENT = {
  description: "Serving the fruit trade community of Ahmedabad with dedication and integrity since 1952.",
  quickLinks: NAV_LINKS,
  socialLinks: [
    { name: "Facebook", url: "https://facebook.com", icon: "facebook" },
    { name: "Twitter", url: "https://twitter.com", icon: "twitter" },
    { name: "Instagram", url: "https://instagram.com", icon: "instagram" },
    { name: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" },
  ],
  copyright: `© ${new Date().getFullYear()} ${SITE_INFO.name}. All rights reserved.`,
};

export const MEMBERS_PAGE_CONTENT = {
  title: "Our Members",
  subtitle: "Meet Our Trusted Fruit Merchants",
  description: "Our association comprises over 500 dedicated fruit merchants, each committed to delivering quality produce and maintaining the highest standards of trade.",
  searchPlaceholder: "Search by company name...",
};

export const COMMITTEE_PAGE_CONTENT = {
  title: "Committee Members",
  subtitle: "Leadership That Inspires",
  description: "Our committee comprises dedicated individuals who volunteer their time and expertise to guide the association towards excellence.",
};
