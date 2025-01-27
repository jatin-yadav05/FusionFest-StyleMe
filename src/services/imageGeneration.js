const API_KEY = import.meta.env.VITE_HUGGING_FACE_API;
if (!API_KEY) {
  console.error('Missing Hugging Face API key');
}

export async function generateFashionImage(prompt) {
  try {
    if (!API_KEY) {
      throw new Error('HUGGING_FACE_API environment variable is not defined');
    }

    console.log('Generating image with prompt:', prompt);

    // Using a more reliable model for fashion generation
    const response = await fetch(
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            negative_prompt: "bad quality, blurry, distorted, deformed, ugly, bad anatomy, duplicate, error",
            num_inference_steps: 25,
            guidance_scale: 7.5,
            width: 512,
            height: 768,
            seed: Math.floor(Math.random() * 1000000)
          },
          options: {
            use_cache: false,
            wait_for_model: true
          }
        }),
      }
    );

    // Handle different types of errors
    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = 'Failed to generate image';
      
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.error || errorMessage;
      } catch (e) {
        // If error text is not JSON, use it directly
        errorMessage = errorText || errorMessage;
      }

      if (response.status === 503) {
        throw new Error('Model is currently loading. Please try again in a few moments.');
      }
      if (response.status === 504) {
        throw new Error('Request timed out. Please try with simpler prompt.');
      }
      if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please wait a moment before trying again.');
      }
      if (response.status === 500) {
        throw new Error('Server error. Please try again with different parameters.');
      }

      throw new Error(`API Error: ${errorMessage}`);
    }

    const blob = await response.blob();
    if (!blob || blob.size === 0) {
      throw new Error('Received empty response from the API');
    }

    // Convert blob to base64
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve({
          dataUrl: reader.result,
          blob: blob
        });
      };
      reader.onerror = () => reject(new Error('Failed to convert image'));
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error details:', error);
    
    // Handle specific error cases
    if (error.message.includes('loading')) {
      throw new Error('Model is still loading. Please try again in a few moments.');
    } else if (error.message.includes('timeout')) {
      throw new Error('Request timed out. Try simplifying your prompt.');
    } else if (error.message.includes('quota') || error.message.includes('rate limit')) {
      throw new Error('API quota exceeded. Please try again in a few minutes.');
    } else if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Network error. Please check your internet connection.');
    } else if (error.message.includes('empty response')) {
      throw new Error('Failed to generate image. Please try with different parameters.');
    } else {
      throw new Error(error.message || 'Failed to generate image. Please try again.');
    }
  }
} 