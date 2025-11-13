import React, { useState } from 'react';
import { User } from '../types';

interface ProfileProps {
  user: User;
  onLogout: () => void;
  onUpdateUser: (updatedData: Partial<User>) => void;
}

const tucumanClubs = [
  'Atlético Tucumán',
  'San Martín',
  'Concepción FC',
  'Ñuñorco',
  'Amalia',
  'Lastenia',
  'Club Atlético San Pablo',
  'Otro'
];

const Profile: React.FC<ProfileProps> = ({ user, onLogout, onUpdateUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    phone: user.phone,
    club: user.club,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onUpdateUser(formData);
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    setFormData({
      name: user.name,
      phone: user.phone,
      club: user.club,
    });
    setIsEditing(false);
  };

  const commonInputClasses = "mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm";
  const hrClass = "border-gray-700";

  return (
    <div className="space-y-8">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Mi Perfil</h2>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="text-sm font-medium text-emerald-400 hover:text-emerald-300"
            >
              Editar
            </button>
          )}
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow border border-gray-700 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-400">Email:</span>
            <span className="font-semibold text-gray-100">{user.email}</span>
          </div>
          <hr className={hrClass}/>
          {isEditing ? (
            <>
              <div>
                <label htmlFor="name" className="text-sm font-medium text-gray-400">Nombre:</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className={commonInputClasses} />
              </div>
              <hr className={hrClass}/>
              <div>
                <label htmlFor="phone" className="text-sm font-medium text-gray-400">Teléfono:</label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} className={commonInputClasses} />
              </div>
              <hr className={hrClass}/>
              <div>
                <label htmlFor="club" className="text-sm font-medium text-gray-400">Club:</label>
                <select id="club" name="club" value={formData.club} onChange={handleInputChange} className={commonInputClasses}>
                  <option value="">Selecciona tu club</option>
                  {tucumanClubs.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-400">Nombre:</span>
                <span className="font-semibold text-gray-100">{user.name}</span>
              </div>
              <hr className={hrClass}/>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-400">Teléfono:</span>
                <span className="font-semibold text-gray-100">{user.phone}</span>
              </div>
              <hr className={hrClass}/>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-400">Club:</span>
                <span className="font-semibold text-gray-100">{user.club}</span>
              </div>
            </>
          )}
        </div>
        {isEditing && (
          <div className="mt-4 flex justify-end space-x-3">
            <button onClick={handleCancel} className="px-4 py-2 text-sm font-medium text-gray-200 bg-gray-600 rounded-md hover:bg-gray-500">
              Cancelar
            </button>
            <button onClick={handleSave} className="px-4 py-2 text-sm font-medium text-white bg-emerald-500 rounded-md hover:bg-emerald-600">
              Guardar Cambios
            </button>
          </div>
        )}
      </div>
      
      <div>
        <h3 className="text-xl font-bold text-white mb-3">Ayuda</h3>
        <div className="bg-gray-800 p-2 rounded-lg shadow border border-gray-700">
            <a href="#" className="block px-4 py-3 text-gray-200 hover:bg-gray-700/50 rounded-md transition-colors">Términos y Condiciones</a>
            <hr className={hrClass}/>
            <a href="#" className="block px-4 py-3 text-gray-200 hover:bg-gray-700/50 rounded-md transition-colors">Preguntas Frecuentes</a>
        </div>
      </div>

      <div>
        <button
          onClick={onLogout}
          className="w-full bg-red-600 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default Profile;
