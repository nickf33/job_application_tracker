"use client";

import React, { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import DeleteJob from "./DeleteJob";
import EditJob from "./EditJob";
import { getNotes } from "../../server-actions/noteActions";

export default function JobList({ initialJobs, error: initialError }) {
  const [jobs, setJobs] = useState(initialJobs);
  const [error, setError] = useState(initialError);
  const supabase = createClientComponentClient();

  useEffect(() => {
    if (initialJobs && initialJobs.length > 0) {
      fetchJobsWithNotes();
    }
  }, [initialJobs]);

  const fetchJobsWithNotes = async () => {
    try {
      const jobsWithNotes = await Promise.all(
        jobs.map(async (job) => {
          try {
            const { notes } = await getNotes(job.id);
            return { ...job, notes: Array.isArray(notes) ? notes : [] };
          } catch (noteError) {
            console.error(`Error fetching notes for job ${job.id}:`, noteError);
            return { ...job, notes: [] };
          }
        })
      );
      setJobs(jobsWithNotes);
    } catch (err) {
      console.error("Error fetching notes:", err);
      setError("Failed to fetch notes for jobs.");
    }
  };

  const handleJobAdded = (newJob) => {
    setJobs((prevJobs) => [{ ...newJob, notes: [] }, ...prevJobs]);
  };

  const handleJobDeleted = (deletedJobId) => {
    setJobs(jobs.filter((job) => job.id !== deletedJobId));
  };

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="mt-6 space-y-6">
      {jobs &&
        jobs.map((job) => (
          <div
            key={job.id}
            className="bg-gray-800 rounded-lg shadow-lg overflow-hidden"
          >
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Column 1: Basic Info */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  {job.company_name}
                </h2>
                <h3 className="text-xl text-gray-300 mb-4">
                  {job.position_title}
                </h3>
                <p className="text-gray-400 mb-2">
                  <span className="font-semibold">Status:</span> {job.status}
                </p>
                <p className="text-gray-400 mb-2">
                  <span className="font-semibold">Applied on:</span>{" "}
                  {job.application_date
                    ? new Date(job.application_date).toLocaleDateString()
                    : "N/A"}
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
              </div>

              {/* Column 2: Job Description */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  Job Description
                </h4>
                <p className="text-gray-300 whitespace-pre-wrap">
                  {job.job_description || "No description available."}
                </p>
              </div>

              {/* Column 3: Notes with scroll */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Notes</h4>
                <div className="h-64 overflow-y-auto pr-2">
                  {job.notes &&
                  Array.isArray(job.notes) &&
                  job.notes.length > 0 ? (
                    job.notes.map((note) => (
                      <div
                        key={note.id}
                        className="bg-gray-700 p-3 rounded mb-2"
                      >
                        <p className="text-white">{note.content}</p>
                        <p className="text-sm text-gray-400 mt-1">
                          {note.created_at
                            ? new Date(note.created_at).toLocaleString()
                            : "N/A"}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400">No notes available.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="px-6 py-3 bg-gray-700 flex justify-end items-center space-x-2">
              <DeleteJob jobId={job.id} onJobDeleted={handleJobDeleted} />
              <EditJob job={job} onJobUpdated={fetchJobsWithNotes} />
            </div>
          </div>
        ))}
    </div>
  );
}
