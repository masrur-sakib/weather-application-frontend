import { Routes, Route } from 'react-router-dom';
import './App.css';
import TemperaturePrediction from './components/Prediction/TemperaturePrediction';
import FloodPrediction from './components/Prediction/FloodPrediction';

function App() {
  return (
    <div className='min-h-screen bg-blue-200'>
      <Routes>
        <Route path='/' element={<TemperaturePrediction />}></Route>
        <Route path='/flood-prediction' element={<FloodPrediction />}></Route>
      </Routes>
    </div>
  );
}

export default App;
