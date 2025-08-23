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

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const mainUrl = "https://whybitcoin101.com";
  const missionUrl = "https://whybitcoin101.com/mission";
  
  const mainUrlDisplay = "whybitcoin101.com";
  const missionUrlDisplay = "whybitcoin101.com/mission";

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field);
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
    displayUrl,
    field 
  }: { 
    icon: React.ElementType;
    title: string; 
    description: string; 
    url: string; 
    displayUrl: string;
    field: string;
  }) => (
    <div className="space-y-3 p-4 rounded-lg border border-border bg-card">
      <div className="flex items-center gap-2">
        <Icon className="h-5 w-5 text-primary" />
        <h3 className="font-semibold text-foreground">{title}</h3>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
      <div className="flex items-center gap-2 p-2 bg-muted rounded text-sm font-mono text-foreground">
        <span className="flex-1 truncate">{displayUrl}</span>
        <Button
          size="sm"
          variant="outline"
          onClick={() => handleCopy(url, field)}
          className="shrink-0"
        >
          <Copy className="h-3 w-3" />
          {copiedField === field ? "Copied!" : "Copy"}
        </Button>
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Share WhyBitcoin101
          </DialogTitle>
          <DialogDescription>
            Choose the right link for the people you're sending it to.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <ShareOption
            icon={Globe}
            title="For Newcomers"
            description="Perfect for people new to Bitcoin who want to understand why it matters"
            url={mainUrl}
            displayUrl={mainUrlDisplay}
            field="main"
          />

          <ShareOption
            icon={Users}
            title="For Bitcoiners"
            description="Share our mission with fellow Bitcoiners who want to help orange pill the world"
            url={missionUrl}
            displayUrl={missionUrlDisplay}
            field="mission"
          />
        </div>

        <div className="text-center pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Thank you for spreading Bitcoin education! 🧡
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;