
import React from 'react';
import { Tab } from '../types';
import { HomeIcon, GamepadIcon, ListIcon, UserIcon } from './icons';

interface BottomNavProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const NavItem: React.FC<{
  label: Tab;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => {
  const activeClasses = 'text-emerald-500';
  const inactiveClasses = 'text-gray-500 hover:text-blue-900';

  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center w-1/4 transition-colors duration-200 ${isActive ? activeClasses : inactiveClasses}`}
    >
      {icon}
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
};

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="w-full max-w-md fixed bottom-0 left-1/2 -translate-x-1/2 bg-white border-t border-gray-200 shadow-t-md flex h-16">
      <NavItem
        label="INICIO"
        icon={<HomeIcon />}
        isActive={activeTab === 'INICIO'}
        onClick={() => setActiveTab('INICIO')}
      />
      <NavItem
        label="JUGAR"
        icon={<GamepadIcon />}
        isActive={activeTab === 'JUGAR'}
        onClick={() => setActiveTab('JUGAR')}
      />
      <NavItem
        label="MIS JUGADAS"
        icon={<ListIcon />}
        isActive={activeTab === 'MIS JUGADAS'}
        onClick={() => setActiveTab('MIS JUGADAS')}
      />
      <NavItem
        label="PERFIL"
        icon={<UserIcon />}
        isActive={activeTab === 'PERFIL'}
        onClick={() => setActiveTab('PERFIL')}
      />
    </nav>
  );
};

export default BottomNav;
