import type { LegalDocument } from "@/types/content";

export const termsOfService: LegalDocument = {
  title: "Terms of Service",
  lastUpdated: "2026-11-03",
  intro: [
    "These Terms apply to your use of the Origin Ascendants community website, including its accounts, forums, member profiles, private messages, announcements and community wiki (the \"Services\"). By using the Services, you agree to these Terms and the [Privacy Policy](/privacy-policy).",
    "Origin Ascendants is a community project. The Services are provided as available and may change as the community grows. If you do not agree to these Terms, do not create an account or submit content.",
  ],
  sections: [
    {
      id: "acceptance-of-terms",
      title: "Acceptance of Terms",
      content: [
        { type: "p", text: "You must meet the minimum age required by the laws where you live and by any third-party service you use to access the Services. If you are not legally able to agree to these Terms, a parent or guardian must review and accept them on your behalf where permitted by law." },
        { type: "p", text: "Discord and Minecraft are separate services with their own terms. Origin Ascendants is not affiliated with Mojang Studios, Microsoft or Discord." },
      ],
    },
    {
      id: "accounts-and-security",
      title: "Accounts and Security",
      content: [
        { type: "list", items: [
          "Provide an email address you control and complete email verification when required. You may also sign in through Discord OAuth; Discord handles its own authentication credentials.",
          "Keep your password, verification links, recovery links and session devices secure. You are responsible for activity performed through your account unless applicable law says otherwise.",
          "Use a username and profile content that do not impersonate others, expose another person's private information or violate these Terms.",
          "Tell the team promptly if you suspect account compromise. Never share your password or authentication codes with staff or other members.",
        ] },
        { type: "p", text: "You can update profile information in your account settings. To request account closure or deletion, contact the team using the address on the [Privacy Policy](/privacy-policy) page." },
      ],
    },
    {
      id: "community-standards",
      title: "Community Standards",
      content: [
        { type: "p", text: "Treat other members and staff with respect in profiles, forums, private messages, wiki discussions and uploaded content. You must not:" },
        { type: "list", items: [
          "Harass, threaten, stalk, discriminate against, or encourage harm toward another person.",
          "Publish personal or confidential information about another person without permission.",
          "Spam, scam, phish, impersonate another person, manipulate reputation or badges, or evade rate limits and moderation.",
          "Upload illegal, abusive, sexually explicit or malicious content, or content that infringes another person's rights.",
          "Attempt to access another account, bypass access controls, interfere with the website or misuse private messages or reports.",
        ] },
      ],
    },
    {
      id: "user-content-and-wiki",
      title: "User Content and Community Wiki",
      content: [
        { type: "p", text: "You keep ownership of content you create, subject to rights held by other people. By submitting content, you grant Origin Ascendants a non-exclusive, worldwide, royalty-free permission to host, store, display, reproduce and format that content as needed to operate, secure, back up and promote the community Services." },
        { type: "p", text: "Published forum posts and wiki contributions may be visible to the public and attributed to your profile. Wiki revisions preserve contribution history and may remain available after an edit or account closure to keep the article history understandable. Do not post material you do not have the right to share." },
        { type: "p", text: "You are responsible for your submissions. We may remove, hide, restore, edit for safety or restrict access to content that violates these Terms, creates risk, or is subject to a valid rights complaint. Reports may be reviewed by moderators." },
      ],
    },
    {
      id: "moderation-and-roles",
      title: "Moderation and Account Actions",
      content: [
        { type: "p", text: "Community roles, reputation and badges are granted or changed under the site's role and moderation rules; they are not property, payment or a guarantee of special treatment. Moderator and administrator access is for community operation and safety." },
        { type: "p", text: "We may warn members, remove or hide content, lock discussions, restrict features, suspend accounts or permanently revoke access for violations, abuse or threats to the Services. Where practical, moderation decisions are recorded and may be appealed by contacting the team." },
      ],
    },
    {
      id: "donations-and-support",
      title: "Donations and Support",
      content: [
        { type: "list", items: [
          "Support contributions, if offered, are voluntary and help fund community hosting, development and events.",
          "A contribution is not an investment, purchase of ownership, or promise of permanent service availability.",
          "Any supporter benefits and terms will be described separately before payment. Benefits may change, and no benefit grants immunity from community moderation.",
          "Payment providers handle payment details under their own privacy policies. Do not send card or bank details to community staff.",
        ] },
        { type: "p", text: "Origin Ascendants is not pay-to-win. This community site does not currently offer in-game competitive advantages for support." },
      ],
    },
    {
      id: "service-availability-and-ip",
      title: "Service Availability and Intellectual Property",
      content: [
        { type: "p", text: "We work to keep the Services available, but we do not promise uninterrupted operation, permanent retention of content, or error-free service. Features may be changed, paused or discontinued for maintenance, security, provider changes or community needs." },
        { type: "p", text: "The Origin Ascendants name, logo, original site design and materials created by the community team remain with their respective owners. Minecraft and related names and assets are trademarks or property of Mojang Studios and Microsoft; this community project is unofficial and not endorsed by them." },
      ],
    },
    {
      id: "changes-and-contact",
      title: "Changes and Contact Information",
      content: [
        { type: "p", text: "We may revise these Terms as the Services change or to meet legal requirements. The revision date appears above; important changes will be announced on the website or community Discord where practical. Continued use after changes take effect means you accept the revised Terms." },
        { type: "list", items: [
          "**General questions:** contact@originascendants.net",
          "**Privacy requests:** privacy@originascendants.net",
          "**Community support:** use the official Origin Ascendants Discord invite linked from this website.",
        ] },
      ],
    },
  ],
};
