"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchTopicDetails } from "@/utils/api";
import TopicDetail from "../../components/TopicDetail";
import ProgressTracker from "../../components/ProgressTracker";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const TopicDetailPage = () => {
  const { topicId } = useParams();
  const [topic, setTopic] = useState(null);

  useEffect(() => {
    if (topicId) {
      const getTopicDetails = async () => {
        const data = await fetchTopicDetails(topicId);
        setTopic(data);
      };

      getTopicDetails();
    }
  }, [topicId]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

        {topic ? (
          <>
            <TopicDetail topic={topic} />
            <ProgressTracker topicId={Number(topicId)} />
          </>
        ) : (
          <div className="text-center text-gray-600">Loading...</div>
        )}
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default TopicDetailPage;
