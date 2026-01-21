import React from "react";
import ReactDOM from "react-dom";

const VideoOverlay = ({ open, onClose }) => {
  if (!open) return null;

  return ReactDOM.createPortal(
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000000, // 🔥 higher than intro.js
      }}
    >
      <div style={{ position: "relative", width: "80%", maxWidth: "900px" }}>
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "-15px",
            right: "-15px",
            background: "#000",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            width: "35px",
            height: "35px",
            cursor: "pointer",
            fontSize: "18px",
            zIndex: 1000001,
          }}
        >
          ✕
        </button>

        {/* iframe */}
        <div className="ratio ratio-16x9">
          <iframe
            src="https://www.youtube.com/embed/iEasMXu72No"
            title="Guide Video"
            allowFullScreen
          />
        </div>
      </div>
    </div>,
    document.body 
  );
};

export default VideoOverlay;











