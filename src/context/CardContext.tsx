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
    updateCardColumn: (id: string, newColumn: 'today' | 'upcoming' | 'optional', newDueDate: Date, newOrder: number | null) => Promise<void>;
    updateCardTitle: (id: string, newTitle: string) => Promise<any>;
    updateCardOrders: (updatedCards: CardType[]) => Promise<void>;
    updateCardDueDate: (id: string, newDate: Date) => Promise<any>;
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

    const updateCardColumn = async (id: string, newColumn: 'today' | 'upcoming' | 'optional', newDueDate: Date, newOrder: number | null) => {
        try {
            await axios.patch(`https://staatlidobackend.onrender.com/api/tasks/${id}`, { column: newColumn, dueDate: newDueDate, order: newOrder });
            setCards(prevCards => prevCards.map(card =>
                card.id === id ? { ...card, column: newColumn, dueDate: newDueDate, order: newOrder } : card
            ));
        } catch (error) {
            console.log(error);
        }
    };

    const updateCardTitle = async (id: string, newTitle: string) => {
        try {
            const res = await axios.patch(`https://staatlidobackend.onrender.com/api/tasks/${id}`, { title: newTitle });
            setCards(prevCards => prevCards.map(card =>
                card.id === id ? { ...card, title: newTitle } : card
            ));
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };

    const updateCardOrders = async (updatedCards: CardType[]) => {
        try {
            const res = await axios.patch(`https://staatlidobackend.onrender.com/api/tasks/reorder`, { tasks: updatedCards });
            console.log("res from backend:", res.data)
            setCards(updatedCards);
        } catch (error) {
            console.error('Failed to update card orders:', error);
        }
    };

    const updateCardDueDate = async (id: string, newDueDate: Date) => {
        try {
            const res = await axios.patch(`https://staatlidobackend.onrender.com/api/tasks/${id}`, { dueDate: newDueDate });
            setCards(prevCards => prevCards.map(card =>
                card.id === id ? { ...card, dueDate: newDueDate } : card
            ));
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        fetchCards();
    }, [user]);

    return (
        <CardContext.Provider value={{ cards, setCards, fetchLoading, fetchCards, updateCardColumn, updateCardTitle, updateCardOrders, updateCardDueDate }}>
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