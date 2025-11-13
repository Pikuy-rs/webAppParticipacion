
import React, { useState } from 'react';
import { User } from '../types';
import { EyeIcon, EyeOffIcon } from '../components/icons';

interface AuthProps {
  onLogin: (user: User) => void;
  onRegister: (user: User) => void;
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

const Login: React.FC<AuthProps> = ({ onLogin, onRegister }) => {
  const [view, setView] = useState<'options' | 'login' | 'register'>('options');

  // Register state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState('');
  const [club, setClub] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [registerError, setRegisterError] = useState('');

  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !phone) {
      setRegisterError('Todos los campos obligatorios deben ser completados.');
      return;
    }
    if (!agreedToTerms) {
        setRegisterError('Debes ser mayor de 18 años y aceptar los términos y condiciones.');
        return;
    }
    setRegisterError('');
    onRegister({ name, email, phone, club, password });
  };
  
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      setLoginError('Por favor, ingresa tu email y contraseña.');
      return;
    }
    setLoginError('');
    // Simulate login - in a real app, you'd verify credentials
    onLogin({ name: 'Usuario Existente', email: loginEmail, phone: '123456789', club: 'Club Simulado' });
  };

  const commonInputClasses = "mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm";

  const renderOptions = () => (
    <>
      <h1 className="text-2xl font-bold text-center text-blue-900 mb-2">Bienvenido</h1>
      <p className="text-center text-gray-600 mb-8">Selecciona una opción para continuar.</p>
      <div className="space-y-4">
        <button
          onClick={() => setView('login')}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-500 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
        >
          INGRESAR
        </button>
        <button
          onClick={() => setView('register')}
          className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-blue-900 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-800"
        >
          REGISTRARME POR PRIMERA VEZ
        </button>
      </div>
    </>
  );

  const renderLogin = () => (
    <>
      <h1 className="text-2xl font-bold text-center text-blue-900 mb-2">Iniciar Sesión</h1>
      <p className="text-center text-gray-600 mb-6">Ingresa tus credenciales para continuar.</p>
      
      {loginError && <p className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-sm">{loginError}</p>}
      
      <form onSubmit={handleLoginSubmit} className="space-y-4">
        <div>
            <label htmlFor="login-email" className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="login-email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} className={commonInputClasses} placeholder="tu@email.com" />
        </div>
        <div>
            <label htmlFor="login-password" className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input type="password" id="login-password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} className={commonInputClasses} placeholder="••••••••" />
        </div>
        <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-500 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
        >
          INGRESAR
        </button>
      </form>
      <p className="text-center text-sm text-gray-600 mt-4">
        ¿No tienes cuenta?{' '}
        <button onClick={() => setView('register')} className="font-medium text-emerald-600 hover:text-emerald-500">Regístrate</button>
      </p>
    </>
  );
  
  const renderRegister = () => (
     <>
      <h1 className="text-2xl font-bold text-center text-blue-900 mb-2">Crear Cuenta</h1>
      <p className="text-center text-gray-600 mb-6">Completa tus datos para participar.</p>
      
      {registerError && <p className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-sm">{registerError}</p>}
      
      <form onSubmit={handleRegisterSubmit} className="space-y-4">
        <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre y Apellido</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className={commonInputClasses} placeholder="Juan Pérez" required />
        </div>
        <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className={commonInputClasses} placeholder="juan.perez@email.com" required />
        </div>
        <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
            <div className="relative">
                <input type={showPassword ? 'text' : 'password'} id="password" value={password} onChange={(e) => setPassword(e.target.value)} className={commonInputClasses} placeholder="Creá tu contraseña" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
            </div>
        </div>
        <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Teléfono (WhatsApp)</label>
            <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className={commonInputClasses} placeholder="+54 9 381..." required />
        </div>
        <div>
            <label htmlFor="club" className="block text-sm font-medium text-gray-700">¿Cuál es tu Club de Barrio? (Opcional)</label>
            <select id="club" value={club} onChange={(e) => setClub(e.target.value)} className={commonInputClasses}>
                <option value="">Selecciona tu club</option>
                {tucumanClubs.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
        </div>
        <div className="flex items-start">
            <div className="flex items-center h-5">
                <input id="terms" name="terms" type="checkbox" checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)} className="focus:ring-emerald-500 h-4 w-4 text-emerald-600 border-gray-300 rounded" />
            </div>
            <div className="ml-3 text-sm">
                <label htmlFor="terms" className="text-gray-600">
                    Soy mayor de 18 años y acepto los <a href="#" className="font-medium text-emerald-600 hover:underline">Términos y Condiciones</a> y la <a href="#" className="font-medium text-emerald-600 hover:underline">Política de Privacidad</a>.
                </label>
            </div>
        </div>
        <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-500 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
        >
          CREAR CUENTA
        </button>
      </form>
      <p className="text-center text-sm text-gray-600 mt-4">
        ¿Ya tienes cuenta?{' '}
        <button onClick={() => setView('login')} className="font-medium text-emerald-600 hover:text-emerald-500">Ingresa aquí</button>
      </p>
    </>
  );

  const renderContent = () => {
    switch(view) {
        case 'login': return renderLogin();
        case 'register': return renderRegister();
        case 'options':
        default:
            return renderOptions();
    }
  }

  return (
    <div className="min-h-screen bg-blue-900 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-xl p-8">
            {renderContent()}
        </div>
    </div>
  );
};

export default Login;
