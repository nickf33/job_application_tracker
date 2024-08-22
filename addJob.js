"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function addJob(formData) {
  const {
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

  const { data, error } = await supabase.from("job_applications").insert([
    {
      company_name,
      position_title,
      job_description,
      application_url,
      application_date,
      status,
      notes,
      user_id: user.id,
    },
  ]);

  if (error) {
    console.error("Error inserting data", error);
    return { error: "Failed to add job application. Please try again." };
  }

  revalidatePath("/job-list");

  return { message: "Job application added successfully" };
}
