import { useEffect, useState } from 'react';
import { fetchRankings } from '@/utils/api';

interface User {
  name: string;
}

interface Ranking {
  user: User;
  completionRate: number;
}

interface RankingTableProps {
  subjectId: string;
}

const RankingTable: React.FC<RankingTableProps> = ({ subjectId }) => {
  const [rankings, setRankings] = useState<Ranking[]>([]);
  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    const getRankings = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchRankings(subjectId);
        setRankings(data);
      } catch (err) {
        setError('Failed to fetch rankings');
      } finally {
        setLoading(false);
      }
    };

    getRankings();
  }, [subjectId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
        <h2 className="text-lg font-bold mt-5">Top Learners</h2>
        <table className="table-auto w-full mt-4">
        <thead>
            <tr>
            <th className="px-4 py-2">Rank</th>
            <th className="px-4 py-2">User</th>
            <th className="px-4 py-2">Progress</th>
            </tr>
        </thead>
        <tbody>
            {rankings.map((ranking, index) => (
            <tr key={ranking.user.name}> 
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{ranking.user.name}</td>
                <td className="border px-4 py-2">{ranking.completionRate.toFixed(2)}%</td> 
            </tr>
            ))}
        </tbody>
        </table>
    </>
  );
};

export default RankingTable;
