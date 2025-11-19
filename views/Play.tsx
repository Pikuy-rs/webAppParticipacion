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

const ScoreInput: React.FC<{
  value: number;
  onChange: (newValue: string) => void;
}> = ({ value, onChange }) => {
  const increment = () => onChange(String(value + 1));
  const decrement = () => onChange(String(Math.max(0, value - 1)));

  return (
    <div className="flex items-center justify-center space-x-2">
      <button
        type="button"
        onClick={decrement}
        className="w-9 h-9 flex-shrink-0 rounded-full bg-gray-600 text-white font-bold text-xl flex items-center justify-center hover:bg-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-emerald-500"
        disabled={value <= 0}
        aria-label="Disminuir marcador"
      >
        -
      </button>
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={value}
        onFocus={(e) => e.target.select()}
        onChange={(e) => onChange(e.target.value)}
        className="w-12 text-center font-bold text-2xl bg-gray-700 text-white border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
      />
      <button
        type="button"
        onClick={increment}
        className="w-9 h-9 flex-shrink-0 rounded-full bg-gray-600 text-white font-bold text-xl flex items-center justify-center hover:bg-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-emerald-500"
        aria-label="Aumentar marcador"
        disabled={value >= 99}
      >
        +
      </button>
    </div>
  );
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
    const score = value === '' ? 0 : parseInt(value, 10);

    if (isNaN(score) || score < 0 || score > 99) {
        return;
    }

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

  const renderPredictionInput = (label: string, period: 'firstHalf' | 'secondHalf', scoreA: number, scoreB: number) => (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2 text-center">{label}</label>
      <div className="flex items-stretch justify-between bg-gray-800 p-3 rounded-lg border border-gray-700">
        
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-2">
            <span className="font-bold text-gray-200 text-base leading-tight px-1">{prediction.teamA}</span>
            <ScoreInput value={scoreA} onChange={newValue => handleScoreChange(period, 'A', newValue)} />
        </div>

        <div className="flex items-center justify-center px-1 sm:px-3">
            <span className="font-bold text-gray-400 text-2xl">-</span>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-2">
            <span className="font-bold text-gray-200 text-base leading-tight px-1">{prediction.teamB}</span>
            <ScoreInput value={scoreB} onChange={newValue => handleScoreChange(period, 'B', newValue)} />
        </div>

      </div>
    </div>
  );

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-4">Cargar Jugada</h2>
      {error && <p className="bg-red-900/50 text-red-300 p-3 rounded-md mb-4 text-sm border border-red-800">{error}</p>}
      
      {!isSerialVerified ? (
        <form onSubmit={handleVerifySerial} className="space-y-4">
          <div>
            <label htmlFor="serial" className="block text-sm font-medium text-gray-300 mb-1">Paso 1: Validar N° de Serie</label>
            <input
              type="text"
              id="serial"
              value={serialNumber}
              onChange={(e) => setSerialNumber(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md shadow-sm text-white placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              placeholder="Ingresa el código único"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:bg-emerald-800/50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Verificando...' : 'Verificar Serie'}
          </button>
        </form>
      ) : (
        <>
            {isPlayTimeClosed ? (
                <div className="text-center py-6 px-4 space-y-6">
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                        <p className="text-sm text-gray-400">N° de Serie:</p>
                        <p className="font-mono font-bold text-emerald-400 text-lg">{serialNumber}</p>
                        <p className="text-sm text-green-400 mt-2">✓ Serie Validada Correctamente</p>
                    </div>
                    <div className="bg-yellow-900/50 border border-yellow-800 rounded-lg p-6">
                        <h2 className="text-xl font-bold text-yellow-300 mb-2">Carga de Pronósticos Cerrada</h2>
                        <p className="text-yellow-400">El tiempo para cargar jugadas para esta fecha ha finalizado.</p>
                        <p className="text-sm text-yellow-400 mt-2">Tu serie es válida, pero ya no es posible registrar un pronóstico. ¡Mucha suerte para la próxima!</p>
                    </div>
                </div>
            ) : (
                <form onSubmit={handleAttemptSubmit} className="space-y-6">
                    <div>
                        <p className="text-sm text-gray-400">N° de Serie Verificado:</p>
                        <p className="font-bold text-emerald-400 text-lg">{serialNumber}</p>
                    </div>
                    
                    <div className="space-y-4">
                        <h3 className="font-semibold text-gray-100">Paso 2: Ingresá tus pronósticos</h3>
                        {renderPredictionInput("Resultado 1er Tiempo", "firstHalf", prediction.firstHalfScoreA, prediction.firstHalfScoreB)}
                        {renderPredictionInput("Resultado 2do Tiempo", "secondHalf", prediction.secondHalfScoreA, prediction.secondHalfScoreB)}

                        <div className="border-t border-gray-700 pt-4 mt-4">
                            <label className="block text-sm font-medium text-gray-300 mb-2">Resultado Final (calculado)</label>
                            <div className="flex items-center bg-emerald-900/50 border border-emerald-800 p-3 rounded-lg">
                                <span className="flex-1 font-bold text-gray-200 text-lg text-right">{prediction.teamA}</span>
                                <span className="font-extrabold text-emerald-300 text-2xl mx-4 flex-shrink-0">{prediction.finalScoreA} - {prediction.finalScoreB}</span>
                                <span className="flex-1 font-bold text-gray-200 text-lg text-left">{prediction.teamB}</span>
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
        </>
      )}

      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-sm border border-gray-700">
                <h3 className="text-lg font-bold text-white">Confirmar Jugada</h3>
                <p className="text-gray-300 my-4 text-sm">Una vez enviada, tu jugada no podrá ser modificada. ¿Deseas continuar?</p>
                <div className="flex justify-end space-x-3 mt-4">
                    <button onClick={() => setShowConfirm(false)} className="px-4 py-2 text-sm font-medium text-gray-200 bg-gray-600 rounded-md hover:bg-gray-500" disabled={isSubmitting}>
                        Cancelar
                    </button>
                    <button onClick={handleConfirmSubmit} className="px-4 py-2 text-sm font-medium text-white bg-emerald-500 rounded-md hover:bg-emerald-600 disabled:bg-emerald-400/50 flex items-center" disabled={isSubmitting}>
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