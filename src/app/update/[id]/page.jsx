"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function UpdatePage() {
  const { id } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  // 🔹 Load data from public/data.json
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/data.json");
        const data = await res.json();

        // ধরলাম data array আকারে আছে
        const item = data.find((item) => item.id === id);

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

  // 🔹 input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 update (frontend-only simulation)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/data.json");
      const data = await res.json();

      const updatedData = data.map((item) =>
        item.id === id ? { ...item, ...formData } : item,
      );

      console.log("Updated Data (frontend only):", updatedData);

      alert("Updated successfully (only frontend demo)!");

      router.push("/");
    } catch (error) {
      console.log(error);
      alert("Update failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 shadow-lg rounded-lg bg-white">
      <h1 className="text-2xl font-bold mb-4">Update Page</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full p-2 border rounded"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
}
