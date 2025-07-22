// import { useState } from 'react';
// import { useParams } from 'react-router-dom';

// export default function AnswerPage() {
//   const { sessionId } = useParams();
//   const [relation, setRelation] = useState('Secret Admirer');
//   const [response, setResponse] = useState('');
//   const [submitted, setSubmitted] = useState(false);

//   const submitAnswer = async () => {
//     const payload = {
//       relationshipType: relation,  // ✅ correct key
//       message: response            // ✅ correct key
//     };

//     await fetch(`http://localhost:8080/sourabh/sessions/${sessionId}/responses`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(payload),
//     });

//     setSubmitted(true);
//   };

//   return (
//     <div className="answer-page">
//       {!submitted ? (
//         <>
//           <h2>🤫 Your secret is safe! Let’s spill the tea...</h2>
//           <select onChange={(e) => setRelation(e.target.value)} value={relation}>
//             <option>Secret Admirer</option>
//             <option>One sided Lover</option>
//             <option>Friend</option>
//             <option>Family</option>
//             <option>Collegue</option>
//             <option>Others</option>
//           </select>
//           <textarea
//             placeholder="Drop your truth bomb 💣 here..."
//             onChange={(e) => setResponse(e.target.value)}
//             value={response}
//           />
//           <button onClick={submitAnswer}>Send Anonymously 🕵️</button>
//         </>
//       ) : (
//         <>
//           <h3>🎉 Response Submitted!</h3>
//           <img src={`/assets/gifs/${relation.toLowerCase().replace(/\s+/g, '_')}.gif`} alt="funny gif" />
//           <p>😏 Wanna create your own? <a href="/">Click here</a></p>
//         </>
//       )}
//     </div>
//   );
// }


import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Background from './Background'; // 3D balls component
import './../styles/global.css'; // Make sure this contains the new styles (see below)

export default function AnswerPage() {
  const { sessionId } = useParams();
  const [relation, setRelation] = useState('Secret Admirer');
  const [response, setResponse] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const submitAnswer = async () => {
    const payload = {
      relationshipType: relation,
      message: response,
    };

    await fetch(`http://localhost:8080/sourabh/sessions/${sessionId}/responses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    setSubmitted(true);
  };

  return (
    <div className="answer-page-wrapper">
      <Background /> {/* 3D Balls Background */}

      <div className="answer-page-content">
        {!submitted ? (
          <>
            <h2 className="emoji">😲 Your secret is safe! Let’s spill the tea...</h2>

            <select
              onChange={(e) => setRelation(e.target.value)}
              value={relation}
              className="relation-dropdown"
            >
              <option>Secret Admirer</option>
              <option>One sided Lover</option>
              <option>Friend</option>
              <option>Family</option>
              <option>Collegue</option>
              <option>Others</option>
            </select>

            <textarea
              placeholder="Drop your truth bomb 💣 here..."
              onChange={(e) => setResponse(e.target.value)}
              value={response}
              className="response-box"
            />

            <button onClick={submitAnswer}>Send Anonymously 🕵️</button>
          </>
        ) : (
          <>
            <h3>🎉 Response Submitted!</h3>
            <img
              className="response-gif"
              src={`/assets/gifs/${relation.toLowerCase().replace(/\s+/g, '_')}.gif`}
              alt="Relationship GIF"
            />
            <p>😏 Wanna create your own? <a href="/">Click here</a></p>
          </>
        )}
      </div>
    </div>
  );
}
