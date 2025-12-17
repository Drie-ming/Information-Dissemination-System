import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function BarOffHomePage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [currentAnnouncementData, setCurrentAnnouncementData] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    what: "",
    when: "",
    where: "",
    details: "",
  });

  const apiURL = "http://localhost/InfoDIsSys/backend/index.php?action=";

  const handleAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleAddClose = () => {
    setIsAddModalOpen(false);
  };

  const handleEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleEditClose = () => {
    setIsEditModalOpen(false);
  };

  const handleDeleteModal = () => {
    setIsDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setIsDeleteOpen(false);
  };

  //delete functionality naman

  const handleAddSumbitChange = (event) => {
    const input = event.target.name;
    const value = event.target.value;
    setFormData((values) => ({ ...values, [input]: value }));
  };

  const handelAddSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${apiURL}createAnnouncement`,
        formData
      );
      console.log("Raw response: ", response);
      setIsSaving(true);
      if (response.data.status === "success") {
        //style on pop up toast not working
        toast("Announcement Created Successfully", {
          className:
            "bg-green-500 text-white text-center font-bold rounded-md p-4",
        });
        setFormData({ what: "", when: "", where: "", details: "" });
        handleAddClose();
        setIsSaving(false);
        getEvents();
        console.log(response.data.message);
      } else if (response.data.status === "error") {
        toast("Announcement Created Unsuccessfully");
        console.log(response.data.message);
        setIsSaving(false);
      }
    } catch (error) {
      console.log(error);
      console.log(response.data.status);
    }
  };

  // dalehon mo naman su edit buda delete functionality!!!!!!!!!!!!

  const handleEditSumbitChange = (event) => {
    const { name, value } = event.target;
    setCurrentAnnouncementData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handelEditSubmit = async (event) => {
    event.preventDefault();
    console.log("updated announcements: ", currentAnnouncementData);
    try {
      const response = await axios.put(
        `${apiURL}editAnnouncement`,
        currentAnnouncementData
      );

      console.log(response);
      if (response.data.status === "success") {
        //style on pop up toast not working
        toast("Announcement Updated Successfully", {
          className:
            "bg-green-500 text-white text-center font-bold rounded-md p-4",
        });
        handleEditClose();
        setIsSaving(false);
        getEvents();
        console.log(response.data.message);
      } else if (response.data.status === "error") {
        toast("Announcement Updated Unsuccessfully");
        console.log(response.data.message);
        setIsSaving(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {

    try {
      const response = await axios.delete(`${apiURL}deleteAnnouncements`, {
        data: { id },
      });

      if (response.data.status === "success") {
        //style on pop up toast not working
        toast("Announcement Deleted Successfully", {
          toastClassName:
            "bg-green-500 text-white text-center font-bold rounded-md p-4",
        });
        handleDeleteClose();
        getEvents();
        console.log(response.data.message);
      } else if (response.data.status === "error") {
        toast("Announcement Delete Unsuccessfully");
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getEvents = async () => {
    try {
      const response = await axios.get(`${apiURL}getAnnouncements`);

      setAnnouncements(response.data.announcements);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = announcements.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(announcements.length / rowsPerPage);

  return (
    <div className="flex flex-col items-center justify-center min-h-dvh bg-[#99CDA9] relative p-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="overflow-x-auto rounded-lg shadow ring-1 ring-gray-300 mt-10">
          <div className=" flex flex-row justify-between text-left font-semibold p-4 text-gray-600 bg-[#F1FDF3] border-b">
            Community Announcements
            <button
              onClick={handleAddModal}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm "
            >
              + Add Announcement
            </button>
          </div>
          <table className="min-w-full divide-y divide-gray-500 bg-[#F1FDF3]">
            <thead className="">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  What
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  When
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Where
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Details
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentRows.map((events) => (
                <tr key={events.id} className="odd:bg-[#F1FDF3]">
                  <td className="px-4 py-3 align-top text-sm text-gray-800">
                    {events.what}
                  </td>
                  <td className="px-4 py-3 align-top text-sm text-gray-800">
                    {events.when}
                  </td>
                  <td className="px-4 py-3 align-top text-sm text-gray-800">
                    {events.where}
                  </td>
                  <td className="px-4 py-3 align-top text-sm text-gray-800">
                    {events.details}
                  </td>
                  <td className="px-4 py-3 align-top whitespace-nowrap">
                    <button
                      onClick={() => {
                        setCurrentAnnouncementData(events), handleEditModal();
                      }}
                      className="inline-block bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setCurrentAnnouncementData(events);
                        handleDeleteModal();
                      }}
                      className="inline-block bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center p-4 bg-[#F1FDF3]">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded disabled:opacity-50"
            >
              Prev
            </button>

            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>


      {/* add modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-md z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h3 className="text-lg font-semibold mb-4">Add Announcement</h3>
            <form onSubmit={handelAddSubmit} className="space-y-4 ">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  What
                </label>
                <input
                  type="text"
                  name="what"
                  value={formData.what}
                  onChange={handleAddSumbitChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  When
                </label>
                <input
                  type="text"
                  name="when"
                  value={formData.when}
                  onChange={handleAddSumbitChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Where
                </label>
                <input
                  type="text"
                  name="where"
                  value={formData.where}
                  onChange={handleAddSumbitChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Details
                </label>
                <textarea
                  name="details"
                  value={formData.details}
                  onChange={handleAddSumbitChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-green-500 focus:border-green-500"
                  rows="3"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={handleAddClose}
                  className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className={`px-4 py-2 rounded-md text-white ${
                    isSaving
                      ? "bg-green-300 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {isSaving ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}



      {/* Edit Modal */}
      {isEditModalOpen && currentAnnouncementData && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-md z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h3 className="text-lg font-semibold mb-4">Edit Announcement</h3>
            <form onSubmit={handelEditSubmit} className="space-y-4 ">
              <div>
                <input
                  type="number"
                  name="id"
                  value={currentAnnouncementData.id}
                  onChange={handleEditSumbitChange}
                  hidden
                />
                <label className="block text-sm font-medium text-gray-700">
                  What
                </label>
                <input
                  type="text"
                  name="what"
                  value={currentAnnouncementData.what}
                  onChange={handleEditSumbitChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  When
                </label>
                <input
                  type="text"
                  name="when"
                  value={currentAnnouncementData.when}
                  onChange={handleEditSumbitChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Where
                </label>
                <input
                  type="text"
                  name="where"
                  value={currentAnnouncementData.where}
                  onChange={handleEditSumbitChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Details
                </label>
                <textarea
                  name="details"
                  value={currentAnnouncementData.details}
                  onChange={handleEditSumbitChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-green-500 focus:border-green-500"
                  rows="3"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={handleEditClose}
                  className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className={`px-4 py-2 rounded-md text-white ${
                    isSaving
                      ? "bg-green-300 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {isSaving ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}



      {/* Delete Modal */}
      {isDeleteOpen && currentAnnouncementData && (
        <div class="fixed inset-0 backdrop-blur-md bg-opacity-50  flex items-center justify-center z-50">

        <div class="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
          <h2 class="text-lg font-semibold text-gray-800 mb-2">
            Are you absolutely sure?
          </h2>
          <p class="text-sm text-gray-600 mb-6">
            This action cannot be undone. This will permanently delete the
            announcement and remove it from our servers.
          </p>
          <div class="flex justify-end space-x-3">
            <button
            onClick={() => setIsDeleteOpen(false)}
             class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
              Cancel
            </button>
            <button 
            onClick={() => handleDelete(currentAnnouncementData.id)}
             class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
              Continue
            </button>
          </div>
        </div>
      </div>
      )}


    </div>
  );
}
