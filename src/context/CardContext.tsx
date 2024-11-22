// src/contexts/CardContext.tsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthState } from 'react-firebase-hooks/auth';
import { fireAuth } from '../util/firebase';
import { CardType, TaskFromBackend } from '../util/Types';

interface CardContextType {
  cards: CardType[];
  setCards: React.Dispatch<React.SetStateAction<CardType[]>>;
  fetchLoading: boolean;
  fetchCards: () => Promise<void>;
}

const CardContext = createContext<CardContextType | undefined>(undefined);

export const CardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user] = useAuthState(fireAuth);
  const [cards, setCards] = useState<CardType[]>([]);
  const [fetchLoading, setFetchLoading] = useState<boolean>(true);

  const fetchCards = async () => {
    if (user) {
      setFetchLoading(true);
      try {
        const res = await axios.get(`https://staatlidobackend.onrender.com/api/tasks/${user.uid}`);
        const tasks = res.data.map(({ _id, ...rest }: TaskFromBackend) => ({
          ...rest,
          id: _id,
        }));
        setCards(tasks);
      } catch (error) {
        console.log(error);
      } finally {
        setFetchLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchCards();
  }, [user]);

  return (
    <CardContext.Provider value={{ cards, setCards, fetchLoading, fetchCards }}>
      {children}
    </CardContext.Provider>
  );
};

export const useCards = () => {
  const context = useContext(CardContext);
  if (context === undefined) {
    throw new Error('useCards must be used within a CardProvider');
  }
  return context;
};
