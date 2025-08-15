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
🧡 We’re building the ultimate orange pill

Layer 1:
The Open Flood: All Bitcoin knowledge and discussion is happening on Nostr — permissionless, uncensorable, unstoppable — and connected through the unifying hashtag #whybitcoin101 so every contribution becomes part of the bigger picture.

Layer 2:
The Signal: @npub1uuhsm53er3xxkq90up6gt2wg5vhaz0aenlw4m4rls04thf24heuq8vf4yh works as a collective signal — linking efforts, amplifying the best insights, and making Bitcoin knowledge easier to discover.

Layer 3:
The Pill: The very best is distilled on whybitcoin101.com — into the ultimate Bitcoin orange pill, designed to reach anyone, anywhere.

Final Step:
The world understands Bitcoin. The world changes.

Get Involved:
• Copy a section from whybitcoin101.com
• Improve it - clearer, stronger, sharper
• Post it to Nostr
• Help refine the orange pill that will wake the world

True Bitcoin education - not hype, but truth, connection, and action.

#bitcoineducation #whybitcoin101 #orange-pill #nostr`

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