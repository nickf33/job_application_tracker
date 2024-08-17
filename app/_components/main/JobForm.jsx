"use client";

import React, { useState, useEffect } from "react";
import { addJob, updateJob } from "../../server-actions/jobActions";
import {
  addNote,
  getNotes,
  deleteNote,
  updateNote,
} from "../../server-actions/noteActions";
import { FaChevronDown } from "react-icons/fa";

export default function JobForm({ initialData, onJobAdded, onJobUpdated }) {
  // State for form data, initialized with initialData or default values
  const [formData, setFormData] = useState(
    initialData || {
      company_name: "",
      position_title: "",
      job_description: "",
      application_url: "",
      application_date: "",
      status: "Shortlisted",
    }
  );

  // State for notes, new note input, editing note, and error handling
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [error, setError] = useState(null);

  // Fetch notes when component mounts or initialData changes
  useEffect(() => {
    if (initialData && initialData.id) {
      fetchNotes(initialData.id);
    }
  }, [initialData]);

  // Function to fetch notes for a job
  const fetchNotes = async (jobId) => {
    const result = await getNotes(jobId);
    if (!result.error) {
      setNotes(result.notes || []);
    }
  };

  // Handle changes in form inputs
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handle form submission (add or update job)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const action = formData.id ? updateJob : addJob;
      const result = await action(formData);

      if (result.error) {
        throw new Error(result.error);
      }

      // Call appropriate callback based on whether it's an add or update operation
      if (formData.id) {
        if (typeof onJobUpdated === "function") {
          onJobUpdated(result.job);
        }
      } else {
        if (typeof onJobAdded === "function") {
          onJobAdded(result.job);
        }
      }
    } catch (error) {
      console.error("Error submitting job:", error);
      setError(
        error.message ||
          "An error occurred while submitting the job application."
      );
    }
  };

  // Handle adding a new note
  const handleAddNote = async () => {
    if (newNote.trim() && formData.id) {
      const result = await addNote(formData.id, newNote);
      if (!result.error) {
        setNotes([result.note, ...notes]);
        setNewNote("");
      } else {
        setError(result.error);
      }
    }
  };

  // Handle updating an existing note
  const handleUpdateNote = async () => {
    if (newNote.trim() && editingNoteId) {
      const result = await updateNote(editingNoteId, newNote);
      if (!result.error) {
        setNotes(
          notes.map((note) =>
            note.id === editingNoteId ? { ...note, content: newNote } : note
          )
        );
        setNewNote("");
        setEditingNoteId(null);
      } else {
        setError(result.error);
      }
    }
  };

  // Handle deleting a note
  const handleDeleteNote = async (noteId) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      const result = await deleteNote(noteId);
      if (!result.error) {
        setNotes(notes.filter((note) => note.id !== noteId));
      } else {
        setError(result.error);
      }
    }
  };

  // Get CSS class for status color coding
  const getStatusClass = (status) => {
    switch (status) {
      case "Shortlisted":
        return "text-white";
      case "Applied":
        return "text-blue-400";
      case "Interview Scheduled":
        return "text-yellow-400";
      case "Rejected":
        return "text-red-400";
      case "Offer Received":
        return "text-green-400";
      default:
        return "text-white";
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2">
      {/* Error display */}
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      {/* Job application form fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
        {/* Company Name input */}
        <div className="mb-4">
          <label htmlFor="company_name" className="block text-white mb-2">
            Company Name
          </label>
          <input
            type="text"
            id="company_name"
            name="company_name"
            value={formData.company_name}
            onChange={handleChange}
            className="shadow appearance-none border border-gray-600 bg-gray-700 rounded w-full py-2 px-3 text-white"
            required
          />
        </div>

        {/* Position Title input */}
        <div className="mb-4">
          <label htmlFor="position_title" className="block text-white mb-2">
            Position Title
          </label>
          <input
            type="text"
            id="position_title"
            name="position_title"
            value={formData.position_title}
            onChange={handleChange}
            className="shadow appearance-none border border-gray-600 bg-gray-700 rounded w-full py-2 px-3 text-white"
            required
          />
        </div>

        {/* Application Date input */}
        <div className="mb-4">
          <label htmlFor="application_date" className="block text-white mb-2">
            Application Date
          </label>
          <input
            type="date"
            id="application_date"
            name="application_date"
            value={formData.application_date}
            onChange={handleChange}
            className="shadow appearance-none border border-gray-600 bg-gray-700 rounded w-full py-2 px-3 text-white"
            required
          />
        </div>

        {/* Status dropdown */}
        <div className="mb-4">
          <label htmlFor="status" className="block text-white mb-2">
            Status
          </label>
          <div className="relative">
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={`shadow appearance-none border border-gray-600 bg-gray-700 rounded w-full py-2 px-3 pr-8 ${getStatusClass(
                formData.status
              )}`}
            >
              <option value="Shortlisted" className="text-white">
                Shortlisted
              </option>
              <option value="Applied" className="text-blue-400">
                Applied
              </option>
              <option value="Interview Scheduled" className="text-yellow-400">
                Interview Scheduled
              </option>
              <option value="Rejected" className="text-red-400">
                Rejected
              </option>
              <option value="Offer Received" className="text-green-400">
                Offer Received
              </option>
            </select>
            <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Application URL input */}
      <div className="mb-4">
        <label htmlFor="application_url" className="block text-white mb-2">
          Application URL
        </label>
        <input
          type="url"
          id="application_url"
          name="application_url"
          value={formData.application_url}
          onChange={handleChange}
          className="shadow appearance-none border border-gray-600 bg-gray-700 rounded w-full py-2 px-3 text-white"
        />
      </div>

      {/* Job Description textarea */}
      <div className="mb-4">
        <label htmlFor="job_description" className="block text-white mb-2">
          Job Description
        </label>
        <textarea
          id="job_description"
          name="job_description"
          value={formData.job_description}
          onChange={handleChange}
          className="shadow appearance-none border border-gray-600 bg-gray-700 rounded w-full py-2 px-3 text-white"
          rows="3"
        ></textarea>
      </div>

      {/* Submit button */}
      <button
        type="submit"
        className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        {formData.id ? "Update Job Application" : "Add Job Application"}
      </button>

      {/* Notes section (only shown when editing an existing job) */}
      {formData.id && (
        <div className="mt-4">
          <h3 className="text-lg font-medium text-white mb-2">Notes</h3>
          <div className="mb-4">
            <textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500"
              placeholder={editingNoteId ? "Edit note..." : "Add a new note..."}
              rows="3"
            />
            <div className="mt-2 flex justify-between">
              <button
                type="button"
                onClick={editingNoteId ? handleUpdateNote : handleAddNote}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                {editingNoteId ? "Update Note" : "Add Note"}
              </button>
              {editingNoteId && (
                <button
                  type="button"
                  onClick={() => handleDeleteNote(editingNoteId)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                >
                  Delete Note
                </button>
              )}
            </div>
          </div>
          {/* Display existing notes */}
          <div className="space-y-2">
            {notes.map((note) => (
              <div key={note.id} className="bg-gray-700 p-2 rounded">
                <p className="text-white">{note.content}</p>
                <p className="text-sm text-gray-400">
                  {new Date(note.created_at).toLocaleString()}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setEditingNoteId(note.id);
                    setNewNote(note.content);
                  }}
                  className="mt-2 text-blue-400 hover:text-blue-300"
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </form>
  );
}
