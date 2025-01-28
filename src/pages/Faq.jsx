import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Mail, MessageCircle, Phone, MapPin } from 'lucide-react';
import { FaQuestionCircle, FaCog, FaUser, FaCamera, FaWrench, FaPencilAlt, FaLock } from 'react-icons/fa';

const FAQItem = ({ question, answer, isOpen, onClick, category }) => (
  <motion.div
    initial={false}
    className="relative"
  >
    <motion.button
      className={`w-full p-6 flex items-center justify-between text-left focus:outline-none group bg-white/[0.02] backdrop-blur-sm border border-white/[0.08] rounded-xl ${
        isOpen ? 'bg-white/[0.04]' : ''
      } hover:bg-white/[0.04] transition-all duration-300`}
      onClick={onClick}
      whileHover={{ scale: 1.005 }}
      whileTap={{ scale: 0.995 }}
    >
      <div className="flex flex-col gap-1">
        <span className="text-xs font-medium text-white/40 uppercase tracking-wider">
          {category}
        </span>
        <span className="text-base sm:text-lg font-medium text-white/90 group-hover:text-white">
          {question}
        </span>
      </div>
      <span className="ml-6 flex-shrink-0 bg-white/[0.05] rounded-full p-2">
        {isOpen ? (
          <Minus className="h-4 w-4 text-white/60" />
        ) : (
          <Plus className="h-4 w-4 text-white/60" />
        )}
      </span>
    </motion.button>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="p-6 pt-2">
            <p className="text-white/60 text-sm sm:text-base leading-relaxed">
              {answer}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Questions' },
    { id: 'general', name: 'General' },
    { id: 'technical', name: 'Technical' },
    { id: 'account', name: 'Account' },
    { id: 'privacy', name: 'Privacy' }
  ];

  const faqs = [
    {
      category: 'general',
      question: "What is StyleMe's Virtual Try-On?",
      answer: "StyleMe's Virtual Try-On is an advanced AI-powered feature that creates photorealistic visualizations of how clothing would look on you. Using state-of-the-art machine learning, we generate highly accurate and personalized fashion previews."
    },
    {
      category: 'technical',
      question: "How accurate are the AI-generated designs?",
      answer: "Our AI model achieves remarkable accuracy through extensive training on diverse fashion datasets. While minor variations may occur, the generated designs provide highly realistic previews of garment appearance, fit, and drape."
    },
    {
      category: 'technical',
      question: "Can I customize the generated designs?",
      answer: "Absolutely! Our platform offers comprehensive customization options. You can modify colors, patterns, styles, and specific details. The AI adapts in real-time to generate personalized fashion items matching your preferences."
    },
    {
      category: 'account',
      question: "How do I access my saved designs?",
      answer: "All your generated designs are automatically saved to your personal digital wardrobe. Access them anytime through your dashboard, where you can view, download, or use them for virtual try-ons."
    },
    {
      category: 'technical',
      question: "What image formats work best?",
      answer: "We support JPEG, PNG, and WebP formats. For optimal results, use well-lit photos with a neutral background. Our system automatically optimizes your uploads for the best possible try-on experience."
    },
    {
      category: 'privacy',
      question: "How is my data protected?",
      answer: "We employ enterprise-grade encryption and security measures to protect your data. Your images and designs are stored securely, and we maintain strict privacy controls that exceed industry standards."
    }
  ];

  const filteredFaqs = activeCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory);

  return (
    <div className="mt-16 mx-auto max-w-4xl px-8">
      <h2 className="text-3xl font-bold mb-8 text-center">Frequently asked Questions</h2>
      <div className=" rounded overflow-hidden">
        <div className="flex gap-2 mb-8 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-white text-black'
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
        <motion.div 
          layout
          className="grid gap-4"
        >
          <AnimatePresence mode="wait">
            {filteredFaqs.map((faq, index) => (
              <motion.div
                key={index}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <FAQItem
                  question={faq.question}
                  answer={faq.answer}
                  category={faq.category}
                  isOpen={openIndex === index}
                  onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

const ContactSection = () => {
  const contactInfo = [
    {
      icon: <MessageCircle className="h-5 w-5" />,
      title: "Live Chat",
      description: "Chat with our support team",
      action: "Start a chat",
      onClick: () => {}
    },
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email Support",
      description: "Get help via email",
      action: "support@styleme.com",
      onClick: () => {}
    },
    {
      icon: <Phone className="h-5 w-5" />,
      title: "Phone Support",
      description: "Mon-Fri from 8am to 5pm",
      action: "+1 (555) 123-4567",
      onClick: () => {}
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      title: "Office",
      description: "Visit our office",
      action: "View on map",
      onClick: () => {}
    }
  ];

  return (
    <div className="mt-16">
      <h2 className="text-3xl font-bold mb-8 text-center">Contact Our Friendly Team</h2>
      <p className="text-lg text-gray-400 mb-12 text-center">Let us know how we can help.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {contactInfo.map((item, index) => (
          <div key={index} className="border border-white/10 rounded p-6 text-center transition duration-300 transform hover:scale-105">
            <div className="bg-white/5 w-10 h-10 rounded-full flex items-center justify-center mb-4">
              {item.icon}
            </div>
            <h3 className="text-white font-medium mb-1">{item.title}</h3>
            <p className="text-gray-400 text-sm mb-3">{item.description}</p>
            <p className="text-white/80 text-sm font-medium">{item.action}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Faq = () => {
  return (
    <div className="text-white font-sans min-h-screen flex flex-col">
      <main className="container mx-auto px-8 py-16 flex-grow">
        <FAQSection />
        <ContactSection />
      </main>
    </div>
  );
};

export default Faq;