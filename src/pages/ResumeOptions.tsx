import React from "react";
import { useNavigate } from "react-router-dom";

const ResumeOptions: React.FC = () => {
  const navigate = useNavigate();

  return (
  <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <h1 className="text-2xl font-bold mb-6">Resume Options</h1>
      <div className="space-y-4 w-full max-w-xs">
        <button
          className="w-full py-3 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => navigate("/create-resume")}
        >
          Create New Resume
        </button>
        <button
          className="w-full py-3 px-4 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={() => navigate("/upload-resume")}
        >
          Upload Resume
        </button>
      </div>
    </div>
  );
};

export default ResumeOptions;
