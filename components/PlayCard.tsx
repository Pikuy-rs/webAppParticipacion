import React from 'react';
import { Play } from '../types';
import { ReceiptIcon } from './icons';

interface PlayCardProps {
  play: Play;
}

const PlayCard: React.FC<PlayCardProps> = ({ play }) => {
  const { prediction } = play;
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg mb-4 overflow-hidden">
      <div className="p-4 bg-gray-700/50 flex justify-between items-center">
        <div>
          <h3 className="font-bold text-lg text-white">Jugada #{play.serialNumber}</h3>
          <p className="text-xs text-gray-300 opacity-80">
            {play.timestamp.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })} - {play.timestamp.toLocaleTimeString('es-ES')}
          </p>
        </div>
        <ReceiptIcon />
      </div>
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-center text-center mb-4">
            <span className="flex-1 font-bold text-gray-100 text-lg text-right">{prediction.teamA}</span>
            <div className="flex flex-col items-center mx-4 flex-shrink-0">
                <span className="text-xs text-gray-400 font-semibold">RESULTADO FINAL</span>
                <span className="font-extrabold text-emerald-400 text-4xl">{prediction.finalScoreA} - {prediction.finalScoreB}</span>
            </div>
            <span className="flex-1 font-bold text-gray-100 text-lg text-left">{prediction.teamB}</span>
        </div>
        
        <div className="space-y-2 border-t border-gray-700 pt-3">
            <div className="flex items-center justify-between bg-gray-700/60 p-3 rounded-md text-sm">
                <span className="font-medium text-gray-300">Primer Tiempo</span>
                <span className="font-bold text-emerald-400 text-base">{prediction.firstHalfScoreA} - {prediction.firstHalfScoreB}</span>
            </div>
            <div className="flex items-center justify-between bg-gray-700/60 p-3 rounded-md text-sm">
                <span className="font-medium text-gray-300">Segundo Tiempo</span>
                <span className="font-bold text-emerald-400 text-base">{prediction.secondHalfScoreA} - {prediction.secondHalfScoreB}</span>
            </div>
        </div>
      </div>
      <div className="bg-gray-900/50 px-4 py-2 text-center text-xs text-gray-500 border-t border-gray-700">
        Comprobante Digital Válido - ID: {play.id}
      </div>
    </div>
  );
};

export default PlayCard;