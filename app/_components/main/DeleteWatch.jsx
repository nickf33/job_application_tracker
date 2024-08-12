"use client";

import React, { useState, useEffect } from "react";
import { deleteWatch } from "../../server-actions/deleteWatch";

export default function DeleteWatch({ watchId }) {
  const [isConfirming, setIsConfirming] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    let timeoutId;
    if (successMessage) {
      timeoutId = setTimeout(() => {
        setSuccessMessage("");
      }, 3000); // Clear message after 3 seconds
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [successMessage]);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteWatch({ id: watchId });
      if (result.error) {
        throw new Error(result.error);
      }
      setSuccessMessage("Watch deleted successfully!");
      setIsConfirming(false);
    } catch (error) {
      console.error("Error deleting watch:", error);
      // You might want to show an error message here
    } finally {
      setIsDeleting(false);
    }
  };

  if (successMessage) {
    return (
      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
        <span className="block sm:inline">{successMessage}</span>
      </div>
    );
  }

  if (isConfirming) {
    return (
      <div>
        <p className="text-white mb-2">
          Are you sure you want to delete this watch?
        </p>
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
