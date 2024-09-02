"use client";

import React, { useState } from "react";
import JobForm from "./JobForm";
import { IoIosCloseCircleOutline } from "react-icons/io";

const AddJob = ({ onJobAdded }) => {
  // State to control the visibility of the modal
  const [isModal, setIsModal] = useState(false);

  // Function to toggle the modal visibility
  const handleModal = () => {
    setIsModal(!isModal);
  };

  // Initial data for the job form
  const initialData = {
    company_name: "",
    position_title: "",
    job_description: "",
    application_url: "",
    application_date: new Date().toISOString().split("T")[0], // Set to current date
    status: "Shortlisted",
  };

  // Function to handle when a new job is added
  const handleJobAdded = async (newJob) => {
    if (typeof onJobAdded === "function") {
      await onJobAdded(newJob);
    }
    handleModal();
  };

  return (
    <>
      {/* Button to open the modal */}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleModal}
      >
        Track New Application
      </button>

      {/* Modal for adding a new job */}
      {isModal && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-screen w-full"
          id="my-modal"
        >
          <div className="relative top-8 mb-8 mx-auto p-5 border w-11/12 md:w-4/5 lg:w-3/4 max-w-[767px] shadow-lg rounded-md bg-gray-800">
            {/* Modal header */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-white">
                Add New Job Application
              </h3>
              <button
                onClick={handleModal}
                className="text-white hover:text-gray-300"
              >
                <IoIosCloseCircleOutline className="text-3xl" />
              </button>
            </div>
            {/* JobForm component */}
            <JobForm initialData={initialData} onJobAdded={handleJobAdded} />
          </div>
        </div>
      )}
    </>
  );
};

export default AddJob;
