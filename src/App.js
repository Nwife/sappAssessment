import { BrowserRouter, Routes, Route } from 'react-router-dom';
//styles
import './App.css';

//components
import SignIn from './components/SignIn';
import Signup from './components/Signup';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <SignIn /> } />
          <Route path='/signup' element={ <Signup /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
