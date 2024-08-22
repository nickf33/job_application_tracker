"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function deleteJob({ id }) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user;

  if (!user) {
    return { error: "User is not authenticated" };
  }

  const { error } = await supabase
    .from("job_applications")
    .delete()
    .match({ id, user_id: user.id });

  if (error) {
    console.error("Error deleting job:", error);
    return { error: "Failed to delete job application. Please try again." };
  }

  revalidatePath("/job-list");

  return { message: "Job application deleted successfully" };
}
