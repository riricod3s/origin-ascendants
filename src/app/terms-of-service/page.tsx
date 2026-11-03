import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { termsOfService } from "@/data/terms";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms for using Origin Ascendants website, Discord and game server.",
};

export default function TermsOfServicePage() {
  return <LegalPage document={termsOfService} breadcrumb="Terms of Service" />;
}
