import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'

function App() {

  return (
    <div className='App'>
      <BrowserRouter>
      {/* header of navbar component here */}
        <div className='pages'>
          <Routes>
          {/* pages here wrapped with Route*/}
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
