import type { Metadata } from "next";
import { AuthPanel } from "@/components/community/AuthPanel";

export const metadata: Metadata = { title: "Create account", robots: { index: false, follow: false } };

export default function RegisterPage() {
  return <AuthPanel mode="register" />;
}
