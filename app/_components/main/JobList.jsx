"use client";

import React, { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import DeleteJob from "./DeleteJob";
import EditJob from "./EditJob";
import AddJobModal from "./AddJobModal";
import { getNotes } from "../../server-actions/noteActions";

export default function JobList({ initialJobs }) {
  const [jobs, setJobs] = useState(initialJobs);
  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchJobsWithNotes();
  }, []);

  const fetchJobsWithNotes = async () => {
    const jobsWithNotes = await Promise.all(
      jobs.map(async (job) => {
        const { notes } = await getNotes(job.id);
        return { ...job, notes: notes || [] };
      })
    );
    setJobs(jobsWithNotes);
  };

  const handleJobAdded = (newJob) => {
    setJobs((prevJobs) => [...prevJobs, { ...newJob, notes: [] }]);
  };

  const handleJobDeleted = (deletedJobId) => {
    setJobs(jobs.filter((job) => job.id !== deletedJobId));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Shortlisted":
        return "bg-gray-200 text-gray-800";
      case "Applied":
        return "bg-blue-200 text-blue-800";
      case "Interview Scheduled":
        return "bg-yellow-200 text-yellow-800";
      case "Rejected":
        return "bg-red-200 text-red-800";
      case "Offer Received":
        return "bg-green-200 text-green-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <AddJobModal onJobAdded={handleJobAdded} />
      {jobs.map((job) => (
        <div
          key={job.id}
          className="p-6 bg-white shadow-lg rounded-lg grid grid-cols-3"
        >
          <div className="mt-6 flex justify-end space-x-3">
            <EditJob job={job} onJobUpdated={fetchJobsWithNotes} />
            <DeleteJob jobId={job.id} onJobDeleted={handleJobDeleted} />
          </div>
        </div>
      ))}
    </div>
  );
}
