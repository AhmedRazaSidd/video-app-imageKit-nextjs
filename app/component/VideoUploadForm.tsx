// "use client"; // This ensures that the page is a client-side component

import React, { useState } from "react";
import {
  upload,
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
} from "@imagekit/next";
import FileUpload from "./FileUpload"; // assuming FileUpload component is in the same directory

const VideoUploadForm = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const handleUploadSuccess = (res: any) => {
    setUploadedFileUrl(res.url); // assuming 'url' is returned after a successful upload
    setUploading(false);
  };

  const handleUploadProgress = (progress: number) => {
    setUploadProgress(progress);
  };

  const handleUploadError = (error: any) => {
    setUploading(false);
    if (error instanceof ImageKitInvalidRequestError) {
      setError("Invalid request error");
    } else if (error instanceof ImageKitUploadNetworkError) {
      setError("Network error occurred");
    } else if (error instanceof ImageKitServerError) {
      setError("Server error occurred");
    } else if (error instanceof ImageKitAbortError) {
      setError("Upload was aborted");
    } else {
      setError("An unknown error occurred");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Upload Video
        </h1>

        <FileUpload
          onSuccess={handleUploadSuccess}
          onProgress={handleUploadProgress}
          fileType="video"
        />

        {uploading && (
          <div className="mt-4">
            <p>Uploading... {uploadProgress}%</p>
          </div>
        )}

        {error && (
          <div className="mt-4 text-red-500">
            <p>{error}</p>
          </div>
        )}

        {uploadedFileUrl && (
          <div className="mt-6">
            <p className="text-green-500">Upload successful!</p>
            <video controls className="w-full mt-4">
              <source src={uploadedFileUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoUploadForm;
