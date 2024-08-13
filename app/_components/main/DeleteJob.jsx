"use client";

import React, { useState } from "react";
import { deleteJob } from "../../server-actions/deleteJob";

export default function DeleteJob({ jobId, onJobDeleted }) {
  const [isConfirming, setIsConfirming] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    setIsDeleting(true);
    setError(null);
    try {
      const result = await deleteJob({ id: jobId });
      if (result.error) {
        throw new Error(result.error);
      }
      if (typeof onJobDeleted === "function") {
        onJobDeleted(jobId);
      }
      setIsConfirming(false);
    } catch (error) {
      console.error("Error deleting job:", error);
      setError("Failed to delete job. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (isConfirming) {
    return (
      <div>
        <p className="text-white mb-2">
          Are you sure you want to delete this job application?
        </p>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          {isDeleting ? "Deleting..." : "Confirm Delete"}
        </button>
        <button
          onClick={() => setIsConfirming(false)}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setIsConfirming(true)}
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
    >
      Delete
    </button>
  );
}
