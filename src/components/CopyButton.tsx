import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEditMode } from '@/contexts/EditModeContext';
import { useToast } from '@/hooks/useToast';

interface CopyButtonProps {
  text: string;
  hashtag: string;
  className?: string;
}

const CopyButton = ({ text, hashtag, className = "" }: CopyButtonProps) => {
  const { isEditMode, copyText } = useEditMode();
  const { toast } = useToast();

  if (!isEditMode) return null;

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    copyText(text, hashtag);
    toast({
      title: "Copied!",
      description: `Text copied with ${hashtag}`,
    });
  };

  return (
    <Button
      onClick={handleCopy}
      size="sm"
      variant="outline"
      className={`absolute top-2 right-2 z-10 bg-background/90 backdrop-blur-sm border-primary/50 hover:bg-primary hover:text-primary-foreground transition-all duration-200 ${className}`}
    >
      <Copy className="h-3 w-3 mr-1" />
      Copy
    </Button>
  );
};

export default CopyButton;