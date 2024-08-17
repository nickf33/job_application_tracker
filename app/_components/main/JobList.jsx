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
    if (initialJobs.length > 0) {
      fetchJobsWithNotes();
    }
  }, []);

  const fetchJobsWithNotes = async () => {
    try {
      const jobsWithNotes = await Promise.all(
        jobs.map(async (job) => {
          const { notes } = await getNotes(job.id);
          return { ...job, notes: notes || [] };
        })
      );
      setJobs(jobsWithNotes);
    } catch (err) {
      console.error("Error fetching notes:", err);
      setError("Failed to fetch notes for jobs.");
    }
  };

  const handleJobAdded = (newJob) => {
    setJobs((prevJobs) => [newJob, ...prevJobs]);
  };

  const handleJobDeleted = (deletedJobId) => {
    setJobs(jobs.filter((job) => job.id !== deletedJobId));
  };

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="mt-6">
      {jobs.map((job) => (
        <div key={job.id} className="mb-4 p-4 bg-gray-800 rounded-lg shadow">
          <h2 className="text-xl text-white mb-2">
            {job.company_name} - {job.position_title}
          </h2>
          <p className="text-gray-400 mb-2">Status: {job.status}</p>
          <p className="text-gray-400 mb-2">
            Applied on: {new Date(job.application_date).toLocaleDateString()}
          </p>
          {job.application_url && (
            <a
              href={job.application_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 mb-8 hover:text-blue-300 block"
            >
              Application Link
            </a>
          )}
          <div className="flex space-x-2 mt-2 gap-8">
            <DeleteJob jobId={job.id} onJobDeleted={handleJobDeleted} />
            <EditJob job={job} onJobUpdated={fetchJobsWithNotes} />
          </div>
        </div>
      ))}
    </div>
  );
}
