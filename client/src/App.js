import './App.css';

import {Route,Routes} from 'react-router-dom'
import HomePage from './pages/HomePage'
import ChatPage from './pages/ChatPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
    <div className="App">
      <Routes>
        <Route path='/' Component={HomePage}/>
        <Route path='/chats' Component={ChatPage}/>
      </Routes>
      <ToastContainer />
    </div>
    </>
  );
}

export default App;
