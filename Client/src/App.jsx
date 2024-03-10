import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Canvas from './Pages/canvas.jsx'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
          <Route index element={<Canvas/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
