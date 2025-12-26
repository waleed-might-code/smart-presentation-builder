
/**
 * Service for communicating with the AI Presentation Generator API
 */

// Use proxy in development, direct URL in production
const API_BASE_URL = import.meta.env.DEV 
  ? '/api' 
  : 'https://pptx.techrealm.online';

export interface GeneratePresentationRequest {
  topic: string;
  num_slides?: number;
}

export interface GeneratePresentationResponse {
  download_url: string;
}

/**
 * Converts HTTP URLs to HTTPS
 * @param url URL string that might be HTTP
 * @returns The same URL with HTTPS protocol
 */
export const ensureHttps = (url: string): string => {
  if (url.startsWith('http:')) {
    return url.replace('http:', 'https:');
  }
  return url;
};

/**
 * Generate a presentation using the markdown endpoint
 * @param request Request parameters including topic and optional num_slides
 * @returns Response with download URL
 */
export const generatePresentationMarkdown = async (
  request: GeneratePresentationRequest
): Promise<GeneratePresentationResponse> => {
  try {
    console.log('Sending request to markdown endpoint:', request);
    const response = await fetch(`${API_BASE_URL}/generate-presentation/markdown`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      // Try to get error details from response body
      let errorMessage = `API error: ${response.status} ${response.statusText}`;
      try {
        const errorData = await response.text();
        if (errorData) {
          errorMessage += ` - ${errorData}`;
        }
      } catch (e) {
        // If we can't read the error body, use the status
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log('API response:', data);
    
    return data;
  } catch (error) {
    console.error('Error generating presentation:', error);
    throw error;
  }
};

/**
 * Generate a presentation using the JSON endpoint
 * @param request Request parameters including topic and optional num_slides
 * @returns Response with download URL
 */
export const generatePresentationJson = async (
  request: GeneratePresentationRequest
): Promise<GeneratePresentationResponse> => {
  try {
    console.log('Sending request to JSON endpoint:', request);
    const response = await fetch(`${API_BASE_URL}/generate-presentation/json`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      // Try to get error details from response body
      let errorMessage = `API error: ${response.status} ${response.statusText}`;
      try {
        const errorData = await response.text();
        if (errorData) {
          errorMessage += ` - ${errorData}`;
        }
      } catch (e) {
        // If we can't read the error body, use the status
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log('API response:', data);
    
    return data;
  } catch (error) {
    console.error('Error generating presentation:', error);
    throw error;
  }
};
