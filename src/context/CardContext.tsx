// src/contexts/CardContext.tsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthState } from 'react-firebase-hooks/auth';
import { fireAuth } from '../util/firebase';
import { CardType, TaskFromBackend } from '../util/Types';

interface ColumnColorsType {
    today: string;
    upcoming: string;
    optional: string;
}

interface CardContextType {
    cards: CardType[];
    setCards: React.Dispatch<React.SetStateAction<CardType[]>>;
    fetchLoading: boolean;
    fetchCards: () => Promise<void>;
    updateCardColumn: (id: string, newColumn: 'today' | 'upcoming' | 'optional', newDueDate: Date, newOrder: number | null) => Promise<void>;
    updateCardTitle: (id: string, newTitle: string) => Promise<any>;
    updateCardOrders: (updatedCards: CardType[]) => Promise<void>;
    updateCardDueDate: (id: string, newDate: Date) => Promise<any>;
    columnColors: ColumnColorsType;
    updateColumnColor: (colors: Partial<ColumnColorsType>) => Promise<void>
}



const CardContext = createContext<CardContextType | undefined>(undefined);

export const CardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user] = useAuthState(fireAuth);
    const [cards, setCards] = useState<CardType[]>([]);
    const [fetchLoading, setFetchLoading] = useState<boolean>(true);
    const [columnColors, setColumnColors] = useState<ColumnColorsType>({
        today: "#e66642",
        upcoming: "#ffc849",
        optional: "#4b87b4"
    })
    
    const fetchCards = async () => {
        if (!user) return 
        
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

    const fetchUserPreferences = async () => {
        if (!user) return 
        try {
            const response = await axios.get(`https://staatlidobackend.onrender.com/api/preferences/${user.uid}`)
            setColumnColors(response.data.columnColors)
        } catch (error) {
            console.error('Error fetching user preferences:', error);
        }
    }

    const updateColumnColor = async (colors: Partial<ColumnColorsType>) => {
        if (!user) return 
        const newColors = { ...columnColors, ...colors }

        try {
            await axios.post(`https://staatlidobackend.onrender.com/api/preferences/${user.uid}`, {
                columnColors: newColors
            })
            setColumnColors(newColors)
        } catch (error) {
            console.error('Error updating user preferences:', error);
        }

    }
            

    useEffect(() => {
        fetchCards();
    }, [user]);

    useEffect(() => {
        if (!user) return 
        fetchUserPreferences()
    }, [user])

    return (
        <CardContext.Provider value={{ cards, setCards, fetchLoading, fetchCards, updateCardColumn, updateCardTitle, updateCardOrders, updateCardDueDate, columnColors, updateColumnColor }}>
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