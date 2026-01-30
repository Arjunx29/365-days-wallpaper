import React, { useState } from "react";
import "./AffirmationPanel.css";

const AFFIRMATIONS = {
  health: [
    "My body grows stronger and healthier every day.",
    "I respect my body and care for it consciously.",
    "I choose habits that support long-term health.",
    "My mind and body are in balance.",
    "I am grateful for my physical well-being."
  ],
  wealth: [
    "I manage money with clarity and discipline.",
    "My skills create value and financial stability.",
    "I make wise financial decisions consistently.",
    "Wealth grows through patience and focus.",
    "I attract opportunities through effort and integrity."
  ],
  confidence: [
    "I trust myself and my decisions.",
    "I speak clearly and stand by my values.",
    "I am capable of handling challenges.",
    "Confidence grows with action and consistency.",
    "I show up fully and authentically."
  ],
  spiritual: [
    "I am calm, grounded, and centered.",
    "I trust the journey I am on.",
    "Gratitude guides my thoughts and actions.",
    "I find peace in stillness.",
    "My inner strength supports me daily."
  ],
  relationship: [
    "I communicate honestly and respectfully.",
    "I build healthy and meaningful connections.",
    "I listen with patience and empathy.",
    "My relationships grow through understanding.",
    "I give and receive support freely."
  ],
  study: [
    "I focus deeply and learn effectively.",
    "Consistent study builds long-term mastery.",
    "I understand concepts with clarity.",
    "Effort today creates expertise tomorrow.",
    "I improve a little every day."
  ]
};

const TABS = [
  { key: "health", label: "Health" },
  { key: "wealth", label: "Wealth" },
  { key: "confidence", label: "Confidence" },
  { key: "spiritual", label: "Spiritual" },
  { key: "relationship", label: "Relationship" },
  { key: "study", label: "Study" }
];

const AffirmationPanel = () => {
  const [activeTab, setActiveTab] = useState("health");

  return (
    <div className="affirm-card">
      {/* Header */}
      <div className="affirm-header">
        <h3 className="affirm-title">Affirmations</h3>
      </div>

      {/* Tabs */}
      <div className="affirm-tabs">
        {TABS.map(tab => (
          <button
            key={tab.key}
            className={`affirm-tab ${
              activeTab === tab.key ? "active" : ""
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <ul className="affirm-list">
        {AFFIRMATIONS[activeTab].map((text, idx) => (
          <li key={idx} className="affirm-item">
            <span className="affirm-bullet">•</span>
            <span>{text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AffirmationPanel;
