import React, { useEffect, useState } from "react";
import axios from "axios";

export const Home = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const getAllImages = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/images/all-images");

      if (res.data && Array.isArray(res.data.data)) {
        setImages(res.data.data);
        console.log("Fetched images:", res.data.data);
      } else {
        console.error("Unexpected response format:", res.data);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    getAllImages();
  }, []);

  return (
    <div className="bg-neutral-100 min-h-screen p-6">
      <h1 className="text-5xl font-extrabold text-center text-gray-800 mb-12">
        Photography Showcase
      </h1>

      {/* Masonry Style Gallery */}
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {images.map((img) => (
          <div
            key={img._id}
            className="overflow-hidden break-inside-avoid cursor-pointer transition-transform duration-300 hover:scale-105"
            onClick={() => setSelectedImage(img.image)}
          >
            <img
              src={img.image}
              alt="Gallery"
              className="w-full object-cover shadow-sm hover:shadow-md"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {images.length === 0 && (
        <p className="text-center text-gray-500 mt-12">No images found.</p>
      )}

      {/* Modal Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-5xl w-full">
            <button
              className="absolute top-4 right-4 text-white text-3xl font-bold hover:text-red-500 transition"
              onClick={() => setSelectedImage(null)}
            >
              &times;
            </button>
            <img
              src={selectedImage}
              alt="Full View"
              className="w-full max-h-[90vh] object-contain shadow-xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};
