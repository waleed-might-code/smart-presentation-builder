import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

interface ComingSoonDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  title?: string;
}

const ComingSoonDialog: React.FC<ComingSoonDialogProps> = ({ 
  open, 
  setOpen,
  title = "Coming Soon" 
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            This feature is coming soon. Stay tuned!
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-6">
          <div className="bg-secondary/50 p-6 rounded-lg text-center">
            <Info className="mx-auto h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">Coming Soon</h3>
            <p className="text-sm text-muted-foreground">
              We're working on bringing you this feature. Check back soon!
            </p>
          </div>
        </div>
        
        <DialogFooter>
          <Button onClick={() => setOpen(false)} className="w-full">
            Got it
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ComingSoonDialog;

