import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import EditJob from "../_components/main/EditJob";
import DeleteJob from "../_components/main/DeleteJob";
import AddJob from "../_components/main/AddJob";

export default async function JobList() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user;

  const { data: jobs, error } = await supabase
    .from("job_applications")
    .select("*")
    .eq("user_id", user.id)
    .order("application_date", { ascending: false });

  if (error) {
    console.error("Error fetching job applications:", error.message);
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300">
      <div className="container mx-auto p-6 sm:p-12">
        <div className="flex justify-between items-start">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
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

        <div className="mt-6">
          {jobs &&
            jobs.map((job) => (
              <div
                key={job.id}
                className="mb-4 p-4 bg-gray-800 rounded-lg shadow"
              >
                <h2 className="text-xl text-white mb-2">
                  {job.company_name} - {job.position_title}
                </h2>
                <p className="text-gray-400 mb-2">Status: {job.status}</p>
                <p className="text-gray-400 mb-2">
                  Applied on:{" "}
                  {new Date(job.application_date).toLocaleDateString()}
                </p>
                {job.application_url && (
                  <a
                    href={job.application_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 mb-2 block"
                  >
                    Application Link
                  </a>
                )}
                <div className="flex space-x-2 mt-2">
                  <DeleteJob jobId={job.id} />
                  <EditJob job={job} />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
