// ============================================
// SITE CONTENT CONSTANTS
// All text content should be modified here
// ============================================

export const SITE_INFO = {
  name: "The Ahmedabad Wholesale Fruit Merchants Association",
  shortName: "TAWFMA",
  tagline: "Uniting Fruit Merchants Since 1961",
  description: "The premier association of wholesale fruit merchants in Ahmedabad, dedicated to promoting fair trade, quality standards, and community welfare among fruit traders.",
  address: "114/115, G.M Market, Mangal Jetha Compound, New Fruit Market, Naroda Road, Ahmedabad - 382330, Gujarat, India",
  addressLine2: "Nr. Gate No. 4, Nr. Ramapir Mandir, Main Road, New Fruit Market, Naroda Road, Ahmedabad - 382330",
  phone: "+91 9913148787",
  email: "tawfma2026@gmail.com",
  workingHours: "Monday - Saturday: 5:00 AM - 8:00 PM",
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

// Hero slide images are imported from @/assets/images in HomePage
export const HERO_SLIDES = [
  {
    title: "Quality Fresh Fruits",
    subtitle: "From farm to market with care",
  },
  {
    title: "Trusted Merchants",
    subtitle: "Building relationships since 1961",
  },
  {
    title: "Vibrant Marketplace",
    subtitle: "The heart of Gujarat's fruit trade",
  },
];

export const ABOUT_CONTENT = {
  title: "About Our Association",
  subtitle: "A Legacy of Trust and Quality",
  history: `The Ahmedabad Wholesale Fruit Merchants Association was established in 1961 with a vision to organize and uplift the fruit trading community of Ahmedabad. What started as a small group of dedicated merchants has now grown into one of the most respected trade associations in Gujarat.

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
    { value: "250+", label: "Active Members" },
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
  categories: ["All", "Fruits", "Marketplace", "Events"],
};

// Order interleaved (Fruits / Marketplace) so "All" shows a mixed gallery
export const GALLERY_IMAGES = [
  { id: 1, src: "https://res.cloudinary.com/dqywdfgik/image/upload/v1772295600/fruits_1_sppqqf.jpg", alt: "Fresh fruits", category: "Fruits" },
  { id: 13, src: "https://res.cloudinary.com/dqywdfgik/image/upload/v1772291355/marketplace_1_uxu4cv.jpg", alt: "Marketplace", category: "Marketplace" },
  { id: 2, src: "https://res.cloudinary.com/dqywdfgik/image/upload/v1772295597/fruits_2_bqaha4.jpg", alt: "Fresh fruits", category: "Fruits" },
  { id: 14, src: "https://res.cloudinary.com/dqywdfgik/image/upload/v1772291353/marketplace_2_c82drc.jpg", alt: "Marketplace", category: "Marketplace" },
  { id: 3, src: "https://res.cloudinary.com/dqywdfgik/image/upload/v1772295596/fruits_3_jqwlvt.jpg", alt: "Fresh fruits", category: "Fruits" },
  { id: 15, src: "https://res.cloudinary.com/dqywdfgik/image/upload/v1772291353/marketplace_3_hcwda9.jpg", alt: "Marketplace", category: "Marketplace" },
  { id: 4, src: "https://res.cloudinary.com/dqywdfgik/image/upload/v1772295593/fruits_4_f8hciw.jpg", alt: "Fresh fruits", category: "Fruits" },
  { id: 16, src: "https://res.cloudinary.com/dqywdfgik/image/upload/v1772291352/marketplace_4_st8xy0.jpg", alt: "Marketplace", category: "Marketplace" },
  { id: 5, src: "https://res.cloudinary.com/dqywdfgik/image/upload/v1772295592/fruits_5_aoffsm.jpg", alt: "Fresh fruits", category: "Fruits" },
  { id: 17, src: "https://res.cloudinary.com/dqywdfgik/image/upload/v1772291351/marketplace_5_psmewz.jpg", alt: "Marketplace", category: "Marketplace" },
  { id: 6, src: "https://res.cloudinary.com/dqywdfgik/image/upload/v1772295590/fruits_6_o16lmq.jpg", alt: "Fresh fruits", category: "Fruits" },
  { id: 18, src: "https://res.cloudinary.com/dqywdfgik/image/upload/v1772291349/marketplace_6_bc5rzq.jpg", alt: "Marketplace", category: "Marketplace" },
  { id: 7, src: "https://res.cloudinary.com/dqywdfgik/image/upload/v1772295587/fruits_7_qwxicf.jpg", alt: "Fresh fruits", category: "Fruits" },
  { id: 19, src: "https://res.cloudinary.com/dqywdfgik/image/upload/v1772291348/marketplace_14_rbem7o.jpg", alt: "Marketplace", category: "Marketplace" },
  { id: 8, src: "https://res.cloudinary.com/dqywdfgik/image/upload/v1772295584/fruits_8_vscljt.jpg", alt: "Fresh fruits", category: "Fruits" },
  { id: 20, src: "https://res.cloudinary.com/dqywdfgik/image/upload/v1772291348/marketplace_7_jv9zkv.jpg", alt: "Marketplace", category: "Marketplace" },
  { id: 9, src: "https://res.cloudinary.com/dqywdfgik/image/upload/v1772295583/fruits_9_ekgjfr.jpg", alt: "Fresh fruits", category: "Fruits" },
  { id: 21, src: "https://res.cloudinary.com/dqywdfgik/image/upload/v1772291348/marketplace_8_yj3r8m.jpg", alt: "Marketplace", category: "Marketplace" },
  { id: 10, src: "https://res.cloudinary.com/dqywdfgik/image/upload/v1772295577/fruits_11_ypynea.jpg", alt: "Fresh fruits", category: "Fruits" },
  { id: 22, src: "https://res.cloudinary.com/dqywdfgik/image/upload/v1772291348/marketplace_13_r9tebq.jpg", alt: "Marketplace", category: "Marketplace" },
  { id: 11, src: "https://res.cloudinary.com/dqywdfgik/image/upload/v1772295577/fruits_12_kjgbuy.jpg", alt: "Fresh fruits", category: "Fruits" },
  { id: 23, src: "https://res.cloudinary.com/dqywdfgik/image/upload/v1772291347/marketplace_10_hdd1x5.jpg", alt: "Marketplace", category: "Marketplace" },
  { id: 12, src: "https://res.cloudinary.com/dqywdfgik/image/upload/v1772295576/fruits_13_zfjqdn.jpg", alt: "Fresh fruits", category: "Fruits" },
  { id: 24, src: "https://res.cloudinary.com/dqywdfgik/image/upload/v1772291347/marketplace_9_tjxhxf.jpg", alt: "Marketplace", category: "Marketplace" },
  { id: 25, src: "https://res.cloudinary.com/dqywdfgik/image/upload/v1772291347/marketplace_15_wmknau.jpg", alt: "Marketplace", category: "Marketplace" },
  { id: 26, src: "https://res.cloudinary.com/dqywdfgik/image/upload/v1772291347/marketplace_11_lrrvc4.jpg", alt: "Marketplace", category: "Marketplace" },
  { id: 27, src: "https://res.cloudinary.com/dqywdfgik/image/upload/v1772291347/marketplace_12_yoerlz.jpg", alt: "Marketplace", category: "Marketplace" },
];

export const FOOTER_CONTENT = {
  description: "Serving the fruit trade community of Ahmedabad with dedication and integrity since 1961.",
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
