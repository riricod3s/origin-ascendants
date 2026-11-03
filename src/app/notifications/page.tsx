import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { CommunityError } from "@/components/community/CommunityError";
import { CommunitySetupNotice } from "@/components/community/CommunitySetupNotice";
import { NotificationList } from "@/components/community/NotificationList";
import { PageHero } from "@/components/ui/PageHero";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Notifications", robots: { index: false, follow: false } };

export default async function NotificationsPage() {
  const supabase = await createClient();
  if (!supabase) return <><PageHero title="Notifications" /><section className="container-x py-12"><CommunitySetupNotice /></section></>;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/notifications");
  const { data: notifications, error } = await supabase.from("notifications").select("id,kind,title,body,href,read_at,created_at").order("created_at", { ascending: false }).limit(50);
  if (error) return <><PageHero title="Notifications" /><section className="container-x py-12"><CommunityError message={error.message} /></section></>;
  return <><PageHero title="Your notifications" eyebrow="Stay in the loop" icon="bell" description="Mentions, replies and updates connected to your community activity." /><section className="container-x py-12"><div className="mx-auto max-w-3xl"><NotificationList notifications={notifications ?? []} /></div></section></>;
}
