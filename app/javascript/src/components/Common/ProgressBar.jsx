import React from "react";

import classNames from "classnames";
import { motion } from "framer-motion/dist/framer-motion";

const ProgressBar = ({ progress }) => (
  <div className="neeto-ui-rounded-full neeto-ui-bg-gray-200 relative h-5 w-full overflow-hidden">
    <motion.div
      animate={{ width: `${progress}%` }}
      className="text-2xs neeto-ui-rounded-full flex h-5 animate-pulse items-center justify-center  bg-indigo-300 font-medium leading-none"
      initial={{ width: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <span
        className={classNames("flex items-center justify-center", {
          "absolute left-0": progress <= 8,
        })}
      >
        {progress}%
      </span>
    </motion.div>
  </div>
);

export default ProgressBar;
