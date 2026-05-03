"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function UpdatePage() {
  const { id } = useParams(); // URL থেকে ID নিচ্ছে
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/data.json");
        const data = await res.json();

        // item.id এবং URL id ম্যাচ করানো হচ্ছে
        const item = data.find((item) => String(item.id) === String(id));

        if (item) {
          setFormData({
            title: item.title || "",
            description: item.description || "",
          });
        }
      } catch (error) {
        console.log("Error loading data:", error);
      }
    };

    if (id) fetchData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // এটি একটি ডেমো আপডেট লজিক
      console.log("Saving data for ID:", id, formData);
      alert("Updated successfully (Demo)");
      router.push("/profile"); // আপডেটের পর প্রোফাইলে ফিরে যাবে
    } catch (error) {
      alert("Update failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 shadow-lg rounded-lg bg-white">
      <h1 className="text-2xl font-bold mb-4">Update Information (ID: {id})</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter title"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded h-32"
            placeholder="Enter description"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Updating..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
