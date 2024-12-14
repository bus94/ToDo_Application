import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Cando from "./component/Cando";

function App() {
  return (
    <Router>
      <div className='App'>
        {/* 라우트 설정 */}
        <Routes>
          <Route path="/cando" element={<Cando />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;