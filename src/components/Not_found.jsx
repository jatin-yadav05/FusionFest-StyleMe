import React from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";

const Not_found = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-8"
      >
        <h1 className="text-9xl font-bold">
          4
          <motion.span
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="inline-block text-[#3f3f46]"
          >
            0
          </motion.span>
          4
        </h1>
        <p className="text-xl">Oops! The page you are looking for does not exist.</p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <Button
            onClick={() => (window.location.href = "/")}
            className="bg-[#3f3f46] hover:bg-[#29292f] text-white px-4 py-2 rounded"
          >
            Return Home
          </Button>
        </motion.div>
        <motion.div
          className="flex justify-center mt-8 space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-[#3f3f46] rounded-full"
              animate={{ y: [-10, 10, -10] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            ></motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Not_found;
