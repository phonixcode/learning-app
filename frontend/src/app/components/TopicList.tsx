import React from 'react';
import { useAppContext } from '../context/AppContext';
import Link from 'next/link';

interface Topic {
  id: number;
  title: string;
  videoUrl?: string; 
  description?: string;
}

const TopicList: React.FC<{ topics: Topic[] }> = ({ topics }) => {
  const { isAuthenticated } = useAppContext();

  const handleAuth = () => {
    window.location.href = '/login'; 
  };

  return (
    <div className="space-y-4">
      {topics.map((topic) => (
        <div key={topic.id} className="border p-4 rounded flex items-center justify-between">
          <h2 className="text-lg font-bold">{topic.title}</h2>
          {isAuthenticated ? (
            <Link href={`/topics/${topic.id}`} className="text-blue-500">
              View Topic
            </Link>
          ) : (
            <div className="flex items-center">
              <span className="text-gray-400 mr-2">🔒</span>
              <button
                onClick={handleAuth}
                className="text-blue-500 underline"
              >
                Login to view
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TopicList;
