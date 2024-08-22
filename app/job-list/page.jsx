import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import JobList from "../_components/main/JobList";
import AddJob from "../_components/main/AddJob";

export default async function JobListPage() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user;

  let jobs = [];
  let error = null;

  if (user) {
    const { data, error: fetchError } = await supabase
      .from("job_applications")
      .select("*")
      .eq("user_id", user.id)
      .order("application_date", { ascending: false });

    if (fetchError) {
      console.error("Error fetching job applications:", fetchError.message);
      error = fetchError.message;
    } else {
      jobs = data;
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300">
      <div className="container mx-auto p-6 sm:p-12">
        <div className="flex justify-between items-start">
          <h1 className="text-5xl md:text-3xl font-extrabold text-white mb-6">
            My Job Applications
          </h1>
          <form action="/auth/signout" method="post">
            <button
              type="submit"
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Sign out
            </button>
          </form>
        </div>

        <AddJob />

        <JobList initialJobs={jobs} error={error} />
      </div>
    </div>
  );
}
