import type { Metadata } from "next";
import { UsersRound } from "lucide-react";
import { CommunityError } from "@/components/community/CommunityError";
import { CommunitySetupNotice } from "@/components/community/CommunitySetupNotice";
import { MemberDirectory } from "@/components/community/MemberDirectory";
import { PageHero } from "@/components/ui/PageHero";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Community Members", description: "Meet the members of Origin Ascendants." };

export default async function MembersPage() {
  const supabase = await createClient();
  if (!supabase) return <><PageHero title="Community members" /><section className="container-x py-12"><CommunitySetupNotice /></section></>;
  const { data: members, error } = await supabase.from("profiles").select("id,username,display_name,bio,avatar_url,role,reputation,created_at").order("reputation", { ascending: false }).limit(90);
  if (error) return <><PageHero title="Community members" /><section className="container-x py-12"><CommunityError message={error.message} /></section></>;

  return (
    <>
      <PageHero title="Meet the members" eyebrow="The people make the place" icon="users" description="Find community members, discover their projects and get to know the people behind the conversations." scene="skycity">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-night/30 px-4 py-2 text-sm text-mist"><UsersRound className="size-4 text-aether" /> {members?.length ?? 0} members shown</span>
      </PageHero>
      <section className="container-x py-12"><MemberDirectory members={members ?? []} /></section>
    </>
  );
}
