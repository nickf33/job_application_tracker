"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

// Add Job

export async function addJob(formData) {
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
    .insert([
      {
        user_id: user.id,
        ...formData,
      },
    ])
    .select();

  if (error) {
    console.error("Error adding job:", error);
    return { error: "Failed to add job application. Please try again." };
  }

  revalidatePath("/job-list");
  return { message: "Success", job: data[0] };
}

// Update Job

export async function updateJob(formData) {
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
    .update(formData)
    .eq("id", formData.id)
    .eq("user_id", user.id)
    .select();

  if (error) {
    console.error("Error updating job:", error);
    return { error: "Failed to update job application. Please try again." };
  }

  revalidatePath("/job-list");
  return { message: "Success", job: data[0] };
}

// Delete Job

export async function deleteJob(jobId) {
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
    .match({ id: jobId, user_id: user.id });

  if (error) {
    console.error("Error deleting job:", error);
    return { error: "Failed to delete job application. Please try again." };
  }

  revalidatePath("/job-list");
  return { message: "Job application deleted successfully" };
}

// Get All Jobs

export async function getJobs() {
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
    .select("*")
    .eq("user_id", user.id)
    .order("application_date", { ascending: false });

  if (error) {
    console.error("Error fetching jobs:", error);
    return { error: "Failed to fetch job applications. Please try again." };
  }

  return { jobs: data };
}
