"use client";

import React, { useState } from "react";
import DeleteJob from "./DeleteJob";
import EditJob from "./EditJob";
import AddJobModal from "./AddJobModal";

export default function JobList({ initialJobs }) {
  const [jobs, setJobs] = useState(initialJobs);

  const handleJobDeleted = (deletedJobId) => {
    setJobs(jobs.filter((job) => job.id !== deletedJobId));
  };

  const handleJobAdded = (newJob) => {
    setJobs((prevJobs) => [...prevJobs, newJob]);
  };

  const handleJobUpdated = (updatedJob) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) => (job.id === updatedJob.id ? updatedJob : job))
    );
  };

  return (
    <div>
      <AddJobModal onJobAdded={handleJobAdded} />
      {jobs.map((job) => (
        <div key={job.id} className="mb-4 p-4 bg-gray-800 rounded-lg shadow">
          <h2 className="text-xl text-white mb-2">
            {job.company_name} - {job.position_title}
          </h2>
          <p className="text-gray-400 mb-2">Status: {job.status}</p>
          <p className="text-gray-400 mb-2">
            Applied on: {new Date(job.application_date).toLocaleDateString()}
          </p>
          <div className="flex space-x-2 mt-2">
            <DeleteJob jobId={job.id} onJobDeleted={handleJobDeleted} />
            <EditJob job={job} onJobUpdated={handleJobUpdated} />
          </div>
        </div>
      ))}
    </div>
  );
}
