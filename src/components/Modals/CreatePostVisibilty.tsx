import React from "react";

type VisibilityPopupProps = {
    toggleVisibilityPopup: () => void;
  };
  
  const VisibilityPopup: React.FC<VisibilityPopupProps> = ({ toggleVisibilityPopup }) => {  return (
    <div>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-80">
          <h3 className="text-lg font-semibold mb-4">Who can see your post?</h3>
          <ul className="space-y-4">
            <li>
              <label className="flex items-start space-x-3">
              <label className="customRadio flex items-center gap-2"><input type="radio" name="" id=""/><span></span></label>
                <div>
                  <span className="font-medium">Public</span>
                  <p className="text-sm text-gray-500">
                    Visible to anyone, on or off this site
                  </p>
                </div>
              </label>
            </li>
            <li>
              <label className="flex items-start space-x-3">
              <label className="customRadio flex items-center gap-2"><input type="radio" name="" id=""/><span></span></label>
                <div>
                  <span className="font-medium">All Members</span>
                  <p className="text-sm text-gray-500">
                    Visible to all members on this site
                  </p>
                </div>
              </label>
            </li>
            <li>
              <label className="flex items-start space-x-3">
              <label className="customRadio flex items-center gap-2"><input type="radio" name="" id=""/><span></span></label>
                <div>
                  <span className="font-medium">My Connections</span>
                  <p className="text-sm text-gray-500">
                    Visible only to your connections
                  </p>
                </div>
              </label>
            </li>
            <li>
              <label className="flex items-start space-x-3">
              <label className="customRadio flex items-center gap-2"><input type="radio" name="" id=""/><span></span></label>
                <div>
                  <span className="font-medium">Only Me</span>
                  <p className="text-sm text-gray-500">Visible only to you</p>
                </div>
              </label>
            </li>
            <li>
              <label className="flex items-start space-x-3">
              <label className="customRadio flex items-center gap-2"><input type="radio" name="" id=""/><span></span></label>
                <div>
                  <span className="font-medium">Post in Group</span>
                  <p className="text-sm text-gray-500">
                    Visible to members of a group
                  </p>
                </div>
              </label>
            </li>
          </ul>
          <button
            onClick={toggleVisibilityPopup}
            className="mt-4 text-white px-4 py-2 rounded-md w-full bg-[var(--highlght-hover)] text-white rounded-[8px] px-4 py-1 h-[36px]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default VisibilityPopup;
