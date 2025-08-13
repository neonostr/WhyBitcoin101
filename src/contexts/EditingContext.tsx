import { createContext, useContext, useState, ReactNode } from 'react';

interface EditingContextType {
  editingMode: boolean;
  setEditingMode: (mode: boolean) => void;
  copyBlock: (content: string, hashtag: string, title: string) => Promise<void>;
}

const EditingContext = createContext<EditingContextType | undefined>(undefined);

export const useEditing = () => {
  const context = useContext(EditingContext);
  if (!context) {
    throw new Error('useEditing must be used within an EditingProvider');
  }
  return context;
};

interface EditingProviderProps {
  children: ReactNode;
}

export const EditingProvider: React.FC<EditingProviderProps> = ({ children }) => {
  const [editingMode, setEditingMode] = useState(false);

  const copyBlock = async (content: string, hashtag: string, title: string) => {
    const fullText = `${content}\n\n${hashtag}\n\nHere's my suggested edited text:\n[Your improved version here]`;
    
    try {
      await navigator.clipboard.writeText(fullText);
      // You can add toast notification here if needed
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <EditingContext.Provider value={{ editingMode, setEditingMode, copyBlock }}>
      {children}
    </EditingContext.Provider>
  );
};