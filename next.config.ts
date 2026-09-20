import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  /* /resume is the STABLE URL; the PDF filename is the thing that changes.
     Nav and Footer both link /resume, it is already out in the world on shared
     links, and next year's file only needs this one line updated rather than
     every link plus whatever has been pasted into an email.

     The descriptive filename is deliberate: the redirect target is what a
     recruiter's browser names the download, so it lands as
     "Marissa-Klymkiw_Resume_2026.pdf" rather than "resume.pdf" in a folder
     full of other people's resumes.

     permanent: false (307, not 308). A 308 is cached hard by browsers and
     would be painful to undo if /resume ever becomes a real page again.
     PRODUCT.md listed the resume hosting location as undecided; this is the
     decision. */
  async redirects() {
    return [
      {
        source: "/resume",
        destination: "/Marissa-Klymkiw_Resume_2026.pdf",
        permanent: false,
      },
    ];
  },
  images: {
    /* next/image defaults to quality 75 and re-encodes to WebP. That is fine for
       photographs and visibly WRONG for UI screenshots: 75 puts ringing around
       high-contrast text and banding in flat fills, which is exactly what a
       product screenshot is made of. 90 is allowed here so components that
       render app captures can opt into it; 75 stays the default for photos. */
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "covers.openlibrary.org",
        pathname: "/b/**",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
