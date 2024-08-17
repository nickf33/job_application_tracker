"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

// Add Note

export async function addNote(jobApplicationId, content) {
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
    .from("job_application_notes")
    .insert({
      job_application_id: jobApplicationId,
      user_id: user.id,
      content,
    })
    .select();

  if (error) {
    console.error("Error adding note:", error);
    return { error: "Failed to add note. Please try again." };
  }

  revalidatePath("/job-list");
  return { message: "Note added successfully", note: data[0] };
}

// Get Notes

export async function getNotes(jobApplicationId) {
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
    .from("job_application_notes")
    .select("*")
    .eq("job_application_id", jobApplicationId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching notes:", error);
    return { error: "Failed to fetch notes. Please try again." };
  }

  return { notes: data };
}

// Delete Note
export async function deleteNote(noteId) {
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
    .from("job_application_notes")
    .delete()
    .match({ id: noteId, user_id: user.id });

  if (error) {
    console.error("Error deleting note:", error);
    return { error: "Failed to delete note. Please try again." };
  }

  revalidatePath("/job-list");
  return { message: "Note deleted successfully" };
}

// update note

export async function updateNote(noteId, content) {
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
    .from("job_application_notes")
    .update({ content })
    .match({ id: noteId, user_id: user.id })
    .select();

  if (error) {
    console.error("Error updating note:", error);
    return { error: "Failed to update note. Please try again." };
  }

  revalidatePath("/job-list");
  return { message: "Note updated successfully", note: data[0] };
}
