
import React from 'react';
import { Tab } from '../types';

interface HomeProps {
  setActiveTab: (tab: Tab) => void;
}

const Home: React.FC<HomeProps> = ({ setActiveTab }) => {
  return (
    <div className="text-center flex flex-col justify-center h-full pb-16">
      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Pozo Acumulado</h2>
        <p className="text-5xl font-bold text-blue-900 my-2">$1.250.000</p>
        <p className="text-lg text-gray-600">Fecha 12 - Liga Tucumana</p>
        <p className="text-sm text-gray-500 mt-1">Cierre de jugadas: Sábado 18:55 hs</p>
      </div>

      <div className="mt-8">
        <button
          onClick={() => setActiveTab('JUGAR')}
          className="w-full bg-emerald-500 text-white font-bold py-4 px-6 rounded-lg shadow-lg hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50 transform hover:scale-105 transition-transform duration-200"
        >
          CARGAR MI JUGADA
        </button>
      </div>
        <div className="mt-8 text-gray-600">
            <h3 className="font-bold text-lg mb-2">¿Cómo funciona?</h3>
            <ol className="text-left space-y-2 text-sm list-decimal list-inside bg-gray-50 p-4 rounded-lg">
                <li>Validá tu número de serie único.</li>
                <li>Cargá tus 3 pronósticos.</li>
                <li>Recibí tu comprobante digital al instante.</li>
            </ol>
        </div>
    </div>
  );
};

export default Home;
