import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Welcome() {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const infoRef = useRef(null);
  const navigate = useNavigate();

  const handleStart = () => {
    const trimmedName = name.trim();
    if (trimmedName && gender) {
      const encodedName = encodeURIComponent(trimmedName);
      const encodedGender = encodeURIComponent(gender);
      navigate(`/ask/${encodedName}/${encodedGender}`);
    } else {
      alert("Please enter your name and select your gender.");
    }
  };

  const handleOutsideClick = (e) => {
    if (infoRef.current && !infoRef.current.contains(e.target)) {
      setShowInfo(false);
    }
  };

  useEffect(() => {
    if (showInfo) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showInfo]);

  return (
    <div className="welcome-page bg-gif">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1>🎉 Welcome You Crazy Curious Human! 😜</h1>

        <p style={{ color: "#ff8000", fontWeight: "bold" }}>
          Ready to find out what others secretly think of you? 😏
        </p>

        <input
          type="text"
          placeholder="Enter your beautiful name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="gender-selection">
          <label style={{ color: "#0066cc", fontWeight: "bold" }}>
            <input
              type="radio"
              value="Male"
              checked={gender === "Male"}
              onChange={(e) => setGender(e.target.value)}
            />
            Male
          </label>
          <label style={{ color: "#ff007f", fontWeight: "bold" }}>
            <input
              type="radio"
              value="Female"
              checked={gender === "Female"}
              onChange={(e) => setGender(e.target.value)}
            />
            Female
          </label>
          <label style={{ color: "#660066", fontWeight: "bold" }}>
            <input
              type="radio"
              value="Other"
              checked={gender === "Other"}
              onChange={(e) => setGender(e.target.value)}
            />
            Other
          </label>
        </div>

        <motion.button whileHover={{ scale: 1.1 }} onClick={handleStart}>
          Shall We Start??? 🚀
        </motion.button>

        {/* Site Owner Info Toggle */}
        <div
          className="owner-info-container"
          style={{ marginTop: "20px", position: "relative" }}
        >
          <button onClick={() => setShowInfo(!showInfo)}>
            ℹ️ Site Owner Info
          </button>

          <AnimatePresence>
            {showInfo && (
              <motion.div
                ref={infoRef}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="owner-info"
                style={{
                  position: "absolute",
                  bottom: "-90px",
                  left: "0",
                  background: "rgba(0, 0, 0, 0.8)",
                  color: "#fff",
                  padding: "10px",
                  borderRadius: "10px",
                  maxWidth: "300px",
                  fontSize: "14px",
                }}
              >
                Hey there! 👋 I'm <b>Sourabh</b> – I created this site as part
                of my full stack development project. Hope you have as much fun
                using it as I had building it! 😄🚀
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';

// export default function Welcome() {
//   const [name, setName] = useState('');
//   const [gender, setGender] = useState('');
//   const navigate = useNavigate();

//   const handleStart = () => {
//     const trimmedName = name.trim();
//     if (trimmedName && gender) {
//       const encodedName = encodeURIComponent(trimmedName);
//       const encodedGender = encodeURIComponent(gender);
//       navigate(`/ask/${encodedName}/${encodedGender}`);
//     } else {
//       alert('Please enter your name and select your gender.');
//     }
//   };

//   return (
//     <div className="welcome-page bg-gif">
//       <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//         <h1>🎉 Welcome You Crazy Curious Human! 😜</h1>
//         <p>Ready to find out what others secretly think of you? 😏</p>
//         <input
//           type="text"
//           placeholder="Enter your beautiful name..."
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />

//         <div className="gender-selection">
//           <label>
//             <input
//               type="radio"
//               value="Male"
//               checked={gender === 'Male'}
//               onChange={(e) => setGender(e.target.value)}
//             />
//             Male
//           </label>
//           <label>
//             <input
//               type="radio"
//               value="Female"
//               checked={gender === 'Female'}
//               onChange={(e) => setGender(e.target.value)}
//             />
//             Female
//           </label>
//           <label>
//             <input
//               type="radio"
//               value="Other"
//               checked={gender === 'Other'}
//               onChange={(e) => setGender(e.target.value)}
//             />
//             Other
//           </label>
//         </div>

//         <motion.button
//           whileHover={{ scale: 1.1 }}
//           onClick={handleStart}
//         >
//           Shall We Start??? 🚀
//         </motion.button>
//       </motion.div>
//     </div>
//   );
// }
