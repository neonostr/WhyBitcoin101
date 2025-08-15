import { createContext, useContext, useState, ReactNode } from 'react';

interface EditModeContextType {
  isEditMode: boolean;
  setIsEditMode: (value: boolean) => void;
  clickCount: number;
  setClickCount: (value: number) => void;
  showInfoModal: boolean;
  setShowInfoModal: (value: boolean) => void;
  copyText: (text: string, hashtag: string) => void;
}

const EditModeContext = createContext<EditModeContextType | undefined>(undefined);

export const useEditMode = () => {
  const context = useContext(EditModeContext);
  if (!context) {
    throw new Error('useEditMode must be used within an EditModeProvider');
  }
  return context;
};

export const EditModeProvider = ({ children }: { children: ReactNode }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [showInfoModal, setShowInfoModal] = useState(false);

  const copyText = (text: string, hashtag: string) => {
    const formattedText = `${text}

---
${hashtag}
Text from whybitcoin101.com

Here's my suggestion for improvement:
[YOUR IMPROVED VERSION]

---
🚀 Join the Bitcoin Education Revolution
• Copy a section from whybitcoin101.com
• Improve it — clearer, stronger, sharper
• Post it to Nostr with tags
• Help build the world’s biggest open Bitcoin FAQ to orange‑pill the world
• Every answer plants a seed of Bitcoin understanding that can reach billions

⚡ Orange‑pilling the world — not with hype, but with truth, connection, and action.

#bitcoineducation #whybitcoin101 #orange-pill #nostr;

    navigator.clipboard.writeText(formattedText).then(() => {
      console.log('Text copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  return (
    <EditModeContext.Provider value={{
      isEditMode,
      setIsEditMode,
      clickCount,
      setClickCount,
      showInfoModal,
      setShowInfoModal,
      copyText
    }}>
      {children}
    </EditModeContext.Provider>
  );
};