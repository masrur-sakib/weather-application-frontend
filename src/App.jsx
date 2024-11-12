import { Routes, Route } from 'react-router-dom';
import './App.css';
import { GProvider } from './components/Contexts/GContext';
import TemperaturePrediction from './components/Prediction/TemperaturePrediction';
import FloodPrediction from './components/Prediction/FloodPrediction';

function App() {
  return (
    <div className='min-h-screen bg-blue-200'>
      <GProvider>
        <Routes>
          <Route path='/' element={<TemperaturePrediction />}></Route>
          <Route path='/flood-prediction' element={<FloodPrediction />}></Route>
        </Routes>
      </GProvider>
    </div>
  );
}

export default App;
