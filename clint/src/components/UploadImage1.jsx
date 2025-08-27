import React, { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import toast from "react-hot-toast";
import axios from "axios";
import summerApi from "../common/summeryApi";

function UploadImage1({ close }) {
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const setImage = (e) => {
    const file = e.target.files[0];
    if (!file) {
      toast.error("Please select an image file");
      return;
    }

    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file)); // 👈 Create temporary URL for preview
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      toast.error("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("image", imageFile);

    setIsUploading(true);
    try {
      const response = await axios({
        ...summerApi.uploadImage,
        data: formData,
        withCredentials: true,
      });

      if (response.status === 200 && response.data.success) {
        toast.success("Image uploaded successfully!");
         // Refresh data
        close();     // Close modal
      } else {
        toast.error(response.data.message || "Upload failed");
      }
    } catch (error) {
      toast.error(error.message || "Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <section className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="m-3 relative bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md transition-all duration-300">
        <button
          onClick={close}
          className="absolute top-4 right-4 text-yellow-500 hover:text-red-600 transition"
        >
          <IoMdCloseCircle size={28} />
        </button>

        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
          Upload Image
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Select Image
            </label>
            <div className="relative border-2 border-dashed border-yellow-400 rounded-lg p-4 bg-yellow-50 flex flex-col items-center justify-center hover:border-green-400 transition h-40 cursor-pointer">
              <input
                type="file"
                name="image"
                id="image"
                accept="image/*"
                onChange={setImage}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Uploaded Preview"
                  className="h-24 w-auto object-cover rounded-md"
                />
              ) : (
                <span className="text-sm text-gray-700 text-center">
                  {isUploading ? "Uploading..." : "Click to select an image"}
                </span>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={!imageFile || isUploading}
            className={`${
              imageFile
                ? "bg-primary-200 hover:bg-primary-200"
                : "bg-gray-300 cursor-not-allowed"
            } text-white font-semibold py-2 px-4 rounded-lg transition duration-300 w-full`}
          >
            {isUploading ? "Uploading..." : "Submit"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default UploadImage1;
