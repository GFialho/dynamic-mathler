import React from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { motion } from "framer-motion";

interface TileProps {
  value: string;
  status?: "correct" | "present" | "absent";
}

const Tile: React.FC<TileProps> = ({ value, status }) => {
  const styles = {
    correct: {
      bg: "bg-black",
      border: "border-green-500",
      text: "text-green-400",
      shadow: "shadow-green-500",
    },
    present: {
      bg: "bg-black",
      border: "border-yellow-500",
      text: "text-yellow-400",
      shadow: "shadow-yellow-500",
    },
    absent: {
      bg: "bg-black",
      border: "border-gray-700",
      text: "text-gray-500",
      shadow: "shadow-gray-500",
    },
    default: {
      bg: "bg-black",
      border: "border-gray-800",
      text: "text-green-500",
      shadow: "shadow-green-500",
    },
  };

  const currentStyle = styles[status || "default"];

  return (
    <Tooltip.Provider>
      <Tooltip.Root delayDuration={0}>
        <Tooltip.Trigger asChild>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`h-8 w-8 sm:w-12 sm:h-12 md:w-16 md:h-16 border ${currentStyle.border} flex items-center justify-center text-2xl font-mono ${currentStyle.bg} ${currentStyle.text} rounded-sm ${currentStyle.shadow} overflow-hidden`}
          >
            <span className="typing-animation">{value}</span>
          </motion.div>
        </Tooltip.Trigger>
        <Tooltip.Content
          side="top"
          align="center"
          className="bg-black text-green-400 px-3 py-1 rounded-md text-sm font-mono border border-green-500"
        >
          {status ? status.toUpperCase() : "INPUT"}
          <Tooltip.Arrow className="fill-current text-black" />
        </Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default Tile;
