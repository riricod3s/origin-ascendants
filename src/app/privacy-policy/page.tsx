import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { privacyPolicy } from "@/data/privacy";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Origin Ascendants collects, uses and protects information.",
};

export default function PrivacyPolicyPage() {
  return <LegalPage document={privacyPolicy} breadcrumb="Privacy Policy" />;
}
