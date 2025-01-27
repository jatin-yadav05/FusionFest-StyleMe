import React, { useState } from 'react';
import { FaQuestionCircle, FaCog, FaUser, FaCamera, FaWrench, FaPencilAlt, FaLock } from 'react-icons/fa';

const FAQSection = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

  const faqs = [
    {
      question: 'What is StyleMe?',
      answer: 'StyleMe is an innovative platform that allows users to design their own clothing. You can customize every detail, from fabric and color to size and style, and see a 3D realistic visualization of your design before buying it.',
      icon: <FaQuestionCircle />,
    },
    {
      question: 'How does StyleMe work?',
      answer: 'Our platform uses cutting-edge 3D modeling technology to bring your design to life. Simply choose a garment, customize it to your liking, and preview the results in real-time.',
      icon: <FaCog />,
    },
    {
      question: 'Do I need any design experience to use StyleMe?',
      answer: 'No design experience is needed! Our intuitive interface makes it easy for anyone to create custom clothing. We provide helpful tools and templates to guide you through the process.',
      icon: <FaUser />,
    },
    {
      question: 'Can I upload my own photo to use as a model?',
      answer: 'Yes, you can upload your own photo to use as a model. This allows you to see how the clothing will look on your specific body type.',
      icon: <FaCamera />,
    },
    {
      question: 'What kinds of customization options are available?',
      answer: 'We offer a wide range of customization options, including fabric selection, color palettes, size adjustments, sleeve styles, neckline variations, and more.',
      icon: <FaWrench />,
    },
    {
      question: "Can I make adjustments to my design after it's generated?",
      answer: 'Yes, you can make adjustments to your design at any time before placing your order. Our platform allows you to easily modify your creations until you are completely satisfied.',
      icon: <FaPencilAlt />,
    },
    {
      question: 'Is my personal information secure?',
      answer: 'Yes, your personal information is secure with us. We use industry-standard security measures to protect your data and ensure your privacy.',
      icon: <FaLock />,
    },
  ];

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <div className="mt-16 mx-auto max-w-4xl px-8">
      <h2 className="text-3xl font-bold mb-8 text-center">Frequently asked Questions</h2>
      <div className="border border-gray-600 rounded-lg overflow-hidden">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`transition duration-300 ease-in-out transform hover:scale-105 ${
              openQuestion === index ? 'bg-gray-700 text-white' : 'bg-gray-900 text-white'
            }`}
          >
            <div
              className="flex items-center py-4 px-6 cursor-pointer relative"
              onClick={() => toggleQuestion(index)}
            >
              <span className="mr-4 text-gray-400 text-xl">{faq.icon}</span>
              <h3 className="font-medium text-lg flex-grow">{faq.question}</h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 transition-transform duration-300 text-gray-400 ${openQuestion === index ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              <div className={`absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 transition-all duration-300 ease-in-out ${openQuestion === index ? 'opacity-100' : 'opacity-0'}`}></div>
            </div>
            {openQuestion === index && (
              <div className="px-6 pb-6 pt-2 border-t border-gray-700 transition-opacity duration-300">
                <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const ContactSection = () => (
  <div className="mt-16">
    <h2 className="text-3xl font-bold mb-8 text-center">Contact Our Friendly Team</h2>
    <p className="text-lg text-gray-400 mb-12 text-center">Let us know how we can help.</p>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {[
        { title: 'Chat to sales', email: 'sales@styleme.com', icon: 'M7 8h10M7 12h10M7 16h10m-3-12a9 9 0 1118 0 9 9 0 01-18 0z' },
        { title: 'Chat to support', email: 'support@styleme.com', icon: 'M3.75 13.5l10.5-11.25L12 10.5h8.25v8.25H12l-1.5 1.5-3 3.75z' },
        { title: 'Visit Us', text: 'Visit on Google Maps', icon: 'M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25z' },
        { title: 'Call Us', text: '+1(234)567890', icon: 'M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h6m-6 0a1.5 1.5 0 011.5 1.5V5m-1.5-1.5H8.25m3 0h6' },
      ].map((contact, index) => (
        <div key={index} className="border border-gray-600 rounded-lg p-6 text-center transition duration-300 transform hover:scale-105 bg-gray-900">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mx-auto mb-2 text-gray-400"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d={contact.icon} />
          </svg>
          <p className="mt-2">{contact.title}</p>
          {contact.email && <p className="text-gray-400 text-sm">{contact.email}</p>}
          {contact.text && <p className="text-gray-400 text-sm">{contact.text}</p>}
        </div>
      ))}
    </div>
  </div>
);
const App = () => {
return (
  <div className="bg-gray-900 text-white font-sans min-h-screen flex flex-col">
    <main className="container mx-auto px-8 py-16 flex-grow">
      <FAQSection />
      <ContactSection />
    </main>
  </div>
);
};

export default App;