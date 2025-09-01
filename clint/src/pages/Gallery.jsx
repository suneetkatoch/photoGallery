import React, { useEffect, useState } from "react";
import axios from "axios";
import UploadImage1 from "../components/UploadImage1"; // Adjust path as needed
import { useNavigate } from "react-router-dom";

export const Gallery = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [uploadImage, setUploadImage] = useState(false);
  const [userRole, setUserRole] = useState(null); // Track user role

  const navigate = useNavigate();

  const getAllImages = async () => {
    try {
      const res = await axios.get("https://photogallery-5.onrender.com/api/images/all-images");
      if (res.data && Array.isArray(res.data.data)) {
        setImages(res.data.data);
      } else {
        console.error("Unexpected response format:", res.data);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    const userDataRaw = localStorage.getItem("userData");
    if (userDataRaw) {
      try {
        const userData = JSON.parse(userDataRaw);
        console.log("UserData:", userData);
        // Extract role safely
        const role = userData?.user?.role || null;
        setUserRole(role);
      } catch (e) {
        console.error("Failed to parse userData", e);
      }
    }
    getAllImages();
  }, []);

  const handleUploadClose = () => {
    setUploadImage(false);
    getAllImages();
  };

  const openLightbox = (index) => setCurrentIndex(index);
  const closeLightbox = () => setCurrentIndex(null);
  const showPrev = () =>
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  const showNext = () =>
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));

  const goBack = () => {
    navigate("/your-target-url"); // change as needed
  };

  return (
    <div className="bg-neutral-100 min-h-screen relative">
      {/* Go Back Button */}
      <button
        onClick={goBack}
        className="fixed top-4 left-4 z-30 flex items-center space-x-2 bg-black bg-opacity-60 hover:bg-opacity-80 text-white px-3 py-1.5 rounded shadow-md transition"
        aria-label="Go Back"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        <span>Back</span>
      </button>

      {/* Hero Section */}
      <section
        className="relative w-full h-64 md:h-96 flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/5653734/pexels-photo-5653734.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>

        {/* Conditionally show Add Image button only for admin */}
        {userRole === "ADMIN" && (
          <div className="absolute top-14 left-4 z-20">
            <button
              onClick={() => setUploadImage(true)}
              className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-5 rounded shadow-md transition"
            >
              Add Image
            </button>
          </div>
        )}

        <div className="relative z-10 max-w-4xl text-center px-6">
          <h1 className="text-white text-4xl md:text-6xl font-extrabold drop-shadow-lg mb-4">
            Explore My Lens
          </h1>
          <p className="text-white text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            A curated collection of life, light, and landscapes captured through my
            journey.
          </p>
        </div>
      </section>

      {/* Gallery Masonry Layout */}
      <main className="px-4 mt-6 sm:px-8 max-w-7xl mx-auto">
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {images.map((img, index) => (
            <div
              key={img._id}
              className="overflow-hidden break-inside-avoid cursor-pointer rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-105"
              onClick={() => openLightbox(index)}
            >
              <img
                src={img.image}
                alt={`Gallery-${index}`}
                className="w-full h-auto object-cover rounded"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {images.length === 0 && (
          <p className="text-center text-gray-500 mt-12">No images found.</p>
        )}
      </main>

      {/* Upload Image Modal */}
      {uploadImage && <UploadImage1 close={handleUploadClose} />}

      {/* Lightbox Viewer */}
      {currentIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center transition duration-500">
          <button
            className="absolute top-6 right-6 text-white text-5xl font-bold hover:text-amber-500 transition"
            onClick={closeLightbox}
            aria-label="Close Lightbox"
          >
            &times;
          </button>
          <button
            className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white text-4xl md:text-6xl hover:text-amber-400 transition"
            onClick={showPrev}
            aria-label="Previous Image"
          >
            &#8592;
          </button>
          <div className="max-w-6xl max-h-[90vh] px-4">
            <img
              src={images[currentIndex].image}
              alt="Full View"
              className="w-full h-full object-contain rounded shadow-2xl transition duration-500 ease-in-out"
            />
          </div>
          <button
            className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white text-4xl md:text-6xl hover:text-amber-400 transition"
            onClick={showNext}
            aria-label="Next Image"
          >
            &#8594;
          </button>
        </div>
      )}
    </div>
  );
};
