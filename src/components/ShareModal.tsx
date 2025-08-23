import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, Share2, Users, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const { toast } = useToast();

  const mainUrl = "https://whybitcoin101.com";
  const missionUrl = "https://whybitcoin101.com/mission";

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field);
      toast({
        title: "Copied!",
        description: `${text} copied to clipboard`,
      });
      setTimeout(() => setCopiedField(null), 2000);
    });
  };

  const handleClose = () => {
    setCopiedField(null);
    onClose();
  };

  const ShareOption = ({ 
    icon: Icon, 
    title, 
    description, 
    url, 
    field 
  }: { 
    icon: React.ElementType;
    title: string; 
    description: string; 
    url: string; 
    field: string;
  }) => (
    <div className="space-y-4 p-6 rounded-lg border border-border bg-card shadow-sm">
      <div className="flex items-center gap-3">
        <Icon className="h-6 w-6 text-primary" />
        <h3 className="font-semibold text-foreground text-lg">{title}</h3>
      </div>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-3 bg-muted/50 rounded-md border">
        <span className="flex-1 text-sm font-mono text-foreground break-all">{url}</span>
        <Button
          size="sm"
          variant="outline"
          onClick={() => handleCopy(url, field)}
          className="shrink-0 w-full sm:w-auto bg-background hover:bg-accent"
        >
          <Copy className="h-3 w-3 mr-2" />
          {copiedField === field ? "Copied!" : "Copy"}
        </Button>
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg w-[95vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <DialogTitle className="flex items-center gap-2 text-lg">
            <Share2 className="h-5 w-5" />
            Share WhyBitcoin101
          </DialogTitle>
          <DialogDescription className="text-base">
            Choose the right link for your audience
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <ShareOption
            icon={Globe}
            title="For Newcomers"
            description="Perfect for people new to Bitcoin who want to understand why it matters"
            url={mainUrl}
            field="main"
          />

          <ShareOption
            icon={Users}
            title="For Bitcoiners"
            description="Share our mission with fellow Bitcoiners who want to help orange pill the world"
            url={missionUrl}
            field="mission"
          />
        </div>

        <div className="text-center pt-6 mt-6 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Thank you for spreading Bitcoin education! 🧡
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;