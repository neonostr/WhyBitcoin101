import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useEditMode } from '@/contexts/EditModeContext';

const InfoModal = () => {
  const { showInfoModal, setShowInfoModal } = useEditMode();

  return (
    <Dialog open={showInfoModal} onOpenChange={setShowInfoModal}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">🚀 Edit Mode Activated!</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 text-muted-foreground">
          <p className="text-lg font-medium text-center text-foreground">
            Welcome to the Bitcoin Education Revolution
          </p>
          
          <div className="space-y-3">
            <p>
              You’re now part of a mission to <em>orange‑pill the world — not with hype, but with truth, connection, and action</em>.
            </p>

            <p>
              <strong>Together we are</strong> building the most complete open Bitcoin knowledge base on permissionless rails.
              <strong> But this isn’t the final goal.</strong> This library is our toolbox — the source we distill into
              <strong> sharp, impactful, curiosity‑driving content</strong> for our education hub. That’s where we make Bitcoin
              click for anyone, anywhere — <strong>the ultimate orange pill</strong>.
            </p>
            
            <p className="mt-4">
              <strong>What you can do:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Click "Copy" buttons on any text section or resource</li>
              <li>Each copy includes the original text plus a unique hashtag</li>
              <li>Edit your version to make it clearer, sharper, or more inspiring</li>
              <li>Post your improved version to Nostr with the hashtag</li>
              <li>Help build the world's largest Bitcoin FAQ on permissionless rails</li>
            </ul>
            
            <p className="mt-4">
              <strong>How it works:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Copy any section you want to improve</li>
              <li>The text includes a template for your suggestions</li>
              <li>Post to Nostr with the hashtag — we monitor all submissions</li>
              <li>If your version is better, we'll update the content!</li>
            </ul>
            
            <p className="mt-4 text-center italic">
              "This is how we orange‑pill the world together — not with hype, but with truth, connection, and action."
            </p>
          </div>
          
          <div className="flex justify-center gap-4 pt-4">
            <Button onClick={() => setShowInfoModal(false)} className="bg-primary text-primary-foreground">
              Start Editing
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InfoModal;