/**
 * Prompt library for templates, themes, and layouts
 * These prompts will be used to generate presentations with specific styles
 */

export const templatePrompts: Record<string, string> = {
  Business: "Professional business {topic}",
  Creative: "Creative visual {topic}",
  Education: "Educational training {topic}",
  Minimal: "Minimal clean {topic}"
};

export const themePrompts: Record<string, string> = {
  Modern: "Modern contemporary {topic}",
  Classic: "Classic timeless {topic}",
  Vibrant: "Vibrant energetic {topic}",
  Minimal: "Minimal simple {topic}",
  Bold: "Bold impactful {topic}",
  Elegant: "Elegant refined {topic}"
};

export const layoutPrompts: Record<string, string> = {
  Full: "Full screen {topic}",
  Split: "Split layout {topic}",
  "Image Left": "Image left {topic}",
  "Image Right": "Image right {topic}"
};

/**
 * Generate a combined prompt from topic, template, theme, and layout
 */
export function generateCombinedPrompt(
  topic: string,
  template?: string | null,
  theme?: string | null,
  layout?: string | null
): string {
  let prompt = topic;

  // Apply template if selected
  if (template && templatePrompts[template]) {
    prompt = templatePrompts[template].replace("{topic}", prompt);
  }

  // Add theme specification
  if (theme && themePrompts[theme]) {
    const themePrompt = themePrompts[theme].replace("{topic}", prompt);
    prompt = `${themePrompt} Apply the ${theme.toLowerCase()} theme throughout.`;
  }

  // Add layout specification
  if (layout && layoutPrompts[layout]) {
    const layoutPrompt = layoutPrompts[layout].replace("{topic}", prompt);
    prompt = `${layoutPrompt} Use the ${layout.toLowerCase()} layout style.`;
  }

  return prompt;
}

/**
 * Get a display prompt for a specific option (for populating the prompt field)
 */
export function getPromptForTemplate(topic: string, template: string): string {
  if (templatePrompts[template]) {
    return templatePrompts[template].replace("{topic}", topic || "your topic");
  }
  return topic || "";
}

export function getPromptForTheme(topic: string, theme: string): string {
  if (themePrompts[theme]) {
    return themePrompts[theme].replace("{topic}", topic || "your topic");
  }
  return topic || "";
}

export function getPromptForLayout(topic: string, layout: string): string {
  if (layoutPrompts[layout]) {
    return layoutPrompts[layout].replace("{topic}", topic || "your topic");
  }
  return topic || "";
}

/**
 * Get a combined display prompt (for when multiple options are selected)
 */
export function getCombinedDisplayPrompt(
  topic: string,
  template?: string | null,
  theme?: string | null,
  layout?: string | null
): string {
  const baseTopic = topic || "your topic";
  let prompt = baseTopic;

  // Apply template
  if (template && templatePrompts[template]) {
    prompt = templatePrompts[template].replace("{topic}", prompt);
  }

  // Add theme
  if (theme && themePrompts[theme]) {
    const themeDesc = themePrompts[theme].replace("{topic}", baseTopic);
    prompt = `${prompt} ${themeDesc} Apply ${theme.toLowerCase()} theme.`;
  }

  // Add layout
  if (layout && layoutPrompts[layout]) {
    const layoutDesc = layoutPrompts[layout].replace("{topic}", baseTopic);
    prompt = `${prompt} ${layoutDesc} Use ${layout.toLowerCase()} layout.`;
  }

  return prompt;
}

