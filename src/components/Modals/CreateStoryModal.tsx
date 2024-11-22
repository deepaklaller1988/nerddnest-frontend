"use client"
import React, { useState } from "react";

interface CreateStoryModalProps {
  togglePopup: () => void;
  onAddStory: (story: {
    id: number;
    title: string;
    image: string;
    logo: string;
    link: string;
    duration: number;
    visibility: string;
  }) => void;
}

const CreateStoryModal: React.FC<CreateStoryModalProps> = ({
  togglePopup,
  onAddStory,
}) => {
  const [title, setTitle] = useState("");
  const [linkText, setLinkText] = useState("");
  const [storyLink, setStoryLink] = useState("");
  const [duration, setDuration] = useState(60);
  const [visibility, setVisibility] = useState("everyone");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [storyMedia, setStoryMedia] = useState<File | null>(null);

  const handleAddStory = () => {
    if (!title || !storyLink || !coverImage) {
      alert("Please fill in all required fields.");
      return;
    }

    const newStory = {
      id: Date.now(),
      title,
      image: URL.createObjectURL(coverImage),
      logo: URL.createObjectURL(coverImage), // Assuming logo is the same for now
      link: storyLink,
      duration,
      visibility,
    };

    onAddStory(newStory);
    togglePopup();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-[500px] rounded-[12px] shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 bg-gray-50 border-b">
          <h2 className="text-xl font-bold text-gray-800">Create Story</h2>
          <button
            className="bg-gray-200 w-10 h-10 p-0 flex items-center justify-center rounded-full text-[30px] text-gray-600 hover:text-gray-800"
            onClick={togglePopup}
          >
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6 space-y-6">
          {/* Cover Image */}
          <div>
            <h3 className="text-md font-semibold text-gray-700 mb-2">
              Cover Image
            </h3>
            <div className="w-full border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center p-6 bg-gray-50">
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setCoverImage(e.target.files ? e.target.files[0] : null)
                }
              />
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Recommended size: 180x180 px.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="storyTitle"
                className="block text-sm font-medium text-gray-600"
              >
                Story Title
              </label>
              <input
                id="storyTitle"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your title"
              />
            </div>
            <div>
              <label
                htmlFor="storyLinkText"
                className="block text-sm font-medium text-gray-600"
              >
                Link Text
              </label>
              <input
                id="storyLinkText"
                type="text"
                value={linkText}
                onChange={(e) => setLinkText(e.target.value)}
                className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="e.g., 'See More'"
              />
            </div>
            <div>
              <label
                htmlFor="storyLink"
                className="block text-sm font-medium text-gray-600"
              >
                Story Link
              </label>
              <input
                id="storyLink"
                type="url"
                value={storyLink}
                onChange={(e) => setStoryLink(e.target.value)}
                className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter the link"
              />
            </div>
          </div>

          <div>
            <h3 className="text-md font-semibold text-gray-700 mb-2">
              Story Media
            </h3>
            <div className="w-full border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center p-6 bg-gray-50">
              <input
                type="file"
                accept=".jpg,.png,.gif,.mp4"
                onChange={(e) =>
                  setStoryMedia(e.target.files ? e.target.files[0] : null)
                }
              />
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Allowed types: .jpg, .png, .gif, .mp4, etc.
            </p>
            <p className="text-xs text-gray-400">
              Recommended size: 1080x1920 px.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="duration"
                className="block text-sm font-medium text-gray-600"
              >
                Duration (seconds)
              </label>
              <input
                id="duration"
                type="number"
                min="1"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="60"
              />
            </div>
            <div>
              <label
                htmlFor="visibility"
                className="block text-sm font-medium text-gray-600"
              >
                Visibility
              </label>
              <select
                id="visibility"
                value={visibility}
                onChange={(e) => setVisibility(e.target.value)}
                className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="everyone">Everyone</option>
                <option value="friends">Friends</option>
                <option value="private">Private</option>
              </select>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end items-center space-x-3 px-6 py-4 bg-gray-50 border-t">
          <button
            className="px-5 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            onClick={togglePopup}
          >
            Cancel
          </button>
          <button
            onClick={handleAddStory}
            className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Add Story
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateStoryModal;
