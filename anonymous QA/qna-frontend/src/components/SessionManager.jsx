// import { useParams, Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import "./SessionManager.css";

// export default function SessionManager() {
//   const { accessKey } = useParams();
//   const [responses, setResponses] = useState([]);
//   const [session, setSession] = useState(null);

//   useEffect(() => {
//     fetch(`http://localhost:8080/sourabh/manage/${accessKey}`)
//       .then((res) => {
//         if (!res.ok) throw new Error("Invalid access key");
//         return res.json();
//       })
//       .then((data) => {
//         setResponses(data.responses || []);
//         setSession(data.session || {});
//       })
//       .catch((error) => console.error("Error fetching session data:", error));
//   }, [accessKey]);

//   useEffect(() => {
//     const emojiCycle = ["📖", "😄", "🤓", "👀", "😊", "🧐"];
//     let i = 0;
//     const interval = setInterval(() => {
//       const emojiEl = document.getElementById("readingEmoji");
//       if (emojiEl) emojiEl.innerText = emojiCycle[i++ % emojiCycle.length];
//     }, 2000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleEndSession = () => {
//     fetch(`http://localhost:8080/sourabh/manage/${accessKey}/close`, {
//       method: "PATCH",
//     })
//       .then((res) => {
//         if (res.ok) {
//           alert("Session closed");
//           window.location.reload();
//         } else {
//           alert("Error closing session");
//         }
//       })
//       .catch((error) => console.error("Error closing session:", error));
//   };

//   const relationshipCount = responses.reduce((acc, res) => {
//     acc[res.relationshipType] = (acc[res.relationshipType] || 0) + 1;
//     return acc;
//   }, {});

//   return (
//     <div className="session-container">
//       <div className="background-balls"></div>

//       <h1 className="welcome-heading">
//         🌟 Welcome, {session?.name || "Guest"}!
//       </h1>

//       <div
//         style={{
//           fontSize: "3rem",
//           marginBottom: "20px",
//           animation: "float 2s ease-in-out infinite",
//         }}
//       >
//         <span role="img" aria-label="Reading Emoji" id="readingEmoji">
//           📖
//         </span>
//       </div>

//       <p className="subtext">💌 Here are your secret messages!</p>

//       <button onClick={handleEndSession} className="end-button">
//         🚫 End Session
//       </button>

//       <div className="session-box">
//         <h2 className="stat-heading">📊 Relationship Stats</h2>
//         <ul className="stat-list">
//           {Object.entries(relationshipCount).map(([key, value]) => (
//             <li key={key} className="stat-item">
//               <span className="stat-key">{key}</span> ➡️{" "}
//               <span className="stat-value">{value}</span>
//             </li>
//           ))}
//         </ul>

//         <h2 className="msg-heading">💬 Messages</h2>
//         {responses.length === 0 && <p className="no-msg">No messages yet!</p>}
//         {responses.map((res, index) => (
//           <div key={index} className="message-box">
//             <strong className="res-key">{res.relationshipType}</strong>:{" "}
//             <span className="res-value">{res.message}</span>
//           </div>
//         ))}
//       </div>

//       <Link to="/" className="home-link">
//         🏠 Back to Home
//       </Link>
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import "./SessionManager.css";
// import { Link } from "react-router-dom"; // ✅ Import this at the top

// export default function ManageResponses() {
//   const { accessKey } = useParams();
//   const [session, setSession] = useState(null);
//   const [responses, setResponses] = useState([]);

//   useEffect(() => {
//     fetch(`http://localhost:8080/sourabh/manage/${accessKey}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setSession(data.session);
//         setResponses(data.responses);
//       });
//   }, [accessKey]);

//   return (
//     <div className="manage-container">
//       <div className="floating-leaves"></div>
//       <div className="emoji-cloud">
//         <span>😂</span>
//         <span>😍</span>
//         <span>🤔</span>
//         <span>🥰</span>
//         <span>😎</span>
//       </div>

//       <div className="content">
//         {session ? (
//           <>
//             <h1>🌟 Responses for {session.name}</h1>
//             <p className="session-desc">{session.description}</p>
//             <div className="responses-list">
//               {responses.length > 0 ? (
//                 responses.map((res, idx) => (
//                   <div key={res.id} className="response-card">
//                     <div className="meta">
//                       <span className="relation-tag">
//                         {res.relationshipType}
//                       </span>
//                       <span className="timestamp">
//                         {new Date(res.createdAt).toLocaleString()}
//                       </span>
//                     </div>
//                     <p className="message">💬 {res.message}</p>
//                   </div>
//                 ))
//               ) : (
//                 <p>No responses yet 😢</p>
//               )}
//             </div>
//           </>
//         ) : (
//           <p>Loading session...</p>
//         )}
//       </div>
//       <Link to="/" className="go-home-link">
//         🏠 Go Back to Home
//       </Link>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./SessionManager.css";

export default function ManageResponses() {
  const { accessKey } = useParams();
  const [session, setSession] = useState(null);
  const [responses, setResponses] = useState([]);
  const [relationshipStats, setRelationshipStats] = useState({});

  useEffect(() => {
    fetch(`http://localhost:8080/sourabh/manage/${accessKey}`)
      .then((res) => res.json())
      .then((data) => {
        setSession(data.session);
        setResponses(data.responses);

        const stats = {};
        data.responses.forEach((res) => {
          const rel = res.relationshipType;
          stats[rel] = (stats[rel] || 0) + 1;
        });
        setRelationshipStats(stats);
      });
  }, [accessKey]);

  return (
    <div className="manage-container">
      <div className="floating-leaves"></div>

      {/* Emoji Cloud on Top Right */}
      <div className="emoji-cloud">
        <span>😂</span>
        <span>😍</span>
        <span>🤔</span>
        <span>🥰</span>
        <span>😎</span>
      </div>

      {/* Relationship Summary on Right Side */}
      {Object.keys(relationshipStats).length > 0 && (
        <div className="relationship-stats-floating">
          <h3>👥 Responses by Relationship Type:</h3>
          <ul>
            {Object.entries(relationshipStats).map(([type, count]) => (
              <li key={type}>
                <strong>{type}:</strong> {count}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Main Content Box */}
      <div className="content">
        {session ? (
          <>
            <h1>🌟 Responses for {session.name}</h1>
            <p className="session-desc">{session.description}</p>

            <div className="responses-list">
              {responses.length > 0 ? (
                responses.map((res) => (
                  <div key={res.id} className="response-card">
                    <div className="meta">
                      <span className="relation-tag">{res.relationshipType}</span>
                      <span className="timestamp">
                        {new Date(res.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <p className="message">💬 {res.message}</p>
                  </div>
                ))
              ) : (
                <p>No responses yet 😢</p>
              )}
            </div>
          </>
        ) : (
          <p>Loading session...</p>
        )}
      </div>

      {/* Home Link on Bottom Right */}
      <Link to="/" className="go-home-link">
        🏡 Go Back to Home
      </Link>
    </div>
  );
}


