/**
 * ==========================================================================
 * V Care Communication Pvt. Ltd. - Chatbot Knowledge Base & Configuration
 * ==========================================================================
 * EDITABLE BY USER: You can add or modify products, completed projects,
 * services, FAQs, or company contact information in this file easily.
 */

const root = typeof window !== 'undefined' ? window : (typeof global !== 'undefined' ? global : this);
root.VCareKnowledge = {
  company: {
    name: "V Care Communication Pvt. Ltd.",
    shortName: "V Care Groups",
    founded: "1997",
    founder: "CS Parthasarathy",
    founderEmail: "csp@vcaregroups.net",
    managingDirector: "CS Parthasarathy",
    experienceYears: "30+",
    teamSize: "30 dedicated IT professionals & 20+ expert field engineers",
    corporateOffice: "Old No 11A, New No 27, Mahalakshmi Street, T. Nagar, Chennai - 600017, Tamil Nadu, India",
    serviceCenters: ["T. Nagar, Chennai"],
    phones: ["+91 98410 98771", "+91 98410 18733", "044 24356354", "044 24322020"],
    email: "info@vcaregroups.net",
    website: "https://vcaregroups.net",
    vision: "To WIN and retain customers with service support by expressing excellence through experience.",
    mission: "Deliver unmatched quality services through excellence in execution and support."
  },

  /* ------------------------------------------------------------------------
     PRODUCTS CATALOGUE
     ------------------------------------------------------------------------ */
  products: [
    {
      id: "computer-peripherals",
      name: "Computer Peripherals & Hardware Components",
      category: "Peripherals & Components",
      description: "Complete range of peripherals, storage, power backup, assembled CPUs, refurbished systems, and multi-function printers.",
      features: [
        "Monitors, Keyboards, Mice & USB Pendrives",
        "UPS Power Backup: APC, Numeric & major brands",
        "Custom Assembled CPUs: Intel & AMD Processors, Motherboards, SSDs, Hard Disks, Graphics Cards",
        "Printers: Laser, Inktank, Copier, Barcode, Thermal & ID Card Printers",
        "Printer Brands: Canon, HP, Epson, Zebra, Citizen, Ricoh"
      ]
    },
    {
      id: "desktops-laptops",
      name: "Desktops, Laptops, Workstations & Servers",
      category: "Hardware Systems",
      description: "Commercial desktops, workstation PCs, enterprise servers, laptops, tablets, and certified refurbished systems for business productivity.",
      features: [
        "Top Brands: Lenovo, Acer, HP, Dell, Asus, Apple",
        "Commercial Laptops & Ultra-portable Tablets",
        "Custom Workstations & Enterprise Rack/Tower Servers",
        "Certified Refurbished Desktops & Laptops with warranty"
      ]
    },
    {
      id: "networking",
      name: "Networking & Security Software",
      category: "Networking & Cyber Security",
      description: "Enterprise networking gear, wireless infrastructure, next-gen firewalls, and workstation security software.",
      features: [
        "Managed & Unmanaged Switches, Routers & Access Points (AP)",
        "Hardware Firewalls & Secure Gateways",
        "Security Software: Quick Heal, Kaspersky, Seckonnect & Endpoint Protection"
      ]
    },
    {
      id: "cctv-surveillance",
      name: "CCTV & Physical Surveillance",
      category: "Surveillance & CCTV",
      description: "High-definition CCTV surveillance systems, IP cameras, NVR/DVR recorders, and license plate recognition technology.",
      features: [
        "Top CCTV Brands: Hikvision, CP Plus, Matrix, Accuvision",
        "Camera Types: Dome Cameras, Bullet Cameras, ANPR (Ampr) License Plate Readers",
        "Centralized Video Surveillance & Storage Integration"
      ]
    },
    {
      id: "software-licensing",
      name: "Software Applications & Enterprise Productivity",
      category: "Software & Cloud Solutions",
      description: "Essential business applications, CRM, LMS, corporate email, design software, and accounting platforms.",
      features: [
        "Business Apps: Custom CRM, LMS (Learning Management Systems), Website Building",
        "Cloud Suites: Google Workspace (G Suite), Microsoft 365, Zoho",
        "Engineering & Accounting: AutoCAD, Tally Solutions"
      ]
    },
    {
      id: "pa-av-solutions",
      name: "ViewSonic Interactive Flat Panels, PA Systems & Audio/Video Solutions",
      category: "AV & Interactive Touch Displays",
      description: "Authorized ViewSonic 4K Interactive Flat Panels, public address (PA) systems, and high-definition boardroom audio/video setups.",
      features: [
        "ViewSonic Interactive Flat Panels: ViewBoard 4K Ultra HD Touch Panels (55\", 65\", 75\", 86\", 98\")",
        "Interactive Touch Features: myViewBoard digital whiteboard software, multi-touch, wireless casting & dual OS (Android/Windows)",
        "Public Address (PA) Systems: Ahuja / Auvja commercial sound & paging solutions",
        "AV Solutions Brands: ViewSonic, PeopleLink, Raptor, Epson, BenQ, Logix",
        "Turnkey conference room projectors, 4K PTZ video conferencing cameras, and soundbars"
      ]
    },
    {
      id: "amc-asc-services",
      name: "AMC & ASC Service Contracts",
      category: "IT Maintenance Services",
      description: "Comprehensive and Non-Comprehensive Annual Maintenance Contracts (AMC) and Annual Service Contracts (ASC).",
      features: [
        "AMC / ASC coverage for Desktops, Laptops, Servers, & Printers",
        "Network maintenance, Firewall security management & CCTV upkeep",
        "Dedicated on-site engineers, preventive maintenance & fast SLA support"
      ]
    }
  ],

  /* ------------------------------------------------------------------------
     COMPLETED CUSTOMER PROJECTS / CASE STUDIES
     ------------------------------------------------------------------------ */
  projects: [
    {
      id: "proj-1",
      title: "Multi-Branch Network Infrastructure & Firewall Deployment",
      client: "Leading Financial Services Enterprise (Chennai & TN Branches)",
      category: "Networking & Security",
      scope: "End-to-end design, LAN/WAN cabling, managed switch setup, and Sophos Next-Gen Firewall deployment across 12 branch offices.",
      outcome: "99.99% network uptime, zero-trust perimeter security, and seamless encrypted site-to-site VPN communication."
    },
    {
      id: "proj-2",
      title: "Corporate Boardroom HD Video & PA System Integration",
      client: "Global Logistics & Freight Forwarding Company",
      category: "Video Conferencing & AV",
      scope: "Installation of ViewSonic & PeopleLink 4K PTZ tracking cameras, Ahuja PA sound system, dual 75-inch screens, and touch controller integration.",
      outcome: "Transformed executive decision-making with one-touch multi-party meetings for international teams."
    },
    {
      id: "proj-3",
      title: "200+ Workstation Hardware AMC & Datacenter Server Migration",
      client: "Multi-Specialty Healthcare & Diagnostics Group",
      category: "IT Support & Server Migration",
      scope: "Comprehensive Annual Maintenance Contract (AMC) for 200+ workstations, plus migration of physical databases to Dell PowerEdge enterprise servers.",
      outcome: "30% faster database query times, zero unexpected hardware downtime, and dedicated on-site technician response."
    },
    {
      id: "proj-4",
      title: "High-Availability Web & Enterprise Software Integration",
      client: "Textile & Garment Manufacturing Exporter",
      category: "Cloud & Web Services",
      scope: "Deployment of custom CRM/LMS web portal, Tally/Zoho enterprise setup, G Suite migration, and SSL domain hosting.",
      outcome: "100% spam-filtered corporate mail deliverability and sub-second page load times for international buyers."
    },
    {
      id: "proj-5",
      title: "Campus CCTV Surveillance & Biometric Security Infrastructure",
      client: "Private Educational Institute in Chennai",
      category: "Networking & Security",
      scope: "Deployment of 60+ Hikvision & CP Plus Dome/Bullet cameras, ANPR entrance tracking, 45+ enterprise Wi-Fi APs, and biometric access terminals.",
      outcome: "High-density wireless connectivity and complete campus surveillance with centralized NVR storage."
    },
    {
      id: "proj-6",
      title: "College Campus ERP, LMS & Admission CRM System",
      client: "Higher Education Institutions & Colleges in Tamil Nadu",
      category: "Education ERP, LMS & CRM Software",
      scope: "Turnkey development and implementation of College ERP, Learning Management System (LMS), and Admission CRM. Includes online admissions, fee collection with payment gateway, exam & hall ticket management, grading/marksheet generation, attendance, and student/faculty portals.",
      outcome: "Automated workflows for 10,000+ students, 80% faster administrative processing, and 100% paperless exam & fee management."
    }
  ],

  /* ------------------------------------------------------------------------
     SERVICES LIST
     ------------------------------------------------------------------------ */
  services: [
    {
      name: "IT Hardware AMC & ASC Maintenance",
      desc: "Annual Maintenance Contracts (AMC) and Annual Service Contracts (ASC) with resident technicians, standby component support, and SLAs for Desktops, Laptops, Servers, Printers, Networks & CCTV."
    },
    {
      name: "Web Design & Development & CRM/LMS Building",
      desc: "Custom modern responsive website design, CRM/LMS application building, e-commerce web applications, CMS setup, and portal maintenance."
    },
    {
      name: "Domain Registration & Web Hosting",
      desc: "Reliable domain name registration (.com, .in, .net), Linux/Windows cloud web hosting, SSL security, and 99.9% uptime."
    },
    {
      name: "Corporate E-Mail & Productivity Suite Hosting",
      desc: "Professional business email and cloud licensing: Google Workspace (G Suite), Microsoft 365, Zoho, Tally, and AutoCAD."
    },
    {
      name: "CCTV & AV Room Setup Services",
      desc: "Turnkey installation of Hikvision/CP Plus/Matrix CCTV surveillance, Ahuja PA systems, and ViewSonic/PeopleLink boardroom AV integrations."
    },
    {
      name: "Digital Marketing & Mobile Solutions",
      desc: "SEO optimization, social media marketing, Google Ads management, graphic design, and native mobile apps (iOS & Android)."
    }
  ],

  /* ------------------------------------------------------------------------
     FREQUENTLY ASKED QUESTIONS (FAQs)
     ------------------------------------------------------------------------ */
  faqs: [
    {
      q: "Who is the founder or owner of V Care Communication?",
      a: "V Care Communication Pvt. Ltd. was founded in 1997 by Mr. CS Parthasarathy (Founder & Managing Director). You can reach him directly at csp@vcaregroups.net."
    },
    {
      q: "Where is V Care located?",
      a: "Our Corporate Office is located at Old No 11A, New No 27, Mahalakshmi Street, T. Nagar, Chennai - 600017."
    },
    {
      q: "Do you offer Annual Maintenance Contracts (AMC / ASC)?",
      a: "Yes! We provide comprehensive and non-comprehensive AMCs & ASCs for desktops, laptops, servers, printers, CCTV systems, and network switches with guaranteed SLAs and dedicated technicians."
    },
    {
      q: "What products and brands do you supply?",
      a: "We supply Computer Peripherals, Assembled CPUs (Intel/AMD), Desktops & Laptops (Lenovo, Acer, HP, Dell, Asus), Printers (Canon, HP, Epson, Zebra, Citizen, Ricoh), Networking & Firewalls, CCTV (Hikvision, CP Plus, Matrix), Software (G Suite, Microsoft 365, Zoho, AutoCAD, Tally), PA Systems (Ahuja), and AV Solutions (ViewSonic, PeopleLink, BenQ, Epson)."
    },
    {
      q: "Do you provide College ERP, LMS, and Admission CRM solutions?",
      a: "Yes! V Care has successfully deployed comprehensive College ERP, Learning Management Systems (LMS), and Admission CRM for several higher education colleges and institutions. Our solution covers Online Student Admissions, Digital Fee Collection & Payment Gateways, Examination & Grading Management, Hall Ticket Generation, Attendance Tracking, Student/Faculty Portals, and Course Content Delivery."
    },
    {
      q: "Do you supply refurbished laptops and custom assembled desktops?",
      a: "Yes! We offer high-quality tested Refurbished Laptops and Desktops with warranty support, as well as Custom Assembled CPUs built to your exact hardware specifications."
    },
    {
      q: "How can I request a quote or project consultation?",
      a: "You can call us directly at +91 98410 98771 / +91 98410 18733, email info@vcaregroups.net, or use the quick contact form on our website."
    }
  ]
};
