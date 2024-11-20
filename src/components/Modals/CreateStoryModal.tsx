

interface CreateStoryModalProps {
  togglePopup: () => void;
}

const CreateStoryModal: React.FC<CreateStoryModalProps> = ({ togglePopup }) => {
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 ">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] max-w-full relative h-[80vh] overflow-y-auto">
            <button
              onClick={togglePopup}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              ✕
            </button>

            <div className="flex flex-col gap-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-green-700">
                  Story Cover Image
                </h3>
                <div className="mt-2 border-dashed border-2 border-gray-300 rounded-full w-32 h-32 mx-auto flex items-center justify-center">
                  <p className="text-gray-500 text-sm">
                    Drag & Drop your file <br />
                    or{" "}
                    <a href="#" className="text-blue-500">
                      Browse
                    </a>
                  </p>
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  Recommended sizes: 180x180 px.
                </p>
              </div>

              <div>
                <label
                  className="block text-gray-700 font-medium mb-1"
                  htmlFor="storyTitle"
                >
                  Story Cover Title
                </label>
                <input
                  id="storyTitle"
                  type="text"
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:outline-none px-3 py-2"
                  placeholder="Enter your title"
                />
              </div>

              <div>
                <label
                  className="block text-gray-700 font-medium mb-1"
                  htmlFor="storyLinkText"
                >
                  Story Link Text
                </label>
                <input
                  id="storyLinkText"
                  type="text"
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:outline-none px-3 py-2"
                  placeholder='e.g., "See Article"'
                />
              </div>

              <div>
                <label
                  className="block text-gray-700 font-medium mb-1"
                  htmlFor="storyLink"
                >
                  Story Link
                </label>
                <input
                  id="storyLink"
                  type="url"
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:outline-none px-3 py-2"
                  placeholder="Enter the link"
                />
              </div>

              <div className="text-center">
                <h3 className="text-lg font-semibold text-green-700">
                  Story Media
                </h3>
                <div className="mt-2 border-dashed border-2 border-gray-300 rounded-md w-full h-32 flex items-center justify-center">
                  <p className="text-gray-500 text-sm">
                    Drag & Drop your file <br />
                    or{" "}
                    <a href="#" className="text-blue-500">
                      Browse
                    </a>
                  </p>
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  Allowed types: .jpg, .jpeg, .png, .gif, .mp4, .mov, .wmv,
                  .avi, .mpeg, .3gp
                </p>
                <p className="text-sm text-gray-400">
                  Recommended sizes: 1080x1920 px.
                </p>
              </div>

              <div>
                <label
                  className="block text-gray-700 font-medium mb-1"
                  htmlFor="duration"
                >
                  Duration
                </label>
                <input
                  id="duration"
                  type="number"
                  min="1"
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:outline-none px-3 py-2"
                  placeholder="60"
                />
              </div>

              <div>
                <label
                  className="block text-gray-700 font-medium mb-1"
                  htmlFor="visibility"
                >
                  Visibility
                </label>
                <select
                  id="visibility"
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:outline-none px-3 py-2"
                >
                  <option value="everyone">Everyone</option>
                  <option value="friends">Friends</option>
                  <option value="private">Private</option>
                </select>
              </div>

              <div className="flex justify-end gap-3">
                <button className="p-3 rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:ring focus:ring-blue-300 transition-all">
                  Add Story
                </button>

                <button className="p-3 rounded-md text-white bg-green-500 hover:bg-green-600 focus:ring focus:ring-green-300 transition-all">
                  Publish
                </button>
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default CreateStoryModal;
