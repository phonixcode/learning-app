import React from "react";

interface Topic {
  title: string;
  videoUrl: string;
  description: string;
}

const TopicDetail: React.FC<{ topic: Topic }> = ({ topic }) => {
  const isYouTubeUrl = (url: string) => {
    return url.includes("youtube.com") || url.includes("youtu.be");
  };

  const getYouTubeVideoId = (url: string) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=))([^&\n]{11})/;
    const matches = url.match(regex);
    return matches ? matches[1] : null;
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg mt-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">{topic.title}</h1>
      {isYouTubeUrl(topic.videoUrl) ? (
        <iframe
          width="100%"
          height="400"
          src={`https://www.youtube.com/embed/${getYouTubeVideoId(topic.videoUrl)}`}
          title={topic.title}
          frameBorder="0"
          allowFullScreen
          className="rounded-lg"
        ></iframe>
      ) : (
        <video
          src={topic.videoUrl}
          controls
          className="w-full h-64 rounded-lg shadow"
          preload="metadata"
        >
          Your browser does not support the video tag.
        </video>
      )}
      <p className="mt-4 text-gray-600">{topic.description}</p>
    </div>
  );
};

export default TopicDetail;
