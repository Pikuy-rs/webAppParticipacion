
import React, { useState, useEffect, useMemo } from 'react';
import { Play, MatchPrediction } from '../types';

interface PlayViewProps {
  onAddPlay: (play: Omit<Play, 'id' | 'timestamp' | 'userEmail'>) => void;
}

const initialPrediction: MatchPrediction = {
  teamA: 'Atlético Tucumán',
  teamB: 'San Martín',
  firstHalfScoreA: 0,
  firstHalfScoreB: 0,
  secondHalfScoreA: 0,
  secondHalfScoreB: 0,
  finalScoreA: 0,
  finalScoreB: 0,
};


const PlayView: React.FC<PlayViewProps> = ({ onAddPlay }) => {
  const [serialNumber, setSerialNumber] = useState('');
  const [isSerialVerified, setIsSerialVerified] = useState(false);
  const [prediction, setPrediction] = useState<MatchPrediction>(initialPrediction);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  
  const matchStartTime = useMemo(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate(), 19, 0, 0);
  }, []);
  
  const [isPlayTimeClosed, setIsPlayTimeClosed] = useState(false);

  useEffect(() => {
    const checkTime = () => {
      const fiveMinutesBefore = new Date(matchStartTime.getTime() - 5 * 60000);
      if (new Date() > fiveMinutesBefore) {
        setIsPlayTimeClosed(true);
      }
    };
    checkTime();
    const interval = setInterval(checkTime, 30000);
    return () => clearInterval(interval);
  }, [matchStartTime]);

  const handleVerifySerial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serialNumber.trim()) {
      setError('Por favor, ingresa un número de serie.');
      return;
    }
    setError('');
    setIsSubmitting(true);
    setTimeout(() => {
        // Simulate API check for serial number validity and usage
        console.log(`Verifying serial: ${serialNumber}`);
        setIsSerialVerified(true);
        setIsSubmitting(false);
    }, 1000);
  };

  const handleScoreChange = (period: 'firstHalf' | 'secondHalf', team: 'A' | 'B', value: string) => {
    const score = parseInt(value, 10);
    if (isNaN(score) || score < 0 || score >= 100) return;

    setPrediction(prev => {
        const newPred = { ...prev };
        if (period === 'firstHalf') {
            if (team === 'A') newPred.firstHalfScoreA = score;
            else newPred.firstHalfScoreB = score;
        } else {
            if (team === 'A') newPred.secondHalfScoreA = score;
            else newPred.secondHalfScoreB = score;
        }

        newPred.finalScoreA = newPred.firstHalfScoreA + newPred.secondHalfScoreA;
        newPred.finalScoreB = newPred.firstHalfScoreB + newPred.secondHalfScoreB;

        return newPred;
    });
  };

  const handleAttemptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  const handleConfirmSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      onAddPlay({ serialNumber, prediction });
      setIsSubmitting(false);
      setShowConfirm(false);
      setSerialNumber('');
      setIsSerialVerified(false);
      setPrediction(initialPrediction);
    }, 1500);
  };
  
  if (isPlayTimeClosed) {
    return (
      <div className="text-center py-10 px-4 bg-red-50 border border-red-200 rounded-lg">
        <h2 className="text-xl font-bold text-red-800 mb-2">Participación Cerrada</h2>
        <p className="text-red-700">El tiempo para cargar jugadas para esta fecha ha finalizado.</p>
        <p className="text-sm text-red-600 mt-2">¡Mucha suerte a todos los participantes!</p>
      </div>
    );
  }

  const renderPredictionInput = (label: string, period: 'firstHalf' | 'secondHalf', scoreA: number, scoreB: number) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
        <div className="flex items-center bg-gray-50 p-3 rounded-lg">
            <span className="flex-1 font-medium text-gray-800 text-right text-sm sm:text-base">{prediction.teamA}</span>
            <div className="flex items-center mx-4 flex-shrink-0">
                <input type="number" value={scoreA} onChange={e => handleScoreChange(period, 'A', e.target.value)} className="w-12 text-center font-bold text-lg text-gray-900 border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500" />
                <span className="mx-2 font-bold text-gray-400">-</span>
                <input type="number" value={scoreB} onChange={e => handleScoreChange(period, 'B', e.target.value)} className="w-12 text-center font-bold text-lg text-gray-900 border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500" />
            </div>
            <span className="flex-1 font-medium text-gray-800 text-left text-sm sm:text-base">{prediction.teamB}</span>
        </div>
    </div>
  );

  return (
    <div className="pb-16">
      <h2 className="text-2xl font-bold text-blue-900 mb-4">Cargar Jugada</h2>
      {error && <p className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-sm">{error}</p>}
      
      {!isSerialVerified ? (
        <form onSubmit={handleVerifySerial} className="space-y-4">
          <div>
            <label htmlFor="serial" className="block text-sm font-medium text-gray-700 mb-1">Paso 1: Validar N° de Serie</label>
            <input
              type="text"
              id="serial"
              value={serialNumber}
              onChange={(e) => setSerialNumber(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              placeholder="Ingresa el código único"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-800 disabled:bg-blue-400"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Verificando...' : 'Verificar Serie'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleAttemptSubmit} className="space-y-6">
          <div>
            <p className="text-sm text-gray-600">N° de Serie Verificado:</p>
            <p className="font-bold text-emerald-600 text-lg">{serialNumber}</p>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800">Paso 2: Ingresá tus pronósticos</h3>
            {renderPredictionInput("Resultado 1er Tiempo", "firstHalf", prediction.firstHalfScoreA, prediction.firstHalfScoreB)}
            {renderPredictionInput("Resultado 2do Tiempo", "secondHalf", prediction.secondHalfScoreA, prediction.secondHalfScoreB)}

            <div className="border-t pt-4 mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Resultado Final (calculado)</label>
                <div className="flex items-center bg-emerald-50 border border-emerald-200 p-3 rounded-lg">
                     <span className="flex-1 font-bold text-gray-800 text-lg text-right">{prediction.teamA}</span>
                      <span className="font-extrabold text-emerald-800 text-2xl mx-4 flex-shrink-0">{prediction.finalScoreA} - {prediction.finalScoreB}</span>
                     <span className="flex-1 font-bold text-gray-800 text-lg text-left">{prediction.teamB}</span>
                </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-500 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            Enviar Jugada
          </button>
        </form>
      )}

      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm">
                <h3 className="text-lg font-bold text-blue-900">Confirmar Jugada</h3>
                <p className="text-gray-600 my-4 text-sm">Una vez enviada, tu jugada no podrá ser modificada. ¿Deseas continuar?</p>
                <div className="flex justify-end space-x-3 mt-4">
                    <button onClick={() => setShowConfirm(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300" disabled={isSubmitting}>
                        Cancelar
                    </button>
                    <button onClick={handleConfirmSubmit} className="px-4 py-2 text-sm font-medium text-white bg-emerald-500 rounded-md hover:bg-emerald-600 disabled:bg-emerald-300 flex items-center" disabled={isSubmitting}>
                        {isSubmitting && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>}
                        {isSubmitting ? 'Enviando...' : 'Confirmar y Enviar'}
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default PlayView;
