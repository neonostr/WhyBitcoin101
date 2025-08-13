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
[EDUCATOR'S IMPROVED VERSION]

---
🚀 Join the global Bitcoin education revolution!
• Copy any section from whybitcoin101.com with its hashtag
• Post your improvements to Nostr
• Help build the world's largest Bitcoin FAQ on permissionless rails
• One answer can reach billions of people worldwide

This is how we orange-pill the world together - not with hype, but with truth, connection, and action.

#bitcoineducation #nostr #whybitcoin101 #orange-pill`;

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