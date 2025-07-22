// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Welcome from './components/Welcome';
// import AskQuestion from './components/AskQuestion';
// import SessionManager from './components/SessionManager';
// import AnswerPage from './components/AnswerPage';
// import './styles/global.css';
// import Background from "./components/Background";

// function App() {
//   return (
//     <Router>
//       <Background />
//       <Routes>
//         <Route path="/" element={<Welcome />} />
//         <Route path="/ask/:name" element={<AskQuestion />} />
//         <Route path="/session/:sessionId" element={<SessionManager />} />
//         <Route path="/answer/:sessionId" element={<AnswerPage />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './components/Welcome';
import AskQuestion from './components/AskQuestion';
import SessionManager from './components/SessionManager';
import AnswerPage from './components/AnswerPage';
import './styles/global.css';
import Background from "./components/Background";

function App() {
  return (
    <Router>
      <Background />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/ask/:name/:gender" element={<AskQuestion />} /> {/* ✅ updated */}
        <Route path="/session/:accessKey" element={<SessionManager />} />
        <Route path="/answer/:sessionId" element={<AnswerPage />} />
      </Routes>
    </Router>
  );
}

export default App;
