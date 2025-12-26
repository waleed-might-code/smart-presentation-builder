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
 * Returns a short, concise topic string (max ~5 words) for filename usage
 */
export function generateCombinedPrompt(
  topic: string,
  template?: string | null,
  theme?: string | null,
  layout?: string | null
): string {
  // Start with just the topic (user's input)
  let prompt = topic.trim();

  // Build a short combined string with selected options
  const parts: string[] = [];
  
  // Add template style
  if (template && templatePrompts[template]) {
    const templateStyle = templatePrompts[template].replace("{topic}", "").trim();
    parts.push(templateStyle);
  }
  
  // Add theme style
  if (theme && themePrompts[theme]) {
    const themeStyle = themePrompts[theme].replace("{topic}", "").trim();
    parts.push(themeStyle);
  }
  
  // Add layout style
  if (layout && layoutPrompts[layout]) {
    const layoutStyle = layoutPrompts[layout].replace("{topic}", "").trim();
    parts.push(layoutStyle);
  }

  // Combine: if user has topic, use it. Otherwise use style descriptors
  if (prompt) {
    // If styles are selected, prepend them to topic
    if (parts.length > 0) {
      prompt = `${parts.join(" ")} ${prompt}`;
    }
  } else if (parts.length > 0) {
    // No topic, just use the style descriptors
    prompt = parts.join(" ");
  }

  return prompt.trim();
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

