
export interface User {
  name: string;
  email: string;
  phone: string;
  club: string;
  password?: string;
}

export interface MatchPrediction {
  teamA: string;
  teamB: string;
  firstHalfScoreA: number;
  firstHalfScoreB: number;
  secondHalfScoreA: number;
  secondHalfScoreB: number;
  finalScoreA: number;
  finalScoreB: number;
}

export interface Play {
  id: string;
  serialNumber: string;
  prediction: MatchPrediction;
  timestamp: Date;
  userEmail: string;
}

export type Tab = 'INICIO' | 'JUGAR' | 'MIS JUGADAS' | 'PERFIL';