import React, { useEffect, useState } from "react";
import "./ReviewPanel.css";

const ReviewPanel = () => {
  const [review, setReview] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("daily-review")) || {
        good: "",
        bad: "",
        improve: "",
      }
    );
  });

  /* -------- Auto-save on change -------- */
  useEffect(() => {
    localStorage.setItem("daily-review", JSON.stringify(review));
  }, [review]);

  /* -------- Reset -------- */
  const resetReview = () => {
    const empty = { good: "", bad: "", improve: "" };
    setReview(empty);
    localStorage.removeItem("daily-review");
  };

  return (
    <div className="review-card">
      {/* Header */}
      <div className="review-header">
        <h3 className="review-title">Daily Review</h3>

        <button
          className="review-reload"
          title="Reset review"
          onClick={resetReview}
        >
          ↺
        </button>
      </div>

      {/* Review Fields */}
      <div className="review-block">
        <p className="review-question"> What went well?</p>
        <textarea
          className="review-input"
          value={review.good}
          onChange={(e) =>
            setReview({ ...review, good: e.target.value })
          }
        />
      </div>

      <div className="review-block">
        <p className="review-question"> What didn’t?</p>
        <textarea
          className="review-input"
          value={review.bad}
          onChange={(e) =>
            setReview({ ...review, bad: e.target.value })
          }
        />
      </div>

      <div className="review-block">
        <p className="review-question"> What to improve tomorrow?</p>
        <textarea
          className="review-input"
          value={review.improve}
          onChange={(e) =>
            setReview({ ...review, improve: e.target.value })
          }
        />
      </div>
    </div>
  );
};

export default ReviewPanel;
