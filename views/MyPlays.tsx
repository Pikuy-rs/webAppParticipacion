
import React from 'react';
import { Play } from '../types';
import PlayCard from '../components/PlayCard';

interface MyPlaysProps {
  plays: Play[];
  userEmail: string;
}

const MyPlays: React.FC<MyPlaysProps> = ({ plays, userEmail }) => {
  const userPlays = plays.filter(p => p.userEmail === userEmail || p.userEmail === 'demo@example.com');

  return (
    <div className="pb-16">
      <h2 className="text-2xl font-bold text-blue-900 mb-4">Mis Jugadas</h2>
      {userPlays.length > 0 ? (
        userPlays.map(play => <PlayCard key={play.id} play={play} />)
      ) : (
        <div className="text-center py-10 px-4 bg-gray-50 rounded-lg">
          <p className="text-gray-600">Aún no has cargado ninguna jugada.</p>
          <p className="text-sm text-gray-500 mt-2">Dirígete a la pestaña "Jugar" para empezar.</p>
        </div>
      )}
    </div>
  );
};

export default MyPlays;
