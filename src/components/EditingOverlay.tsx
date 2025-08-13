import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EditableBlock {
  id: string;
  hashtag: string;
  title: string;
  content: string;
  element: HTMLElement;
}

interface EditingOverlayProps {
  isActive: boolean;
  onClose: () => void;
}

const EDITABLE_BLOCKS = [
  {
    id: "why-bitcoin-title",
    hashtag: "#bitcoin-purpose-001",
    title: "Why Bitcoin in the First Place?",
    content: "Why Bitcoin in the First Place? To understand Bitcoin, we first need to understand what money should be and why our current system is fundamentally broken."
  },
  {
    id: "what-money-should-be",
    hashtag: "#money-definition-002",
    title: "What Money Should Be",
    content: "Money is fundamentally stored energy. Every time you work or take a financial risk, you exchange your time, effort, and focus for a number in your bank account - a representation of the energy you've invested. Money should allow you to store this energy for future use, so you can later exchange it for things that improve your life: a car, a holiday trip, a home, or simply peace of mind. Good money should reliably preserve the value of your work across time. If you work hard today and save money, that money should at least retain its purchasing power so you can access the same value months or years later when you need it."
  },
  {
    id: "money-is-broken",
    hashtag: "#money-problems-003",
    title: "Money Is Broken",
    content: "Governments and central banks can print currency at will, diluting the value of your hard-earned energy and effectively stealing lifetime from you. As a result, people can no longer rely on it as a dependable store of value. Instead, society has been compelled to seek refuge in real estate, stocks, and other assets as vehicles for savings - roles that rightfully belong to money itself. This distortion has created massive problems: skyrocketing housing costs, inflated asset bubbles, and a world where basic necessities like homes have become unaffordable investments rather than places to live."
  },
  {
    id: "human-cost",
    hashtag: "#social-impact-004",
    title: "The Human Cost",
    content: "When money fails at its basic function of storing value, entire generations suffer. Young families can't afford homes. People delay having children because they can't provide financial security. Communities are displaced as housing becomes a speculative investment rather than a basic human need. This isn't just an economic problem - it's tearing apart the social fabric of society, disrupting families and communities that form the foundation of our civilization."
  },
  {
    id: "money-manipulation",
    hashtag: "#system-manipulation-005",
    title: "The Manipulation of Money",
    content: "To make matters worse, because politicians and central banks have unchecked access to the money supply. When reckless speculators make bad bets and face bankruptcy, they are bailed out with freshly printed money, passing the costs on to the general public through inflation. This system creates a rigged game, where those with connections to the money printer reap the benefits, while ordinary people bear the burden. The result is a perverse incentives structure that prioritizes profit over people, undermining the stability and fairness of our economic system."
  },
  {
    id: "bitcoin-origin",
    hashtag: "#bitcoin-birth-006",
    title: "Bitcoin Was Born From This Crisis",
    content: "In 2008, as the financial system collapsed and banks got bailed out while ordinary people lost their homes, an anonymous creator released Bitcoin - a new form of money that no government or bank could control, inflate, or manipulate. A money system designed to serve people, not politicians or Wall Street."
  },
  {
    id: "what-is-bitcoin",
    hashtag: "#bitcoin-definition-007",
    title: "What is Bitcoin?",
    content: "Bitcoin is money owned by the people that operates without a central authority. It's money that is truly yours, can't be manipulated, and can be sent directly to anyone in the world"
  },
  {
    id: "how-bitcoin-works",
    hashtag: "#bitcoin-mechanics-008",
    title: "How Does It Work?",
    content: "Bitcoin securely records all transactions in a public record book distributed globally. A unique system ensures the record can't be altered, eliminating the need for banks or other intermediaries."
  },
  {
    id: "why-special",
    hashtag: "#bitcoin-features-009",
    title: "Why Is It Special?",
    content: "Built by the people, free from control, Bitcoin is the world's most scarce asset. Limited to 21 million, it's designed to be perfect money - a secure store of your time and energy."
  },
  {
    id: "bitcoin-for-everyone",
    hashtag: "#bitcoin-accessibility-010",
    title: "Bitcoin is for Everyone",
    content: "Just as one U.S. Dollar equals 100 cents, one Bitcoin equals 100 million satoshis. This divisibility means you can get involved with Bitcoin starting with any amount - even $1."
  },
  {
    id: "society-worth-building",
    hashtag: "#future-society-011",
    title: "A Society Worth Building",
    content: "When money holds its value across time, people naturally start planning for decades, not months. Cities are built to last centuries. Companies invest in research that might take years to bear fruit. Education focuses on wisdom, not just skills for the next job cycle. This isn't utopian thinking - it's how humanity operated for most of history before inflationary money shortened our collective attention span."
  },
  {
    id: "quality-over-quantity",
    hashtag: "#content-quality-012",
    title: "Quality Over Quantity",
    content: "Our educational resources are carefully curated, no affiliate links, no hidden agendas, just the best content we can find. We update this collection constantly because understanding Bitcoin means understanding the future of human coordination. Every book, video, podcast, and article is selected purely for its quality and insight. This knowledge belongs to everyone."
  }
];

const EditingOverlay: React.FC<EditingOverlayProps> = ({ isActive, onClose }) => {
  const [selectedBlock, setSelectedBlock] = useState<EditableBlock | null>(null);
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  const copyToClipboard = async (text: string, hashtag: string, blockId: string) => {
    const fullText = `${text}\n\n${hashtag}\n\nHere's my suggested edited text:\n[Your improved version here]`;
    
    try {
      await navigator.clipboard.writeText(fullText);
      setCopiedStates(prev => ({ ...prev, [blockId]: true }));
      
      toast({
        title: "Copied to clipboard!",
        description: `Text block ${hashtag} copied with collaboration template`,
      });
      
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [blockId]: false }));
      }, 2000);
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Please try again",
        variant: "destructive"
      });
    }
  };

  // Add click handlers to content blocks when editing mode is active
  useEffect(() => {
    if (!isActive) return;

    const handleBlockClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const blockElement = target.closest('[data-block-id]') as HTMLElement;
      
      if (blockElement) {
        const blockId = blockElement.getAttribute('data-block-id');
        const hashtag = blockElement.getAttribute('data-hashtag');
        const block = EDITABLE_BLOCKS.find(b => b.id === blockId);
        
        if (block && hashtag) {
          event.preventDefault();
          copyToClipboard(block.content, hashtag, blockId);
        }
      }
    };

    document.addEventListener('click', handleBlockClick);
    
    return () => {
      document.removeEventListener('click', handleBlockClick);
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <>
      {/* Global styles for editing mode */}
      <style>{`
        body.editing-mode-active [data-block-id] {
          position: relative;
          cursor: pointer !important;
          transition: all 0.2s ease;
        }
        body.editing-mode-active [data-block-id]:hover {
          transform: scale(1.02);
          z-index: 10;
        }
        body.editing-mode-active [data-block-id]:hover::after {
          content: '';
          position: absolute;
          inset: -8px;
          border: 3px solid hsl(var(--primary));
          border-radius: 12px;
          background: hsl(var(--primary) / 0.1);
          pointer-events: none;
          z-index: 1;
          animation: pulse 2s infinite;
        }
        body.editing-mode-active [data-block-id]:hover::before {
          content: attr(data-hashtag);
          position: absolute;
          top: -12px;
          left: -8px;
          background: hsl(var(--primary));
          color: hsl(var(--primary-foreground));
          font-size: 11px;
          padding: 4px 8px;
          border-radius: 6px;
          font-weight: 600;
          z-index: 12;
          pointer-events: none;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.2; }
        }
      `}</style>
      
      <div className="fixed inset-0 z-[9999] bg-black/30 backdrop-blur-sm">
        <div className="absolute top-4 right-4">
          <Button onClick={onClose} variant="outline" className="bg-background">
            Exit Editing Mode
          </Button>
        </div>
        
        <div className="absolute top-16 left-4 right-4 bg-background/95 backdrop-blur-sm border border-border rounded-lg p-4">
          <h3 className="text-lg font-bold mb-2">Collaborative Editing Mode</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Click on any highlighted text block below or directly on the page content to copy it with its hashtag for collaborative editing on Nostr.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 max-h-60 overflow-y-auto">
            {EDITABLE_BLOCKS.map((block) => (
              <div
                key={block.id}
                className="border border-border/50 rounded-lg p-3 hover:bg-accent/50 cursor-pointer transition-colors"
                onClick={() => copyToClipboard(block.content, block.hashtag, block.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium truncate">{block.title}</h4>
                  {copiedStates[block.id] ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground mb-1">{block.hashtag}</p>
                <p className="text-xs text-muted-foreground line-clamp-2">{block.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default EditingOverlay;