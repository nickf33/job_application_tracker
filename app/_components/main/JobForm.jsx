"use client";

import React from "react";
import Input from "../ui/Input";

export default function JobForm({ initialData, onSubmit }) {
  const [formData, setFormData] = React.useState(initialData);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const statusOptions = [
    { value: "Applied", label: "Applied" },
    { value: "Interview Scheduled", label: "Interview Scheduled" },
    { value: "Rejected", label: "Rejected" },
    { value: "Offer Received", label: "Offer Received" },
  ];

  return (
    <form onSubmit={handleSubmit} className="mt-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Company Name"
          name="company_name"
          value={formData.company_name}
          onChange={handleChange}
          required
        />
        <Input
          label="Position Title"
          name="position_title"
          value={formData.position_title}
          onChange={handleChange}
          required
        />
        <Input
          label="Application Date"
          name="application_date"
          type="date"
          value={formData.application_date}
          onChange={handleChange}
          required
        />
        <Input
          label="Status"
          name="status"
          type="select"
          value={formData.status}
          onChange={handleChange}
          options={statusOptions}
        />
        <div className="md:col-span-2">
          <Input
            label="Application URL"
            name="application_url"
            type="url"
            value={formData.application_url}
            onChange={handleChange}
          />
        </div>
        <div className="md:col-span-2">
          <Input
            label="Job Description"
            name="job_description"
            type="textarea"
            value={formData.job_description}
            onChange={handleChange}
          />
        </div>
        <div className="md:col-span-2">
          <Input
            label="Notes"
            name="notes"
            type="textarea"
            value={formData.notes}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="mt-4">
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {initialData.id ? "Update Job Application" : "Add Job Application"}
        </button>
      </div>
    </form>
  );
}
