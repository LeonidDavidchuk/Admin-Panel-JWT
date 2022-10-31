import AuthComponent from "./Components/AuthComponent";
import FreeComponent from "./Components/FreeComponent";
import MainComponent from './Components/Main';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainComponent />} />
        <Route path="/free" element={<FreeComponent />} />
        <Route path="/auth" element={<AuthComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
