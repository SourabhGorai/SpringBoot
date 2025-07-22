// import { useParams } from 'react-router-dom';
// import { useState } from 'react';
// import './AskQuestion.css';

// export default function AskQuestion() {
//   const { name, gender } = useParams(); // ✅ from URL
//   const [question, setQuestion] = useState('');
//   const [sessionId, setSessionId] = useState(null);
//   const [accessKey, setAccessKey] = useState(null);

//   const createSession = async () => {
//     const payload = {
//       name: name,
//       gender: gender,
//       description: question,
//       isActive: true
//     };

//     console.log('Sending payload:', payload); // Debug

//     const res = await fetch('http://localhost:8080/sourabh/sessions', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(payload),
//     });

//     const data = await res.json();
//     setSessionId(data.sessionId);
//     setAccessKey(data.accessKey);
//   };

//   return (
//     <div className="ask-container">
//       <div className="ask-card">
//         <h2>
//           Hey <span className="name-highlight">{name}</span> {gender === 'male' ? '🧑‍💻' : gender === 'female' ? '👩‍🎤' : '🌈'}!
//         </h2>
//         <p className="ask-subtext">
//           What’s cooking in your curious mind today? 💭 Drop your <span className="highlight">anonymous question</span> below 👇
//         </p>

//         <textarea
//           className="ask-textarea"
//           placeholder="Type your burning question here... 🤔"
//           value={question}
//           onChange={(e) => setQuestion(e.target.value)}
//         />

//         <button className="ask-button" onClick={createSession}>
//           Create Your Session 🎉
//         </button>

//         {sessionId && accessKey && (
//           <div className="link-container">
//             <p className="share-title">Please keep the links saved, else you won't be able to access the answers</p>
//             <p className="share-title">🚀 Share your links below:</p>
//             <div className="link-block">
//               🔗 <strong>Answer Link:</strong><br />
//               <a href={`/answer/${sessionId}`} target="_blank" rel="noreferrer">
//                 http://localhost:5173/answer/{sessionId}
//               </a>
//             </div>
//             <div className="link-block">
//               🛠️ <strong>Manage Session:</strong><br />
//               <a href={`/session/${accessKey}`} target="_blank" rel="noreferrer">
//                 http://localhost:5173/session/{accessKey}
//               </a>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



import { useParams } from 'react-router-dom';
import { useState } from 'react';
import './AskQuestion.css';

export default function AskQuestion() {
  const { name, gender } = useParams(); // ✅ from URL
  const [question, setQuestion] = useState('');
  const [sessionId, setSessionId] = useState(null);
  const [accessKey, setAccessKey] = useState(null);

  const createSession = async () => {
    const payload = {
      name: name,
      gender: gender,
      description: question,
      isActive: true
    };

    console.log('Sending payload:', payload); // Debug

    const res = await fetch('http://localhost:8080/sourabh/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    setSessionId(data.sessionId);
    setAccessKey(data.accessKey);
  };

  return (
    <div className="ask-container">
      <div className="ask-card">
        <h2>
          Hey <span className="name-highlight">{name}</span> {gender === 'male' ? '🧑‍💻' : gender === 'female' ? '👩‍🎤' : '🌈'}!
        </h2>
        <p className="ask-subtext">
          What’s cooking in your curious mind today? 💭 Drop your <span className="highlight">anonymous question</span> below 👇
        </p>

        <textarea
          className="ask-textarea"
          placeholder="Type your burning question here... 🤔"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <button className="ask-button" onClick={createSession}>
          Create Your Session 🎉
        </button>

        {sessionId && accessKey && (
          <div className="link-container">
            <p className="share-title">Please keep the links saved, else you won't be able to access the answers</p>
            <p className="share-title">🚀 Share your links below:</p>

            <div className="link-block">
              🔗 <strong>Share With Others to Get Responses:</strong><br />
              <a href={`/answer/${sessionId}`} target="_blank" rel="noreferrer">
                http://localhost:5173/answer/{sessionId}
              </a>
              <button
                style={{
                  marginTop: '10px',
                  padding: '8px 16px',
                  fontSize: '0.9rem',
                  borderRadius: '8px',
                  background: '#00ffcc',
                  color: '#000',
                  cursor: 'pointer',
                  border: 'none',
                  marginBottom: '20px',
                  marginLeft: '10px',
                }}
                onClick={() =>
                  navigator.clipboard.writeText(`http://localhost:5173/answer/${sessionId}`)
                }
              >
                📋 Copy Link
              </button>
            </div>

            <div className="link-block">
              🛠️ <strong>Save Link to Check Responses:</strong><br />
              <a href={`/session/${accessKey}`} target="_blank" rel="noreferrer">
                http://localhost:5173/session/{accessKey}
              </a>
              <button
                style={{
                  padding: '8px 16px',
                  fontSize: '0.9rem',
                  borderRadius: '8px',
                  background: '#00ffcc',
                  color: '#000',
                  cursor: 'pointer',
                  border: 'none',
                  marginLeft: '10px',
                }}
                onClick={() =>
                  navigator.clipboard.writeText(`http://localhost:5173/session/${accessKey}`)
                }
              >
                📋 Copy Link
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
