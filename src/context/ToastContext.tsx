import React, { createContext, useState, useContext } from 'react';

interface ToastContextType {
  showToast: boolean;
  toastMessage: string;
  setShowToast: (show: boolean) => void;
  setToastMessage: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  return (
    <ToastContext.Provider value={{ showToast, toastMessage, setShowToast, setToastMessage }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
