
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar'
import Locations from './components/Locations';
import Demographics from './components/Demographics';
import Trials from './components/Trials';
import Navbar from './components/Navbar';
import Home from './components/Home';


function App() {
  
  

  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-grow bg-gray-300 ">
          <Navbar />
          <div>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path="/locations" element={<Locations />} />
              <Route path="/demographics" element={<Demographics />} />
              <Route path="/trials" element={<Trials />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App
