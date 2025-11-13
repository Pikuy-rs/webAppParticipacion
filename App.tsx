import React, { useState, useCallback } from 'react';
import { User, Play, Tab } from './types';
import Home from './views/Home';
import PlayView from './views/Play';
import MyPlays from './views/MyPlays';
import Profile from './views/Profile';
import Login from './views/Login';
import BottomNav from './components/BottomNav';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [plays, setPlays] = useState<Play[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>('INICIO');

  const handleLogin = useCallback((loggedInUser: User) => {
    setUser(loggedInUser);
    // In a real app, you might fetch existing plays here
    setPlays([
        // Example initial play
        {
            id: `play-${Date.now() + 1}`,
            serialNumber: 'ABC-123-DEMO',
            prediction: {
              teamA: 'Atlético Tucumán',
              teamB: 'San Martín',
              firstHalfScoreA: 1,
              firstHalfScoreB: 0,
              secondHalfScoreA: 1,
              secondHalfScoreB: 1,
              finalScoreA: 2,
              finalScoreB: 1,
            },
            timestamp: new Date(Date.now() - 86400000), // 1 day ago
            userEmail: 'demo@example.com'
        }
    ]);
  }, []);

  const handleRegister = useCallback((registeredUser: User) => {
    // In a real app, you would save the new user to a database.
    // For this simulation, we just log them in.
    setUser(registeredUser);
    setPlays([]); // New users start with no plays
    setActiveTab('INICIO');
  }, []);

  const handleLogout = useCallback(() => {
    setUser(null);
    setPlays([]);
    setActiveTab('INICIO');
  }, []);
  
  const handleUpdateUser = useCallback((updatedData: Partial<User>) => {
    if (!user) return;
    setUser(prevUser => ({
        ...prevUser!,
        ...updatedData,
    }));
  }, [user]);

  const handleAddPlay = useCallback((newPlay: Omit<Play, 'id' | 'timestamp' | 'userEmail'>) => {
    if (!user) return;
    const playToAdd: Play = {
      ...newPlay,
      id: `play-${Date.now()}`,
      timestamp: new Date(),
      userEmail: user.email,
    };
    setPlays(prevPlays => [playToAdd, ...prevPlays]);
    setActiveTab('MIS JUGADAS');
    // Here you would also trigger an email sending service
    console.log('Comprobante enviado por email a:', user.email, playToAdd);
  }, [user]);

  const renderContent = () => {
    switch (activeTab) {
      case 'INICIO':
        return <Home setActiveTab={setActiveTab} />;
      case 'JUGAR':
        return <PlayView onAddPlay={handleAddPlay} />;
      case 'MIS JUGADAS':
        return <MyPlays plays={plays} userEmail={user?.email || ''} />;
      case 'PERFIL':
        return <Profile user={user!} onLogout={handleLogout} onUpdateUser={handleUpdateUser} />;
      default:
        return <Home setActiveTab={setActiveTab} />;
    }
  };

  if (!user) {
    return <Login onLogin={handleLogin} onRegister={handleRegister} />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      <div className="w-full max-w-md mx-auto flex flex-col md:h-auto h-screen">
        <header className="w-full max-w-md md:relative fixed top-0 left-1/2 -translate-x-1/2 bg-gray-900 text-white p-4 shadow-lg z-10 border-b border-gray-800">
            <h1 className="text-xl font-bold text-center text-emerald-400">TucuGol</h1>
        </header>
        <main className="flex-grow p-4 md:p-6 overflow-y-auto md:overflow-y-visible pt-24 md:pt-6 pb-20 md:pb-6">
          {renderContent()}
        </main>
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
};

export default App;