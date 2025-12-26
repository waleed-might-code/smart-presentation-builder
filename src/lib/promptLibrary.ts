/**
 * Prompt library for templates, themes, and layouts
 * These prompts will be used to generate presentations with specific styles
 */

export const templatePrompts: Record<string, string> = {
  Business: "Create a professional business presentation about {topic}. Include sections for executive summary, market analysis, competitive landscape, strategy, implementation plan, and financial projections.",
  Creative: "Design a visually engaging and creative presentation about {topic}. Use metaphors, storytelling elements, and compelling visuals to create an inspiring narrative that captures imagination.",
  Education: "Develop an educational presentation about {topic} suitable for classroom or training environments. Structure it with clear learning objectives, key concepts, examples, practice opportunities, and assessment questions.",
  Minimal: "Create a clean, minimalist presentation about {topic} with concise text, ample white space, and only essential visuals. Focus on key messages with no more than 5 bullet points per slide."
};

export const themePrompts: Record<string, string> = {
  Modern: "Create a modern presentation about {topic} with contemporary design elements, sleek typography, and a fresh color palette. Use clean lines, subtle gradients, and modern icons.",
  Classic: "Design a classic, timeless presentation about {topic} with traditional layouts, serif fonts, and elegant color schemes. Emphasize professionalism and sophistication.",
  Vibrant: "Build a vibrant, energetic presentation about {topic} with bold colors, dynamic layouts, and eye-catching visuals. Use high-contrast color combinations and lively graphics.",
  Minimal: "Create a minimalist presentation about {topic} with a clean, simple design, plenty of white space, and focused content. Use minimal colors and simple typography.",
  Bold: "Design a bold, impactful presentation about {topic} with strong visual hierarchy, powerful typography, and striking design elements. Make a strong statement with confident design choices.",
  Elegant: "Craft an elegant, refined presentation about {topic} with sophisticated design elements, graceful layouts, and a refined color palette. Focus on beauty and refinement."
};

export const layoutPrompts: Record<string, string> = {
  Full: "Create a full-bleed presentation about {topic} with content spanning edge to edge. Use immersive visuals and maximize the use of screen space for impactful delivery.",
  Split: "Design a split-screen presentation about {topic} with content divided into distinct sections. Balance text and visuals across the layout for clear communication.",
  "Image Left": "Build a presentation about {topic} with images positioned on the left side of each slide. Place text content on the right for a balanced, visual-first approach.",
  "Image Right": "Create a presentation about {topic} with images positioned on the right side of each slide. Place text content on the left for optimal readability and visual balance."
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

