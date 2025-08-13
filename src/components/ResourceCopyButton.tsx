import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEditMode } from '@/contexts/EditModeContext';
import { useToast } from '@/hooks/use-toast';

interface ResourceCopyButtonProps {
  title: string;
  description: string;
  type: string;
  url: string;
  author?: string;
  host?: string;
  hashtag: string;
}

const ResourceCopyButton = ({ title, description, type, url, author, host, hashtag }: ResourceCopyButtonProps) => {
  const { isEditMode, copyText } = useEditMode();
  const { toast } = useToast();

  if (!isEditMode) return null;

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    let resourceText = `${title}\n`;
    if (author) resourceText += `by ${author}\n`;
    if (host) resourceText += `Hosted by ${host}\n`;
    resourceText += `Type: ${type}\n`;
    resourceText += `Description: ${description}\n`;
    resourceText += `URL: ${url}`;

    copyText(resourceText, hashtag);
    toast({
      title: "Resource Copied!",
      description: `${title} copied with ${hashtag}`,
    });
  };

  return (
    <Button
      onClick={handleCopy}
      size="sm"
      variant="outline"
      className="absolute top-2 right-2 z-10 bg-background/90 backdrop-blur-sm border-primary/50 hover:bg-primary hover:text-primary-foreground transition-all duration-200"
    >
      <Copy className="h-3 w-3 mr-1" />
      Copy
    </Button>
  );
};

export default ResourceCopyButton;