import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';
import AnimationRoutes from './components/animation/AnimationRoutes';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <AnimationRoutes />
      </Router>
    </div>
  );
}

export default App;
