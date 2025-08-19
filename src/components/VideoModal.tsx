import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  videoUrl: string;
}

const VideoModal = ({ isOpen, onClose, title, videoUrl }: VideoModalProps) => {
  const { toast } = useToast();

  // Convert YouTube URLs to embed format with autoplay and timestamp
  const getEmbedUrl = (url: string) => {
    let embedUrl = "";
    let timestamp = "";
    
    // Extract timestamp if present
    if (url.includes("t=")) {
      const timeMatch = url.match(/[?&]t=(\d+)/);
      if (timeMatch) {
        timestamp = `&start=${timeMatch[1]}`;
      }
    }
    
    if (url.includes("youtube.com/watch?v=")) {
      const videoId = url.split("v=")[1]?.split("&")[0];
      embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1${timestamp}`;
    } else if (url.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1]?.split("?")[0];
      embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1${timestamp}`;
    } else {
      embedUrl = url; // Return as-is for other embed URLs
    }
    
    return embedUrl;
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}?video=${encodeURIComponent(videoUrl)}&title=${encodeURIComponent(title)}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${title} - Why Bitcoin 101`,
          text: `Check out this video: ${title}`,
          url: shareUrl,
        });
      } catch (error) {
        // User cancelled or error occurred, fallback to clipboard
        copyToClipboard(shareUrl);
      }
    } else {
      copyToClipboard(shareUrl);
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url).then(() => {
      toast({
        title: "Link copied!",
        description: "Share this link to open the video directly",
      });
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="flex-1">{title}</DialogTitle>
          <Button
            onClick={handleShare}
            size="sm"
            variant="outline"
            className="ml-4"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </DialogHeader>
        <div className="aspect-video w-full">
          <iframe
            src={getEmbedUrl(videoUrl)}
            className="w-full h-full rounded-lg"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoModal;