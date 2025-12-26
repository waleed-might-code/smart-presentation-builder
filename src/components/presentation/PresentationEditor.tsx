import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { generatePresentationMarkdown, generatePresentationJson, ensureHttps } from "@/services/presentationApi";
import { templatePrompts, generateCombinedPrompt, themePrompts, layoutPrompts } from "@/lib/promptLibrary";

// Import our components
import Header from "./editor/Header";
import Sidebar from "./editor/Sidebar";
import SlidePreview from "./editor/SlidePreview";
import ExportDialog from "./editor/ExportDialog";

const PresentationEditor = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [title, setTitle] = useState("Untitled Presentation");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [exportLoading, setExportLoading] = useState(false);
  const [exportType, setExportType] = useState<"markdown" | "json">("markdown");
  const [numSlides, setNumSlides] = useState(5);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [incomingSlides, setIncomingSlides] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [selectedLayout, setSelectedLayout] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("generate");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [slides, setSlides] = useState<Array<{ title: string; content: string; image?: string }>>([
    {
      title: "Welcome to Your Presentation",
      content: "Created with SlideAI",
      image: "",
    },
  ]);

  const handleGeneratePresentation = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a topic or description for your presentation");
      return;
    }

    try {
      setLoading(true);
      setIncomingSlides(true);
      
      // Build the final prompt using the prompt library
      const finalPrompt = generateCombinedPrompt(prompt, selectedTemplate, selectedTheme, selectedLayout);
      
      // Call the API to generate the presentation
      const request = {
        topic: finalPrompt,
        num_slides: numSlides
      };
      
      const response = await generatePresentationJson(request);
      
      // Set the download URL which will trigger the PowerPoint preview
      setDownloadUrl(response.download_url);
      setTitle(prompt);
      setLoading(false);
      setIncomingSlides(false);
      setCurrentSlide(0);
      
      toast.success("Presentation generated successfully!");
    } catch (error: any) {
      console.error("Generate error:", error);
      setLoading(false);
      setIncomingSlides(false);
      toast.error(error.message || "Failed to generate presentation. Please try again.");
    }
  };

  const handleExportPowerPoint = async () => {
    try {
      setExportLoading(true);
      
      // Build the final prompt using the prompt library
      const finalPrompt = generateCombinedPrompt(prompt, selectedTemplate, selectedTheme, selectedLayout);
      
      const request = {
        topic: finalPrompt,
        num_slides: numSlides
      };
      
      let response;
      if (exportType === "markdown") {
        response = await generatePresentationMarkdown(request);
      } else {
        response = await generatePresentationJson(request);
      }
      
      console.log("Download URL:", response.download_url);
      setDownloadUrl(response.download_url);
      toast.success("Presentation export successful! Click the link to open your presentation.");
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to export presentation. Please try again.");
    } finally {
      setExportLoading(false);
    }
  };

  const handleSlideChange = (direction: "prev" | "next") => {
    if (direction === "prev" && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    } else if (direction === "next" && currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
  };

  const handleSlideContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    const updatedSlides = [...slides];
    updatedSlides[currentSlide] = {
      ...updatedSlides[currentSlide],
      content: newContent,
    };
    setSlides(updatedSlides);
  };

  const handleSlideTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    const updatedSlides = [...slides];
    updatedSlides[currentSlide] = {
      ...updatedSlides[currentSlide],
      title: newTitle,
    };
    setSlides(updatedSlides);
  };

  const handleSavePresentation = () => {
    toast.success("Presentation saved successfully!");
  };

  const handlePresentationMode = () => {
    const presentationId = "demo";
    navigate(`/present/${presentationId}`, { state: { slides, title } });
  };

  const handleTemplateSelect = (template: string) => {
    setSelectedTemplate(template);
    // If user has a topic, combine it with template. Otherwise just show template style
    if (prompt.trim()) {
      const templatePrompt = templatePrompts[template];
      if (templatePrompt) {
        setPrompt(templatePrompt.replace("{topic}", prompt));
      }
    } else {
      const templatePrompt = templatePrompts[template];
      if (templatePrompt) {
        // Remove {topic} placeholder if no topic exists
        setPrompt(templatePrompt.replace(" {topic}", "").replace("{topic}", ""));
      }
    }
    toast.success(`${template} template selected`);
  };

  const handleThemeSelect = (theme: string) => {
    setSelectedTheme(theme);
    // Switch to generate tab
    setActiveTab("generate");
    // If user has a topic, combine it with theme. Otherwise just show theme style
    if (prompt.trim()) {
      const themePrompt = themePrompts[theme];
      if (themePrompt) {
        setPrompt(themePrompt.replace("{topic}", prompt));
      }
    } else {
      const themePrompt = themePrompts[theme];
      if (themePrompt) {
        // Remove {topic} placeholder if no topic exists
        setPrompt(themePrompt.replace(" {topic}", "").replace("{topic}", ""));
      }
    }
    toast.success(`${theme} theme selected`);
  };

  const handleLayoutSelect = (layout: string) => {
    setSelectedLayout(layout);
    // Switch to generate tab
    setActiveTab("generate");
    // If user has a topic, combine it with layout. Otherwise just show layout style
    if (prompt.trim()) {
      const layoutPrompt = layoutPrompts[layout];
      if (layoutPrompt) {
        setPrompt(layoutPrompt.replace("{topic}", prompt));
      }
    } else {
      const layoutPrompt = layoutPrompts[layout];
      if (layoutPrompt) {
        // Remove {topic} placeholder if no topic exists
        setPrompt(layoutPrompt.replace(" {topic}", "").replace("{topic}", ""));
      }
    }
    toast.success(`${layout} layout selected`);
  };

  return (
    <div className="min-h-screen bg-secondary/20 flex flex-col">
      <Header 
        title={title}
        handleTitleChange={handleTitleChange}
        handleSavePresentation={handleSavePresentation}
        handlePresentationMode={handlePresentationMode}
        setExportDialogOpen={setExportDialogOpen}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar 
          prompt={prompt}
          setPrompt={setPrompt}
          loading={loading}
          handleGeneratePresentation={handleGeneratePresentation}
          setExportDialogOpen={setExportDialogOpen}
          selectedTemplate={selectedTemplate}
          handleTemplateSelect={handleTemplateSelect}
          templatePrompts={templatePrompts}
          selectedTheme={selectedTheme}
          selectedLayout={selectedLayout}
          handleThemeSelect={handleThemeSelect}
          handleLayoutSelect={handleLayoutSelect}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          slides={slides}
          currentSlide={currentSlide}
          setCurrentSlide={setCurrentSlide}
          incomingSlides={incomingSlides}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <SlidePreview 
          slides={slides}
          currentSlide={currentSlide}
          handleSlideChange={handleSlideChange}
          handleSlideTitleChange={handleSlideTitleChange}
          handleSlideContentChange={handleSlideContentChange}
          downloadUrl={downloadUrl}
          sidebarOpen={sidebarOpen}
        />
      </div>

      <ExportDialog 
        exportDialogOpen={exportDialogOpen}
        setExportDialogOpen={setExportDialogOpen}
        exportType={exportType}
        setExportType={setExportType}
        numSlides={numSlides}
        setNumSlides={setNumSlides}
        selectedTemplate={selectedTemplate}
        downloadUrl={downloadUrl}
        exportLoading={exportLoading}
        handleExportPowerPoint={handleExportPowerPoint}
      />

    </div>
  );
};

export default PresentationEditor;
