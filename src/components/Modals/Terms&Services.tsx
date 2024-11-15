import TermsOfServicePopupProps from "@/types/popupInterfaces";
import React from "react";
import { FiX } from "react-icons/fi";

const TermsOfServicePopup = ({isOpen,closeModal}:TermsOfServicePopupProps) => {

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg w-3/4 max-w-3xl p-6 overflow-y-auto h-[90%]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-[var(--highlight-blue)]">Terms of Service for Nerdd Nest</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-black">
                <FiX size={20} />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-2">Effective Date: 10/28/24</p>
            <p className="mb-4">
              Welcome to Nerdd Nest (“we,” “us,” “our”). Nerdd Nest is a social networking platform built for gamers, streamers, and creators of all ages. By using Nerdd Nest, you agree to comply with and be bound by these Terms of Service (“ToS”). If you do not agree to these terms, please do not use the platform.
            </p>
            <ol className="list-decimal pl-6 space-y-4 text-sm text-gray-600 leading-7">
              <li>
                <strong className="text-[var(--highlight-blue)]">Acceptance of Terms</strong>
                <p>By accessing and using Nerdd Nest, you acknowledge that you have read, understood, and agree to these ToS. If you are a minor, you must have permission from a parent or guardian to use this platform.</p>
              </li>
              <li>
              <strong className="text-[var(--highlight-blue)]">Eligibility</strong>
                <p>Age Requirements: Users must be at least 13 years old to create an account. Users under 18 (“Minors”) must have the permission of a parent or guardian to use the platform. Certain features may be restricted for users under 18 in compliance with applicable laws.</p>
                <p>Parental Responsibility: Parents or guardians are responsible for monitoring their children’s activity on Nerdd Nest. We encourage parents to educate minors on safe online behavior.</p>
              </li>
              <li>
                <strong className="text-[var(--highlight-blue)]">User Accounts and Responsibilities</strong>
                <p>Account Creation: Users must provide accurate information when creating an account. Choosing an offensive or misleading username is not permitted. Users are responsible for keeping their login credentials secure.</p>
                <p>Minor Account Restrictions: Minors may have limited access to certain features, such as direct messaging, and may have additional safety restrictions.</p>
                <p>Account Security: Users must promptly notify us of any unauthorized access or activity on their account. Sharing your account with others is prohibited.</p>
              </li>
              <li>
                <strong className="text-[var(--highlight-blue)]">Content and Conduct</strong>
                <p>Content Ownership: You retain ownership of any content (images, videos, text, etc.) you post on Nerdd Nest. By posting, you grant us a non-exclusive, worldwide, royalty-free license to use, display, and share your content within the platform.</p>
                <p>Content Standards: Content that is abusive, illegal, or inappropriate for a mixed-age audience is strictly prohibited. This includes content that is violent, sexually explicit, or otherwise harmful. Nerdd Nest reserves the right to remove such content.</p>
              </li>
              <li>
                <strong className="text-[var(--highlight-blue)]">Content Moderation</strong>
                <p>Automated and Human Review: Content posted to Nerdd Nest may be subject to automated or human review to ensure compliance with these ToS. While we strive to enforce these standards, users should report any inappropriate content they encounter.</p>
                <p>Reporting Violations: Users may report any content or user behavior that violates our standards. All reports are treated confidentially.</p>
              </li>
              
            </ol>
          </div>
        </div>
      )}
    </>
  );
};

export default TermsOfServicePopup;
