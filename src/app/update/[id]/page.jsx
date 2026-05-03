"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function UpdatePage() {
  const { id } = useParams(); // URL থেকে ID নিচ্ছে
  const router = useRouter();
  const { data: session } = authClient.useSession();

  // রিকোয়ারমেন্ট অনুযায়ী Name এবং Image এর জন্য স্টেট
  const [formData, setFormData] = useState({
    name: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);

  // পেজ লোড হলে ইউজারের বর্তমান ডাটা ইনপুট ফিল্ডে বসানো
  useEffect(() => {
    if (session?.user) {
      setFormData({
        name: session.user.name || "",
        image: session.user.image || "",
      });
    }
  }, [session]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // এখানে আপনার আপডেট লজিক থাকবে
      console.log("Updating data for ID:", id, formData);

      alert("Information updated successfully! (Demo)");
      router.push("/profile"); // আপডেট শেষে প্রোফাইল পেজে ফেরত যাবে
    } catch (error) {
      alert("Update failed!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] px-4">
      <div className="max-w-xl w-full p-8 shadow-2xl rounded-2xl bg-white border border-gray-100">
        <h1 className="text-2xl font-bold mb-2 text-gray-800">
          Update Information
        </h1>
        <p className="text-sm text-gray-500 mb-6 font-mono">(ID: {id})</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Input */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="Enter your name"
            />
          </div>

          {/* Image URL Input */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Image URL
            </label>
            <input
              type="url"
              name="image"
              required
              value={formData.image}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="Enter image URL"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg shadow-blue-200"
          >
            {loading ? "Updating..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
