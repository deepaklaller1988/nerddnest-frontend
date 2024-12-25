import React, { useState } from "react";
import { FiCamera, FiPaperclip, FiSmile, FiSend } from "react-icons/fi";
import { BsCardImage } from "react-icons/bs";
import { RiGiftLine } from "react-icons/ri";

const MessageInput: React.FC = () => {
  const [message, setMessage] = useState<string>("");

  const handleSend = () => {
    if (message.trim()) {
      console.log("Message sent:", message);
      setMessage("");
    }
  };

  return (
    <div className="border-t border-gray-300 bg-gray-100 p-3">
      {/* Input Container */}
      <div className="flex items-center space-x-3">
        {/* File Attachments */}
        <div className="flex items-center space-x-2 text-gray-400">
          <button type="button" title="Attach Image" className="hover:text-blue-500">
            <BsCardImage size={20} />
          </button>
          <button type="button" title="Camera" className="hover:text-blue-500">
            <FiCamera size={20} />
          </button>
          <button type="button" title="Attach File" className="hover:text-blue-500">
            <FiPaperclip size={20} />
          </button>
          <button type="button" title="GIF" className="hover:text-blue-500">
            <RiGiftLine size={20} />
          </button>
        </div>

        {/* Message Input */}
        <textarea
          placeholder="Write a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
          className="flex-1 resize-none border-0 bg-transparent focus:outline-none focus:ring-0 px-2 text-sm text-gray-700 placeholder-gray-400"
          rows={1}
        />

        {/* Additional Options */}
        <div className="flex items-center space-x-2 text-gray-400">
          <button type="button" title="Text Formatting" className="hover:text-blue-500">
            Aa
          </button>
          <button type="button" title="Emoji" className="hover:text-blue-500">
            <FiSmile size={20} />
          </button>
          <button
            type="button"
            title="Send"
            className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
            onClick={handleSend}
          >
            <FiSend size={18} />
          </button>
        </div>
      </div>

      {/* Hint Text */}
      <div className="text-xs text-gray-400 mt-1">
        <span>Enter</span> to Send <span className="ml-2">Shift+Enter</span> to add a new line
      </div>
    </div>
  );
};

export default MessageInput;
