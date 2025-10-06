"use client";
import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  name: string;
  email?: string;
  mobile?: string;
  icon?: string;
  role?: string;
}

interface ProfileContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  showProfilePopup: boolean;
  setShowProfilePopup: (show: boolean) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [showProfilePopup, setShowProfilePopup] = useState(false);

  return (
    <ProfileContext.Provider value={{
      user,
      setUser,
      showProfilePopup,
      setShowProfilePopup
    }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}
