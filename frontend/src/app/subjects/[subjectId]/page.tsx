"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchTopics } from "@/utils/api";
import TopicList from "@/app/components/TopicList";
import RankingTable from "@/app/components/RankingTable";
import { useAppContext } from "@/app/context/AppContext";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const SubjectTopicsPage = () => {
  const params = useParams();
  const subjectId = Array.isArray(params.subjectId)
    ? params.subjectId[0]
    : params.subjectId;
  const [topics, setTopics] = useState([]);
  const [subject, setSubject] = useState([]);
  const { isAuthenticated, user } = useAppContext();

  useEffect(() => {
    if (subjectId) {
      fetchTopics(subjectId).then((data) => {
        setSubject(data.title);
        setTopics(data.topics);
      });
    }
  }, [subjectId]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Body */}
      <main className="flex-grow bg-gray-100 p-8">
        <h1 className="text-3xl font-bold mb-6">{subject} - Topic List</h1>
        <TopicList topics={topics} />
        {isAuthenticated &&
          (user?.role === "admin" || user?.role === "teacher") && (
            <RankingTable subjectId={subjectId} />
          )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default SubjectTopicsPage;
