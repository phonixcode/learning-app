'use client';

import { useEffect, useState } from 'react';
import { fetchSubjects } from '@/utils/api';
import Link from 'next/link';

interface Subject {
  id: number;
  title: string;
  description: string;
}

const SubjectList: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]); 

  useEffect(() => {
    const getSubjects = async () => {
      const data = await fetchSubjects();
      setSubjects(data);
    };

    getSubjects();
  }, []);

  return (
    <div className="space-y-4">
      {/* {subjects.map((subject) => (
        <div key={subject.id} className="border p-4 rounded">
          <h2 className="text-lg font-bold">{subject.title}</h2>
          <a href={`/subjects/${subject.id}`} className="text-blue-500">View Topics</a>
        </div>
      ))} */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {subjects.map((subject) => (
            <div key={subject.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold mb-2">{subject.title}</h2>
              <p className="text-gray-600 mb-4">{subject.description}</p>
              <Link href={`/subjects/${subject.id}`} className="text-blue-500 hover:underline">View Details</Link>
            </div>
          ))}
        </div>
    </div>
    
  );
};

export default SubjectList;
