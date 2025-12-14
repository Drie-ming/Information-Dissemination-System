import axios from "axios";
import React, { useState } from "react";
import { toast } from "sonner";

//example annoucenmentsss to be removed soon
const announcements = [
  {
    id: 1,
    what: "Libre Tuli (Free Circumcision Drive)",
    when: "December 20–22, 2025 • 8:00 AM–4:00 PM",
    where: "Barangay Hall, Libog, Bicol",
    details:
      "Licensed doctors and nurses will perform the procedure. Free medicines and wound care instructions will be provided.",
  },
  {
    id: 2,
    what: "Community Cleanup Drive",
    when: "December 28, 2025 • 7:00 AM",
    where: "Town Plaza",
    details: "Bring cleaning tools. Snacks and water will be provided.",
  },
];

export default function BarOffHomePage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    what: "",
    when: "",
    where: "",
    details: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const apiURL = "http://localhost/InfoDIsSys/backend/index.php?action=";

  const [data, setData] = useState(announcements);

  const handleAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleAddClose = () => {
    setIsAddModalOpen(false);
  };

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

  
  const handleEdit = (id) => {
    alert(`Edit announcement with ID: ${id}`);
   
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this announcement?")) {
      setData(data.filter((item) => item.id !== id));
      
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-dvh bg-green-200 relative p-10">
      <div>
        <strong>Hello Barangay officer</strong>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="overflow-x-auto rounded-lg shadow ring-1 ring-gray-300">
          <div className=" flex flex-row justify-between text-left font-semibold p-4 text-gray-600 bg-gray-50 border-b">
            Community Announcements
            <button
              onClick={handleAddModal}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm "
            >
              + Add Announcement
            </button>
          </div>
          <table className="min-w-full divide-y divide-gray-200 bg-white">
            <thead className="bg-gray-100">
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
              {data.map((item) => (
                <tr key={item.id} className="odd:bg-gray-50">
                  <td className="px-4 py-3 align-top text-sm text-gray-800">
                    {item.what}
                  </td>
                  <td className="px-4 py-3 align-top text-sm text-gray-800">
                    {item.when}
                  </td>
                  <td className="px-4 py-3 align-top text-sm text-gray-800">
                    {item.where}
                  </td>
                  <td className="px-4 py-3 align-top text-sm text-gray-800">
                    {item.details}
                  </td>
                  <td className="px-4 py-3 align-top whitespace-nowrap">
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="inline-block bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="inline-block bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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

      
    </div>
  );
}
