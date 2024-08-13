"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function updateJob(formData) {
  const {
    id,
    company_name,
    position_title,
    job_description,
    application_url,
    application_date,
    status,
    notes,
  } = formData;

  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user;

  if (!user) {
    return { error: "User is not authenticated" };
  }

  const { data, error } = await supabase
    .from("job_applications")
    .update({
      company_name,
      position_title,
      job_description,
      application_url,
      application_date,
      status,
      notes,
    })
    .match({ id, user_id: user.id });

  if (error) {
    console.error("Error updating job:", error);
    return { error: "Failed to update job application. Please try again." };
  }

  revalidatePath("/job-list");

  return { message: "Job application updated successfully" };
}
