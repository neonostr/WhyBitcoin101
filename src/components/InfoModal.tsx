import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useEditMode } from '@/contexts/EditModeContext';

const InfoModal = () => {
  const { showInfoModal, setShowInfoModal } = useEditMode();

  return (
    <Dialog open={showInfoModal} onOpenChange={setShowInfoModal}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">🚀 Edit Mode Activated</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 text-muted-foreground">
          <p className="text-lg font-medium text-center text-foreground">
            Welcome to the Bitcoin Education Revolution
          </p>
          <p>
            <strong>Together we are building</strong> the most complete open Bitcoin knowledge base on permissionless rails. This library is our toolbox - the source we distill into sharp, impactful, curiosity‑driving content for our education hub. That's where we make Bitcoin click for anyone, anywhere - <strong>the ultimate orange pill</strong>.
          </p>

          <p className="mt-4 font-medium">
            <strong>How it works:</strong>
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Find a section or resource you'd like to improve or expand</li>
            <li>Click Copy - it will include the original text plus a unique hashtag</li>
            <li>Edit your version to make it clearer, sharper, or more inspiring</li>
            <li>Post it to Nostr with the hashtag so it becomes part of the open pool</li>
            <li>Your contribution instantly joins the global stream - viewable, discussable, and reusable by anyone for any project</li>
          </ul>

          <p className="mt-4 text-center italic">
            Every edit makes the orange pill stronger.
          </p>
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