import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, Check, QrCode } from "lucide-react";
import QRCode from "qrcode";
interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const DonationModal = ({
  isOpen,
  onClose
}: DonationModalProps) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [qrCodes, setQrCodes] = useState<{
    lightning: string | null;
    onchain: string | null;
  }>({
    lightning: null,
    onchain: null
  });
  const lightningAddress = "bitcoinbasics@coinos.io";
  const onchainAddress = "bc1q0mznrxrgmctjmzf7lchnxnv0tlpfyuj03yqrtm";
  const handleCopy = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };
  const generateQR = async (text: string, type: 'lightning' | 'onchain') => {
    try {
      const qrDataUrl = await QRCode.toDataURL(text, {
        width: 200,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
      setQrCodes(prev => ({
        ...prev,
        [type]: qrDataUrl
      }));
    } catch (err) {
      console.error('Failed to generate QR code:', err);
    }
  };
  const PaymentOption = ({
    title,
    address,
    description,
    type
  }: {
    title: string;
    address: string;
    description: string;
    type: 'lightning' | 'onchain';
  }) => <div className="space-y-4 p-6 rounded-lg border border-border bg-card">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="flex-1 p-3 bg-muted rounded-md font-mono text-sm break-all">
            {address}
          </div>
          <Button variant="outline" size="sm" onClick={() => handleCopy(address, type)} className="flex-shrink-0">
            {copiedField === type ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>

        <Button variant="secondary" size="sm" onClick={() => generateQR(address, type)} className="w-full">
          <QrCode className="h-4 w-4 mr-2" />
          Generate QR Code
        </Button>

        {qrCodes[type] && <div className="flex justify-center pt-2">
            <img src={qrCodes[type]!} alt={`${title} QR Code`} className="border rounded-lg" />
          </div>}
      </div>
    </div>;
  return <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-foreground">
            Support Bitcoin Basics
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="text-center">
            <p className="text-muted-foreground">Help us continue providing free Bitcoin education resources.</p>
          </div>

          <div className="grid gap-6">
            <PaymentOption title="⚡ Lightning Network" address={lightningAddress} description="Fast and low-fee payments via Lightning Network" type="lightning" />

            <PaymentOption title="₿ On-Chain Bitcoin" address={onchainAddress} description="Traditional Bitcoin network payment" type="onchain" />
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>Thank you for supporting open Bitcoin education! 🧡</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>;
};
export default DonationModal;