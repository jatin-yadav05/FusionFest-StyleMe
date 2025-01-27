import React, { useState, useRef, useEffect } from 'react'
import { Button } from "../components/ui/button"
import { Textarea } from "../components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select"
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group"
import { Label } from "../components/ui/label"
import { Wand2, ChevronRight, ChevronLeft, X, Upload, ArrowLeft, User } from "lucide-react"
import { generateFashionImage } from '../services/imageGeneration'
import { client } from "@gradio/client";

const GARMENT_TYPES = {
  tops: [
    'T-shirt', 'Shirt', 'Blouse', 'Sweater', 'Jacket',
    'Hoodie', 'Tank Top', 'Crop Top', 'Blazer', 'Cardigan'
  ],
  bottoms: [
    'Jeans', 'Trousers', 'Skirt', 'Shorts', 'Leggings',
    'Palazzo Pants', 'Cargo Pants', 'Mini Skirt', 'Maxi Skirt', 'Culottes'
  ],
  dresses: [
    'Summer Dress', 'Evening Gown', 'Casual Dress', 'Cocktail Dress',
    'Maxi Dress', 'Mini Dress', 'Party Dress', 'Wedding Dress'
  ],
  outerwear: [
    'Leather Jacket', 'Denim Jacket', 'Winter Coat', 'Blazer',
    'Cardigan', 'Bomber Jacket', 'Trench Coat', 'Puffer Jacket'
  ]
};

const COLORS = [
  'Black', 'White', 'Red', 'Blue', 'Green',
  'Yellow', 'Purple', 'Pink', 'Brown', 'Gray'
];

const PATTERNS = [
  'Solid', 'Striped', 'Floral', 'Checked', 'Polka Dot',
  'Abstract', 'Geometric', 'Animal Print', 'Tie-dye', 'Plain'
];

// Add this loader component at the top of your file
const GarmentLoader = ({ progress }) => (
  <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-20">
    <div className="flex flex-col items-center">
      {/* DNA Helix Animation */}
      <div className="relative w-24 h-24 mb-6">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-white rounded-full"
            style={{
              left: '50%',
              top: '50%',
              transform: `rotate(${i * 45}deg) translateY(-20px)`,
              animation: `garmentLoaderDot 2s infinite ease-in-out`,
              animationDelay: `${i * 0.25}s`,
              opacity: 0.2 + (i * 0.1)
            }}
          />
        ))}
        {/* Center Circle */}
        <div className="absolute inset-0 m-auto w-4 h-4 bg-white rounded-full animate-pulse" />
      </div>

      {/* Progress Text */}
      <div className="text-center space-y-3">
        <div className="text-2xl font-semibold bg-gradient-to-r from-white via-zinc-400 to-white text-transparent bg-clip-text">
          Generating Design
        </div>
        <div className="text-zinc-400 text-sm">
          {progress < 30 && "Analyzing requirements..."}
          {progress >= 30 && progress < 60 && "Creating patterns..."}
          {progress >= 60 && progress < 90 && "Adding details..."}
          {progress >= 90 && "Finalizing design..."}
        </div>
        <div className="text-xl font-medium text-white">
          {Math.round(progress)}%
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-48 h-1 bg-zinc-800 rounded-full mt-4 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-white via-zinc-400 to-white transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  </div>
);

// Add this CSS to your global styles or in a style tag
const styles = `
  @keyframes garmentLoaderDot {
    0%, 100% { transform: rotate(var(--rotation)) translateY(-20px) scale(0.6); opacity: 0.4; }
    50% { transform: rotate(var(--rotation)) translateY(-20px) scale(1); opacity: 1; }
  }
`;

function Generate() {
  // Step management
  const [currentStep, setCurrentStep] = useState('design'); // 'design' | 'tryon'

  // Form and generation states
  const [promptData, setPromptData] = useState({
    category: 'tops',
    gender: 'male',
    garmentType: '',
    color: '',
    pattern: '',
    additionalDetails: ''
  });

  const [fabric, setFabric] = useState('cotton')
  const [description, setDescription] = useState('')
  const [generatedDesign, setGeneratedDesign] = useState(null)
  const [modelImage, setModelImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [progress, setProgress] = useState(0)

  const modelInputRef = useRef(null)

  // Sample wardrobe data with real image URLs
  const wardrobe = {
    tops: [
      {
        id: 1,
        name: 'Classic White T-Shirt',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop'
      },
      {
        id: 2,
        name: 'Black Blouse',
        image: 'https://images.unsplash.com/photo-1624206112918-f140f087f9b5?w=500&h=500&fit=crop'
      },
      {
        id: 3,
        name: 'Striped Shirt',
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&h=500&fit=crop'
      },
    ],
    bottoms: [
      {
        id: 4,
        name: 'Blue Jeans',
        image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop'
      },
      {
        id: 5,
        name: 'Black Skirt',
        image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=500&h=500&fit=crop'
      },
      {
        id: 6,
        name: 'Khaki Pants',
        image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&h=500&fit=crop'
      },
    ],
    dresses: [
      {
        id: 7,
        name: 'Summer Dress',
        image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=500&fit=crop'
      },
      {
        id: 8,
        name: 'Evening Gown',
        image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=500&h=500&fit=crop'
      },
      {
        id: 9,
        name: 'Casual Dress',
        image: 'https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=500&h=500&fit=crop'
      },
    ],
    outerwear: [
      {
        id: 10,
        name: 'Leather Jacket',
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop'
      },
      {
        id: 11,
        name: 'Denim Jacket',
        image: 'https://images.unsplash.com/photo-1578932750294-f5075e85f44a?w=500&h=500&fit=crop'
      },
      {
        id: 12,
        name: 'Winter Coat',
        image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=500&h=500&fit=crop'
      },
    ]
  }

  // Add this near the top of your component
  useEffect(() => {
    const API_KEY = import.meta.env.VITE_HUGGING_FACE_API;
    console.log('API Key available:', !!API_KEY); // Will log true/false without exposing the key
  }, []);

  // Validation function
  const validateDesignInputs = () => {
    console.log('Validating inputs:', { promptData, fabric }); // Debug log

    if (!promptData.category) {
      setError('Please select a category');
      return false;
    }
    if (!promptData.garmentType) {
      setError('Please select a garment type');
      return false;
    }
    if (!promptData.color) {
      setError('Please select a color');
      return false;
    }
    if (!promptData.pattern) {
      setError('Please select a pattern');
      return false;
    }
    if (!fabric) {
      setError('Please select a fabric');
      return false;
    }

    console.log('Validation passed'); // Debug log
    return true;
  };

  // Handle form changes
  const handlePromptChange = (field, value) => {
    setError(null); // Clear any existing errors
    setPromptData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle model image upload
  const handleModelUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setModelImage({
        file,
        preview: reader.result
      });
      setError(null);
    };
    reader.onerror = () => {
      setError('Failed to read image file');
    };
    reader.readAsDataURL(file);
  };

  // Generate design
  const handleGenerateDesign = async () => {
    console.log('Generate button clicked'); // Debug log

    if (!validateDesignInputs()) {
      console.log('Validation failed:', error); // Debug log
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setProgress(0);

      const enhancedPrompt = constructPrompt();
      console.log('Starting generation with prompt:', enhancedPrompt);

      // Progress simulation
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 95) return prev;
          const increment = Math.random() * 15;
          return Math.min(prev + increment, 95);
        });
      }, 1000);

      // Add explicit error handling for API call
      let result;
      try {
        result = await generateFashionImage(enhancedPrompt);
        console.log('API Response:', result); // Debug log
      } catch (apiError) {
        console.error('API Error:', apiError);
        throw apiError;
      }

      clearInterval(progressInterval);

      if (!result?.dataUrl) {
        throw new Error('Failed to generate image. Please try again.');
      }

      console.log('Setting generated design'); // Debug log
      setGeneratedDesign({
        id: Date.now(),
        name: `${promptData.color} ${promptData.garmentType}`,
        image: result.dataUrl
      });

      // Success notification
      console.log('Design generated successfully!');

      // When generation is complete
      setProgress(100);
      setTimeout(() => {
        setProgress(0);
        setLoading(false);
      }, 500);

    } catch (err) {
      console.error('Generation error details:', err);
      setError(err.message || 'Failed to generate design. Please try again.');
      setProgress(0);
    }
  };

  // Add state for try-on result
  const [tryOnResult, setTryOnResult] = useState(null);

  // Add retryCount state
  const [retryCount, setRetryCount] = useState(0);

  // Add these helper functions
  const resizeImage = async (file, maxSize) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          // Calculate new dimensions while maintaining aspect ratio
          if (width > height) {
            if (width > maxSize) {
              height = Math.round((height * maxSize) / width);
              width = maxSize;
            }
          } else {
            if (height > maxSize) {
              width = Math.round((width * maxSize) / height);
              height = maxSize;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob((blob) => {
            resolve(blob);
          }, 'image/jpeg', 0.95);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  // Update the handleTryOn function to show only the try-on result
  const handleTryOn = async (denosingSteps = 20) => {
    if (!modelImage || !generatedDesign) {
      setError('Please upload both model and garment images');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setTryOnResult(null);
      setProgress(0);

      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 5;
        });
      }, 500);

      // Handle model image
      let modelBlob;
      if (modelImage.file) {
        modelBlob = await resizeImage(modelImage.file, 768);
      } else {
        const response = await fetch(modelImage.preview);
        modelBlob = await response.blob();
      }

      // Handle generated design image
      let garmentBlob;
      if (generatedDesign.file) {
        garmentBlob = await resizeImage(generatedDesign.file, 768);
      } else {
        const response = await fetch(generatedDesign.image);
        garmentBlob = await response.blob();
      }

      const app = await client("yisol/IDM-VTON", {
        hf_token: import.meta.env.VITE_HUGGING_FACE_API
      });

      const result = await app.predict("/tryon", [
        { "background": modelBlob, "layers": [], "composite": null },
        garmentBlob,
        "Virtual Try-On Test",
        true,
        true,
        denosingSteps,
        42
      ]);

      if (result.data) {
        // Only process and show the try-on result (first image)
        const response = await fetch(result.data[0].url);
        const blob = await response.blob();
        setTryOnResult({
          url: URL.createObjectURL(blob),
          blob
        });
        setRetryCount(0);
      }

      clearInterval(progressInterval);
      setProgress(100);
      setTimeout(() => setProgress(0), 1000);
    } catch (err) {
      console.error('Error in virtual try-on:', err);

      if (err.message.includes('GPU quota')) {
        const waitTime = err.message.match(/Please retry in (\d+:\d+:\d+)/)?.[1];
        setError(`GPU quota exceeded. Please wait ${waitTime || 'some time'} before trying again.`);
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Reset all states
  const handleReset = () => {
    setPromptData({
      category: 'tops',
      gender: 'male',
      garmentType: '',
      color: '',
      pattern: '',
      additionalDetails: ''
    });
    setDescription('');
    setGeneratedDesign(null);
    setModelImage(null);
    setError(null);
    setProgress(0);
    setCurrentStep('design');
  };

  const constructPrompt = () => {
    const { category, gender, garmentType, color, pattern } = promptData;

    if (!garmentType || !color) {
      throw new Error('Missing required design parameters');
    }

    // Base prompt with essential details
    let prompt = `high-quality fashion photography of a ${color.toLowerCase()} ${garmentType.toLowerCase()}`;

    // Add gender specification
    prompt += ` for ${gender}`;

    // Add fabric if selected
    if (fabric) {
      prompt += `, made of ${fabric} fabric`;
    }

    if (category === 'tops') {
      prompt += `, for ${gender}`;
    } else if (category === 'bottoms') {
      prompt += `, for ${gender}`;
    } else if (category === 'accessories') {
      prompt += `, for ${gender}`;
    } else if (category === 'outerwear') {
      prompt += `, for ${gender}`;
    }

    // Add pattern if selected and not plain
    if (pattern && pattern !== 'Plain') {
      prompt += `, with ${pattern.toLowerCase()} pattern`;
    }

    // Add description if provided
    if (description?.trim()) {
      prompt += `, ${description.trim()}`;
    }

    // Add quality enhancers
    prompt += `, professional studio lighting, clean background, high-end fashion magazine style`;

    // Add negative prompts
    prompt += ` --negative low quality, blurry, distorted, deformed, ugly, bad anatomy`;

    console.log('Generated prompt:', prompt);
    return prompt;
  };

  // Add this to your existing state declarations
  const [showModelSelector, setShowModelSelector] = useState(false);

  // Add this with your other state declarations at the top of the component
  const [selectedGender, setSelectedGender] = useState('male'); // Default to male

  // Update the PRE_EXISTING_MODELS constant with real image URLs
  const PRE_EXISTING_MODELS = {
    female: [
      {
        id: 'f1',
        name: 'Female Model 1',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=700&fit=crop'
      },
      {
        id: 'f2',
        name: 'Female Model 2',
        image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500&h=700&fit=crop'
      },
      {
        id: 'f3',
        name: 'Female Model 3',
        image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=500&h=700&fit=crop'
      }
    ],
    male: [
      {
        id: 'm1',
        name: 'Male Model 1',
        image: 'src/assets/images/home/male-model-1.jpg'
      },
      {
        id: 'm2',
        name: 'Male Model 2',
        image: 'src/assets/images/home/male-model-2.jpg'
      },
      {
        id: 'm3',
        name: 'Male Model 3',
        image: 'src/assets/images/home/male-model-3.jpeg'
      }
    ]
  };

  // Update handleModelSelect to fetch and create a file from the URL
  const handleModelSelect = async (modelImage) => {
    try {
      // Fetch the image and convert to blob
      const response = await fetch(modelImage);
      const blob = await response.blob();

      // Create a File object from the blob
      const file = new File([blob], 'model-image.jpg', { type: 'image/jpeg' });

      setModelImage({
        preview: modelImage,
        file: file // Now we have a proper file object
      });
      setShowModelSelector(false);
    } catch (err) {
      console.error('Error loading model image:', err);
      setError('Failed to load model image. Please try again.');
    }
  };

  // Add this handler for garment upload
  const handleGarmentUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setGeneratedDesign({
        id: Date.now(),
        name: 'Uploaded Garment',
        image: reader.result
      });
      setError(null);
    };
    reader.onerror = () => {
      setError('Failed to read image file');
    };
    reader.readAsDataURL(file);
  };

  if (currentStep === 'tryon') {
    return (
      <div className='bg-black w-full h-screen text-white p-8 relative mt-16 max-sm:mt-2'>
        {/* Step Indicator */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 flex items-center gap-2 sm:gap-4 bg-zinc-900/90 px-2 sm:px-4 py-2 sm:py-2.5 rounded-full border border-zinc-800 backdrop-blur-sm z-20 shadow-xl ">
        <div className={`flex items-center ${currentStep === 'design' ? 'text-white' : 'text-zinc-500'}`}>
          <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border ${currentStep === 'design' ? 'border-white bg-white/10' : 'border-zinc-700'
            }`}>1</div>
          <span className="ml-1 sm:ml-2 text-xs sm:text-sm font-medium">Design</span>
        </div>
        <div className="lg:w-4 w-2 sm:w-8 h-px bg-zinc-800" />
        <div className={`flex items-center ${currentStep === 'tryon' ? 'text-white' : 'text-zinc-500'}`}>
          <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border ${currentStep === 'tryon' ? 'border-white bg-white/10' : 'border-zinc-700'
            }`}>2</div>
          <span className="ml-1 sm:ml-2 text-xs sm:text-sm font-medium">Try On</span>
        </div>
      </div>

        {/* Main Content - Adjusted top padding */}
        <div className='max-w-[1800px] mx-auto flex flex-col pt-8'>
          {/* Back button */}
          <div className='mb-4 flex items-center justify-between'>
            <button
              onClick={() => setCurrentStep('design')}
              className='flex items-center text-zinc-400 hover:text-white transition-colors'
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Design
            </button>
          </div>

          {/* Rest of your try-on content */}
          <div className='grid grid-cols-1 lg:grid-cols-[1fr,2fr] gap-6 h-[calc(100vh-180px)]'>
            {/* Left Panel - Model Upload */}
            <div className='bg-zinc-900/50 rounded-xl border border-zinc-800 backdrop-blur-sm p-4'>
              <div className='flex flex-col justify-between h-full'>
                <div className='mb-4 lg:mb-0'>
                  <h2 className='text-base font-semibold text-zinc-200'>Upload Model Image</h2>
                  <p className='text-xs text-zinc-400'>Upload a photo to try the design on</p>
                </div>

                {/* Upload Area */}
                <div className='rounded-lg overflow-hidden border-2 border-dashed border-zinc-800 hover:border-zinc-700 transition-all duration-300 mb-6 lg:mb-0'>
                  <label className='relative block w-full cursor-pointer group'>
                    {modelImage ? (
                      <div className="relative">
                        <img
                          src={modelImage.preview}
                          alt="Uploaded model"
                          className='w-full h-[300px] sm:h-[300px] lg:h-[calc(100vh-400px)] object-contain'
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                          <p className="text-white text-sm">Click to change image</p>
                        </div>
                      </div>
                    ) : (
                      <div className="h-[200px] sm:h-[300px] lg:h-[calc(100vh-450px)] flex flex-col items-center justify-center gap-3 bg-zinc-900/50">
                        <div className="w-16 h-16 rounded-full bg-zinc-800/50 flex items-center justify-center">
                          <Upload className="w-8 h-8 text-zinc-400" />
                        </div>
                        <div className="text-center">
                          <p className="text-zinc-300 font-medium">Click to upload model image</p>
                          <p className="text-zinc-500 text-sm mt-1">PNG, JPG up to 5MB</p>
                        </div>
                      </div>
                    )}
                    <input type="file" accept="image/*" onChange={handleModelUpload} className="hidden" />
                  </label>
                </div>

                {/* Pre-existing Models Button */}
                <Button
                  variant="outline"
                  className="w-full border-zinc-700 hover:bg-zinc-800 text-zinc-300 mt-3 mb-6 lg:mb-0"
                  onClick={() => setShowModelSelector(true)}
                >
                  <User className="w-4 h-4 mr-2" />
                  <p className='flex' ><span className="hidden sm:block">Select From </span>Pre-existing Models</p>
                </Button>

                {/* Model Selector Modal */}
                {showModelSelector && (
                  <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-20 flex items-center justify-center p-4">
                    <div className="bg-zinc-900 rounded-xl border border-zinc-800 w-full max-w-4xl max-h-[80vh] overflow-hidden">
                      <div className="p-4 border-b border-zinc-800 flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-zinc-200">Select a Model</h3>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setShowModelSelector(false)}
                          className="text-zinc-400 hover:text-white"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="p-4 overflow-y-auto max-h-[calc(80vh-80px)]">
                        {/* Gender Tabs */}
                        <div className="flex gap-4 mb-6">
                          {['female', 'male'].map((gender) => (
                            <button
                              key={gender}
                              onClick={() => setSelectedGender(gender)}
                              className={`px-4 py-2 rounded-lg capitalize transition-all ${selectedGender === gender
                                ? 'bg-white text-black'
                                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                                }`}
                            >
                              {gender} Models
                            </button>
                          ))}
                        </div>

                        {/* Models Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {PRE_EXISTING_MODELS[selectedGender].map((model) => (
                            <div
                              key={model.id}
                              onClick={() => handleModelSelect(model.image)}
                              className="relative aspect-[3/4] rounded-lg overflow-hidden border border-zinc-800 cursor-pointer group hover:border-zinc-600 transition-all"
                            >
                              <img
                                src={model.image}
                                alt={model.name}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-all flex items-end">
                                <p className="text-sm text-white p-3">{model.name}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Try On Button */}
                <Button
                  className="w-full bg-white hover:bg-zinc-200 text-black transition-all duration-300 relative h-9"
                  onClick={() => handleTryOn()}
                  disabled={!modelImage || loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2" />
                      <span>Processing... {Math.round(progress * 10) / 10}%</span>
                    </div>
                  ) : (
                    <>
                      Try On Design
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Right Panel - Preview */}
            <div className='bg-zinc-900/30 rounded-xl border border-zinc-800 backdrop-blur-sm p-4'>
              <div className='h-full flex flex-col'>
                <h2 className='text-base font-semibold text-zinc-200 mb-2'>Generated Design</h2>
                <div className='flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4'>
                  {/* Main Preview */}
                  <div className='flex items-center justify-center bg-zinc-900/50 rounded-lg'>
                    {generatedDesign ? (
                      <div className='w-full h-full flex items-center justify-center p-4'>
                        <img
                          src={generatedDesign.image}
                          alt="Generated design"
                          className='max-h-[300px] lg:max-h-[calc(100vh-220px)] w-auto object-contain'
                        />
                      </div>
                    ) : (
                      <div className='text-center max-w-md space-y-8'>
                        <div className='space-y-4'>
                          <div className="w-16 h-16 mx-auto text-zinc-700 bg-zinc-800/50 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h10v10H7z M7 3v4M17 3v4M7 17v4M17 17v4" />
                            </svg>
                          </div>
                          <div>
                            <h2 className='text-lg font-semibold text-zinc-300 mb-2'>No Design Selected</h2>
                            <p className='text-zinc-500 text-sm'>Choose one of the options below to get started</p>
                          </div>
                        </div>

                        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                          {/* Generate Option */}
                          <button
                            onClick={() => handleGenerateDesign()}
                            className='p-4 rounded-lg border border-zinc-800 hover:border-zinc-700 bg-zinc-900/50 transition-all duration-300 group'
                          >
                            <div className='flex flex-col items-center text-center space-y-2'>
                              <Wand2 className='w-8 h-8 text-zinc-500 group-hover:text-white transition-colors' />
                              <span className='text-sm font-medium text-zinc-300'>Generate Design</span>
                              <span className='text-xs text-zinc-500'>Create a new design with AI</span>
                            </div>
                          </button>

                          {/* Upload Option */}
                          <label className='p-4 rounded-lg border border-zinc-800 hover:border-zinc-700 bg-zinc-900/50 transition-all duration-300 group cursor-pointer'>
                            <div className='flex flex-col items-center text-center space-y-2'>
                              <Upload className='w-8 h-8 text-zinc-500 group-hover:text-white transition-colors' />
                              <span className='text-sm font-medium text-zinc-300'>Upload Garment</span>
                              <span className='text-xs text-zinc-500'>Upload your own design</span>
                            </div>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleGarmentUpload}
                              className="hidden"
                            />
                          </label>

                          {/* Wardrobe Option */}
                          <button
                            onClick={() => document.getElementById('wardrobe-section').scrollIntoView({ behavior: 'smooth' })}
                            className='p-4 rounded-lg border border-zinc-800 hover:border-zinc-700 bg-zinc-900/50 transition-all duration-300 group'
                          >
                            <div className='flex flex-col items-center text-center space-y-2'>
                              <svg className='w-8 h-8 text-zinc-500 group-hover:text-white transition-colors' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6h18M3 12h18M3 18h18" />
                              </svg>
                              <span className='text-sm font-medium text-zinc-300'>Choose from Wardrobe</span>
                              <span className='text-xs text-zinc-500'>Select from existing designs</span>
                            </div>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Try-on Result */}
                  <div className='flex items-center justify-center bg-zinc-900/50 rounded-lg min-h-[300px] sm:min-h-[400px] lg:min-h-[500px]'>
                    {loading ? (
                      <div className='flex flex-col items-center justify-center p-4'>
                        <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-white mb-2 sm:mb-3" />
                        <p className='text-xs sm:text-sm text-zinc-400'>Processing try-on...</p>
                      </div>
                    ) : tryOnResult ? (
                      <div className='w-full h-full flex items-center justify-center p-2 sm:p-4'>
                        <img
                          src={tryOnResult.url}
                          alt="Try-on Result"
                          className='max-h-[200px] sm:max-h-[300px] lg:max-h-[calc(100vh-220px)] w-auto object-contain'
                        />
                      </div>
                    ) : (
                      <div className='text-center p-4'>
                        <p className='text-xs sm:text-sm text-zinc-400'>Try-on result will appear here</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-black w-full h-screen text-white p-4 font-jakarta relative mt-20 max-sm:mt-2'>
      {/* Step Indicator - Updated positioning and z-index */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 flex items-center gap-2 sm:gap-4 bg-transparent px-2 sm:px-4 py-2 sm:py-2.5 rounded-full  border-zinc-800 backdrop-blur-sm z-20 shadow-xl ">
        <div className={`flex items-center ${currentStep === 'design' ? 'text-white' : 'text-zinc-500'}`}>
          <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border ${currentStep === 'design' ? 'border-white bg-white/10' : 'border-zinc-700'
            }`}>1</div>
          <span className="ml-1 sm:ml-2 text-xs sm:text-sm font-medium">Design</span>
        </div>
        <div className="lg:w-4 w-2 sm:w-8 h-px bg-zinc-800" />
        <div className={`flex items-center ${currentStep === 'tryon' ? 'text-white' : 'text-zinc-500'}`}>
          <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border ${currentStep === 'tryon' ? 'border-white bg-white/10' : 'border-zinc-700'
            }`}>2</div>
          <span className="ml-1 sm:ml-2 text-xs sm:text-sm font-medium">Try On</span>
        </div>
      </div>

      <div className='flex flex-col lg:flex-row gap-6 max-w-[1800px] mx-auto h-[calc(100vh-90px)] pt-16 max-sm:pt-12'>
        {/* Left Panel - Design Controls */}
        <div className='w-full lg:w-1/4 bg-zinc-900/50 rounded-xl border border-zinc-800 backdrop-blur-sm'>
          <div className='h-full overflow-y-auto scrollbar-hide p-3 md:p-5'>
            <div className='space-y-5'>
              {/* Header */}
              <div>
                <h2 className="text-lg font-semibold mb-1">Design Your Outfit</h2>
                <p className="text-zinc-400 text-xs">Upload a model and customize your design</p>
              </div>

              {/* Model Upload */}
              <div className='rounded-lg overflow-hidden border-2 border-dashed border-zinc-800 hover:border-zinc-700 transition-all duration-300'>
                <label className='relative block w-full cursor-pointer group'>
                  {modelImage ? (
                    <div className="relative">
                      <img
                        src={modelImage.preview}
                        alt="Uploaded model"
                        className='w-full h-[200px] md:h-[calc(100vh-450px)] object-contain'
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                        <p className="text-white text-sm">Click to change image</p>
                      </div>
                    </div>
                  ) : (
                    <div className="h-[200px] md:h-[calc(100vh-450px)] flex flex-col items-center justify-center gap-3 bg-zinc-900/50">
                      <div className="w-16 h-16 rounded-full bg-zinc-800/50 flex items-center justify-center">
                        <Upload className="w-8 h-8 text-zinc-400" />
                      </div>
                      <div className="text-center">
                        <p className="text-zinc-300 font-medium">Click to upload model image</p>
                        <p className="text-zinc-500 text-sm mt-1">PNG, JPG up to 5MB</p>
                      </div>
                    </div>
                  )}
                  <input type="file" accept="image/*" onChange={handleModelUpload} className="hidden" />
                </label>
              </div>

              {/* Pre-existing Models Button */}
              <Button
                variant="outline"
                className="w-full border-zinc-700 hover:bg-zinc-800 text-zinc-300 mt-3"
                onClick={() => setShowModelSelector(true)}
              >
                <User className="w-4 h-4 mr-2" />
                <p className='flex' ><span className="hidden sm:block">Select From </span>Pre-existing Models</p>
              </Button>

              {/* Model Selector Modal */}
              {showModelSelector && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-20 flex items-center justify-center p-4">
                  <div className="bg-zinc-900 rounded-xl border border-zinc-800 w-full max-w-4xl max-h-[80vh] overflow-hidden">
                    <div className="p-4 border-b border-zinc-800 flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-zinc-200">Select a Model</h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowModelSelector(false)}
                        className="text-zinc-400 hover:text-white"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="p-4 overflow-y-auto max-h-[calc(80vh-80px)]">
                      {/* Gender Tabs */}
                      <div className="flex gap-4 mb-6">
                        {['female', 'male'].map((gender) => (
                          <button
                            key={gender}
                            onClick={() => setSelectedGender(gender)}
                            className={`px-4 py-2 rounded-lg capitalize transition-all ${selectedGender === gender
                              ? 'bg-white text-black'
                              : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                              }`}
                          >
                            {gender} Models
                          </button>
                        ))}
                      </div>

                      {/* Models Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {PRE_EXISTING_MODELS[selectedGender].map((model) => (
                          <div
                            key={model.id}
                            onClick={() => handleModelSelect(model.image)}
                            className="relative aspect-[3/4] rounded-lg overflow-hidden border border-zinc-800 cursor-pointer group hover:border-zinc-600 transition-all"
                          >
                            <img
                              src={model.image}
                              alt={model.name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-all flex items-end">
                              <p className="text-sm text-white p-3">{model.name}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Design Options */}
              <div className='space-y-4'>
                {/* Category Selection */}
                <div className='space-y-2'>
                  <Label className="text-zinc-400 uppercase text-xs tracking-wider">Category</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.keys(GARMENT_TYPES).map((category) => (
                      <button
                        key={category}
                        onClick={() => handlePromptChange('category', category)}
                        className={`px-4 py-2 rounded-lg border capitalize transition-all duration-300 ${promptData.category === category
                          ? 'bg-white text-black border-white'
                          : 'border-zinc-800 hover:border-zinc-600 text-zinc-300'
                          }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Gender Selection */}
                <div className='space-y-2'>
                  <Label className="text-zinc-400 uppercase text-xs tracking-wider">Gender</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {['male', 'female'].map((genderOption) => (
                      <button
                        key={genderOption}
                        onClick={() => handlePromptChange('gender', genderOption)}
                        className={`px-4 py-2 rounded-lg border capitalize transition-all duration-300 ${promptData.gender === genderOption
                          ? 'bg-white text-black border-white'
                          : 'border-zinc-800 hover:border-zinc-600 text-zinc-300'
                          }`}
                      >
                        {genderOption}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Garment Type Selection */}
                <div className='space-y-2'>
                  <Label className="text-zinc-400 uppercase text-xs tracking-wider">Garment Type</Label>
                  <Select
                    value={promptData.garmentType}
                    onValueChange={(value) => handlePromptChange('garmentType', value)}
                  >
                    <SelectTrigger className="bg-zinc-900 border-zinc-800 text-zinc-300 h-10 rounded-lg text-sm hover:border-zinc-600 transition-all duration-300">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-zinc-800">
                      {GARMENT_TYPES[promptData.category].map((type) => (
                        <SelectItem
                          key={type}
                          value={type}
                          className="hover:bg-zinc-800"
                        >
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Color Selection */}
                <div className='space-y-2'>
                  <Label className="text-zinc-400 uppercase text-xs tracking-wider">Color</Label>
                  <Select
                    value={promptData.color}
                    onValueChange={(value) => handlePromptChange('color', value)}
                  >
                    <SelectTrigger className="bg-zinc-900 border-zinc-800 text-zinc-300 h-10 rounded-lg text-sm hover:border-zinc-600 transition-all duration-300">
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-zinc-800">
                      {COLORS.map((color) => (
                        <SelectItem
                          key={color}
                          value={color}
                          className="hover:bg-zinc-800"
                        >
                          {color}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Pattern Selection */}
                <div className='space-y-2'>
                  <Label className="text-zinc-400 uppercase text-xs tracking-wider">Pattern</Label>
                  <Select
                    value={promptData.pattern}
                    onValueChange={(value) => handlePromptChange('pattern', value)}
                  >
                    <SelectTrigger className="bg-zinc-900 border-zinc-800 text-zinc-300 h-10 rounded-lg text-sm hover:border-zinc-600 transition-all duration-300">
                      <SelectValue placeholder="Select pattern" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-zinc-800">
                      {PATTERNS.map((pattern) => (
                        <SelectItem
                          key={pattern}
                          value={pattern}
                          className="hover:bg-zinc-800"
                        >
                          {pattern}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Description */}
                <div className='space-y-2'>
                  <Label className="text-zinc-400 uppercase text-xs tracking-wider">Description</Label>
                  <Textarea
                    placeholder="Describe your desired outfit..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="min-h-[80px] max-h-[80px] bg-zinc-900 border-zinc-800 text-zinc-300 placeholder:text-zinc-600 rounded-lg resize-none text-sm focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300"
                  />
                </div>

                {/* Fabric */}
                <div className='space-y-2'>
                  <Label className="text-zinc-400 uppercase text-xs tracking-wider">Fabric</Label>
                  <Select value={fabric} onValueChange={setFabric}>
                    <SelectTrigger className="bg-zinc-900 border-zinc-800 text-zinc-300 h-10 rounded-lg text-sm hover:border-zinc-600 transition-all duration-300">
                      <SelectValue placeholder="Select fabric" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-zinc-800">
                      {['Cotton', 'Silk', 'Wool', 'Polyester', 'Linen', 'Denim'].map((fabricOption) => (
                        <SelectItem
                          key={fabricOption.toLowerCase()}
                          value={fabricOption.toLowerCase()}
                          className="hover:bg-zinc-800"
                        >
                          {fabricOption}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Preview section update - remove size references */}
                <div className='space-y-2'>
                  <div className='flex justify-between text-xs'>
                    <span className='text-zinc-400'>Fabric:</span>
                    <span className='text-zinc-300 capitalize'>{fabric}</span>
                  </div>
                  <div className='flex justify-between text-xs'>
                    <span className='text-zinc-400'>Color:</span>
                    <div className='flex items-center gap-2'>
                      <div
                        className='w-3 h-3 rounded-full border border-zinc-700'
                        style={{ backgroundColor: promptData.color }}
                      />
                      <span className='text-zinc-300'>{promptData.color}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Generate Button */}
              <Button
                className="w-full bg-white hover:bg-zinc-200 text-black transition-all duration-300 relative"
                onClick={() => handleGenerateDesign()}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="absolute inset-0 bg-black/5" />
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2" />
                      <span>Generating... {Math.round(progress * 10) / 10}%</span>
                    </div>
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Generate Design
                  </>
                )}
              </Button>

              {/* Progress bar when loading */}
              {loading && (
                <div className="w-full bg-zinc-800 rounded-full h-1 overflow-hidden">
                  <div
                    className="bg-white h-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              )}

              {/* Error Display */}
              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Center Panel - Preview */}
        <div className='flex-1 bg-zinc-900/30 rounded-xl border border-zinc-800 backdrop-blur-sm'>
          <div className='h-full p-2 md:p-4 flex flex-col'>
            {generatedDesign ? (
              <div className='w-full h-full flex flex-col items-center'>
                {/* Preview Header */}
                <div className='w-full mb-4'>
                  <h2 className='text-lg font-semibold text-zinc-200'>Preview Design</h2>
                  <p className='text-sm text-zinc-400'>Generated design preview and details</p>
                </div>

                {/* Preview Grid - Responsive */}
                <div className='w-full flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 min-h-0 h-[calc(100vh-250px)]'>
                  {/* Main Preview */}
                  <div className='col-span-1 md:col-span-2 h-full'>
                    <div className='relative w-full h-full rounded-lg overflow-hidden border border-zinc-800 group'>
                      <div className='w-full h-full flex items-center justify-center bg-zinc-900/50'>
                        <img
                          src={generatedDesign.image}
                          alt="Main Preview"
                          className='max-h-[calc(100vh-300px)] w-auto object-contain p-4'
                        />
                      </div>
                      <div className='absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300'></div>
                    </div>
                  </div>

                  {/* Side Details - Responsive */}
                  <div className='space-y-3 flex flex-col h-full'>
                    {/* Thumbnail */}
                    <div className='relative aspect-square rounded-lg overflow-hidden border border-zinc-800 group'>
                      <div className='w-full h-full flex items-center justify-center bg-zinc-900/50'>
                        <img
                          src={generatedDesign.image}
                          alt="Thumbnail"
                          className='max-w-[90%] max-h-[90%] object-contain'
                        />
                      </div>
                      <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300'></div>
                    </div>

                    {/* Details */}
                    <div className='flex-1 flex flex-col justify-between py-2'>
                      <div className='space-y-3'>
                        <div>
                          <h3 className='text-sm font-medium text-zinc-300'>Details</h3>
                          <p className='text-xs text-zinc-500'>{generatedDesign.name}</p>
                        </div>

                        <div className='space-y-2'>
                          <div className='flex justify-between text-xs'>
                            <span className='text-zinc-400'>Fabric:</span>
                            <span className='text-zinc-300 capitalize'>{fabric}</span>
                          </div>
                          <div className='flex justify-between text-xs'>
                            <span className='text-zinc-400'>Color:</span>
                            <div className='flex items-center gap-2'>
                              <div
                                className='w-2 h-2 rounded-full border border-zinc-700'
                                style={{ backgroundColor: promptData.color }}
                              />
                              <span className='text-zinc-300'>{promptData.color}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className='flex flex-col sm:flex-row gap-4 justify-center mt-6'>
                  <Button
                    className="bg-white hover:bg-zinc-200 text-black px-6 py-2 text-sm font-medium transition-all duration-300"
                    onClick={() => setCurrentStep('tryon')}
                  >
                    Proceed to Try-On
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>

                  <Button
                    variant="outline"
                    className="border-zinc-700 hover:bg-zinc-800 text-zinc-300 px-6 py-2 text-sm font-medium transition-all duration-300"
                    onClick={() => {
                      // First clear the current design
                      setGeneratedDesign(null);
                      // Then trigger generation with current inputs
                      handleGenerateDesign();
                    }}
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-zinc-400 mr-2" />
                        <span>Generating... {Math.round(progress * 10) / 10}%</span>
                      </div>
                    ) : (
                      <>
                        Generate Another
                        <Wand2 className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ) : (
              <div className='h-full flex items-center justify-center'>
                <div className='text-center max-w-md space-y-8'>
                  <div className='space-y-4'>
                    <div className="w-16 h-16 mx-auto text-zinc-700 bg-zinc-800/50 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h10v10H7z M7 3v4M17 3v4M7 17v4M17 17v4" />
                      </svg>
                    </div>
                    <div>
                      <h2 className='text-lg font-semibold text-zinc-300 mb-2'>No Design Selected</h2>
                      <p className='text-zinc-500 text-sm'>Choose one of the options below to get started</p>
                    </div>
                  </div>

                  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {/* Generate Option */}
                    <button
                      onClick={() => handleGenerateDesign()}
                      className='p-4 rounded-lg border border-zinc-800 hover:border-zinc-700 bg-zinc-900/50 transition-all duration-300 group'
                    >
                      <div className='flex flex-col items-center text-center space-y-2'>
                        <Wand2 className='w-8 h-8 text-zinc-500 group-hover:text-white transition-colors' />
                        <span className='text-sm font-medium text-zinc-300'>Generate Design</span>
                        <span className='text-xs text-zinc-500'>Create a new design with AI</span>
                      </div>
                    </button>

                    {/* Upload Option */}
                    <label className='p-4 rounded-lg border border-zinc-800 hover:border-zinc-700 bg-zinc-900/50 transition-all duration-300 group cursor-pointer'>
                      <div className='flex flex-col items-center text-center space-y-2'>
                        <Upload className='w-8 h-8 text-zinc-500 group-hover:text-white transition-colors' />
                        <span className='text-sm font-medium text-zinc-300'>Upload Garment</span>
                        <span className='text-xs text-zinc-500'>Upload your own design</span>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleGarmentUpload}
                        className="hidden"
                      />
                    </label>

                    {/* Wardrobe Option */}
                    <button
                      onClick={() => document.getElementById('wardrobe-section').scrollIntoView({ behavior: 'smooth' })}
                      className='p-4 rounded-lg border border-zinc-800 hover:border-zinc-700 bg-zinc-900/50 transition-all duration-300 group'
                    >
                      <div className='flex flex-col items-center text-center space-y-2'>
                        <svg className='w-8 h-8 text-zinc-500 group-hover:text-white transition-colors' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6h18M3 12h18M3 18h18" />
                        </svg>
                        <span className='text-sm font-medium text-zinc-300'>Choose from Wardrobe</span>
                        <span className='text-xs text-zinc-500'>Select from existing designs</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Wardrobe */}
        <div className='w-full lg:w-1/5 bg-zinc-900/50 rounded-xl border border-zinc-800 backdrop-blur-sm flex flex-col'>
          {/* Category Selection */}
          <div className='p-4 border-b border-zinc-800'>
            <div className='flex flex-col gap-2'>
              <h2 className='text-sm font-semibold text-zinc-300'>Wardrobe</h2>
              <div className='flex flex-wrap gap-2'>
                {Object.keys(wardrobe).map((category) => (
                  <button
                    key={category}
                    onClick={() => handlePromptChange('category', category)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${promptData.category === category
                      ? 'bg-white text-black'
                      : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Garments Grid */}
          <div className='flex-1 overflow-y-auto scrollbar-hide p-4'>
            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3'>
              {wardrobe[promptData.category]?.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    // Update both garmentType and selectedGarment
                    handlePromptChange('garmentType', item.name.split(' ').pop()); // Takes the last word as garment type
                    setGeneratedDesign({
                      id: item.id,
                      name: item.name,
                      image: item.image
                    });
                  }}
                  className={`
                    relative rounded-lg overflow-hidden border cursor-pointer
                    transition-all duration-300 hover:scale-105 group
                    ${generatedDesign?.id === item.id
                      ? 'border-white shadow-lg shadow-white/10'
                      : 'border-zinc-800 hover:border-zinc-600'
                    }
                  `}
                >
                  <div className='aspect-square'>
                    <img
                      src={item.image}
                      alt={item.name}
                      className='w-full h-full object-cover'
                      onError={(e) => {
                        e.target.src = 'https://placehold.co/300x300/111111/666666?text=Garment'
                      }}
                    />
                    <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300'></div>
                  </div>
                  <div className='absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm p-2 transform translate-y-full group-hover:translate-y-0 transition-all duration-300'>
                    <p className='text-xs text-center truncate'>{item.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Generate