"use client";

import React, { useState } from "react";
import { deleteJob } from "../../server-actions/jobActions";

export default function DeleteJob({ jobId, onJobDeleted }) {
  const [isConfirming, setIsConfirming] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteJob({ id: jobId });
      if (result.error) {
        throw new Error(result.error);
      }
      onJobDeleted(jobId);
    } catch (error) {
      console.error("Error deleting job:", error);
    } finally {
      setIsDeleting(false);
      setIsConfirming(false);
    }
  };

  const buttonClass =
    "w-24 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded";

  if (isConfirming) {
    return (
      <div className="flex space-x-2 gap-8">
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className={`${buttonClass} ${
            isDeleting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isDeleting ? "Deleting..." : "Confirm"}
        </button>
        <button
          onClick={() => setIsConfirming(false)}
          className="w-24 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button onClick={() => setIsConfirming(true)} className={buttonClass}>
      Delete
    </button>
  );
}
