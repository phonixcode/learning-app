import { useAppContext } from '../context/AppContext';
import { trackProgress, getProgress } from '@/utils/api'; 
import React, { useState, useEffect } from 'react';

interface ProgressTrackerProps {
  topicId: number;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ topicId }) => {
  const { progress, setProgress, user } = useAppContext();
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const result = await getProgress(user?.id, topicId);
        setIsCompleted(result.progress[0]?.completed); 
      } catch (error) {
        console.error('Error fetching progress:', error);
      }
    };

    if (user?.id) {
      fetchProgress();
    }
  }, [user, topicId]);

  const handleTrackProgress = async () => {
    try {
      const result = await trackProgress(user?.id, topicId, true);
      setProgress((prevProgress) => ({
        ...prevProgress,
        [topicId]: result.progress,
      }));
      setIsCompleted(true);
    } catch (error) {
      console.error('Error tracking progress:', error);
    }
  };

  return (
    <div className="mt-6 p-4 shadow rounded-lg flex justify-center">
      <button 
        onClick={handleTrackProgress} 
        className={`py-2 px-6 rounded transition duration-300 
          ${isCompleted ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 text-white'}`}
        disabled={isCompleted} 
      >
        {isCompleted ? 'Completed' : 'Mark as Complete'}
      </button>
    </div>
  );
};

export default ProgressTracker;
