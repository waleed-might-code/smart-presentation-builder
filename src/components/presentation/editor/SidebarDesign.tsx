
import React from "react";
import { Button } from "@/components/ui/button";
import { Layout, ImageIcon } from "lucide-react";

interface SidebarDesignProps {
  selectedTheme: string | null;
  selectedLayout: string | null;
  handleThemeSelect: (theme: string) => void;
  handleLayoutSelect: (layout: string) => void;
}

const themes = ["Modern", "Classic", "Vibrant", "Minimal", "Bold", "Elegant"];
const layouts = ["Full", "Split", "Image Left", "Image Right"];

const SidebarDesign: React.FC<SidebarDesignProps> = ({
  selectedTheme,
  selectedLayout,
  handleThemeSelect,
  handleLayoutSelect,
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <h3 className="text-sm font-medium mb-1">Theme</h3>
        <div className="grid grid-cols-3 gap-2">
          {themes.map((theme) => (
            <Button
              key={theme}
              variant={selectedTheme === theme ? "default" : "outline"}
              size="sm"
              className="h-auto py-2 justify-start"
              onClick={() => handleThemeSelect(theme)}
            >
              {theme}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="space-y-1 pt-4 border-t border-border">
        <h3 className="text-sm font-medium mb-3">Layout</h3>
        <div className="grid grid-cols-2 gap-2">
          {layouts.map((layout) => {
            const isImageLayout = layout.includes("Image");
            const icon = isImageLayout ? ImageIcon : Layout;
            const Icon = icon;
            return (
              <Button
                key={layout}
                variant={selectedLayout === layout ? "default" : "outline"}
                size="sm"
                className="h-auto py-1.5 justify-start gap-2"
                onClick={() => handleLayoutSelect(layout)}
              >
                <Icon size={16} />
                {layout}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SidebarDesign;
