"use client";

import React, { useState } from "react";
import { addJob } from "../../server-actions/addJob";
import JobForm from "./JobForm";

const AddJob = ({ onJobAdded }) => {
  const [isModal, setIsModal] = useState(false);

  const handleModal = () => {
    setIsModal(!isModal);
  };

  const initialData = {
    company_name: "",
    position_title: "",
    job_description: "",
    application_url: "",
    application_date: new Date().toISOString().split("T")[0],
    status: "Applied",
    notes: "",
  };

  const handleSubmit = async (formData) => {
    try {
      const result = await addJob(formData);
      if (result.error) {
        throw new Error(result.error);
      }
      if (typeof onJobAdded === "function") {
        onJobAdded(formData);
      }
      handleModal(); // Close the modal
    } catch (error) {
      console.error("Error adding job:", error);
      // You might want to show an error message to the user here
    }
  };

  return (
    <>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleModal}
      >
        Track New Application
      </button>

      {isModal && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-screen w-full"
          id="my-modal"
        >
          <div className="relative top-8 mb-8 mx-auto p-5 border w-11/12 md:w-4/5 lg:w-3/4 max-w-[767px] shadow-lg rounded-md bg-gray-800">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-white">
                Add New Job Application
              </h3>
              <button
                onClick={handleModal}
                className="text-white hover:text-gray-300"
              >
                ✕
              </button>
            </div>
            <JobForm initialData={initialData} onSubmit={handleSubmit} />
          </div>
        </div>
      )}
    </>
  );
};

export default AddJob;
