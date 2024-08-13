"use client";

import React, { useState } from "react";
import { updateJob } from "../../server-actions/updateJob";
import JobForm from "./JobForm";

const EditJob = ({ job, onJobUpdated }) => {
  const [isModal, setIsModal] = useState(false);
  const [error, setError] = useState(null);

  const handleModal = () => {
    setIsModal(!isModal);
    setError(null);
  };

  const handleSubmit = async (formData) => {
    try {
      const result = await updateJob(formData);
      if (result.error) {
        throw new Error(result.error);
      }
      if (typeof onJobUpdated === "function") {
        onJobUpdated(formData);
      }
      handleModal(); // Close the modal
    } catch (error) {
      console.error("Error updating job:", error);
      setError(error.message || "An error occurred while updating the job.");
    }
  };

  return (
    <>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleModal}
      >
        Edit
      </button>

      {isModal && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-screen w-full"
          id="my-modal"
        >
          <div className="relative top-8 mb-8 mx-auto p-5 border w-11/12 md:w-4/5 lg:w-3/4 max-w-[767px] shadow-lg rounded-md bg-gray-800">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-white">
                Edit Job Application
              </h3>
              <button
                onClick={handleModal}
                className="text-white hover:text-gray-300"
              >
                ✕
              </button>
            </div>
            {error && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                role="alert"
              >
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            <JobForm initialData={job} onSubmit={handleSubmit} />
          </div>
        </div>
      )}
    </>
  );
};

export default EditJob;
