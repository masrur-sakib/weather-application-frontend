import { Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage/Homepage';
import './App.css';
import { GProvider } from './components/Contexts/GContext';
import Predict from './components/Predict/Predict';

function App() {
  return (
    <div className='min-h-screen bg-blue-200'>
      <GProvider>
        <Routes>
          <Route path='/' element={<Predict />}></Route>
          <Route path='/summary' element={<Homepage />}></Route>
        </Routes>
      </GProvider>
    </div>
  );
}

export default App;
