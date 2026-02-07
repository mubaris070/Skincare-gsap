import './App.css'
import { ScrollTrigger, SplitText } from 'gsap/all'
import gsap from 'gsap'
import { BrowserRouter } from 'react-router-dom'
import Routing from './Routing'
gsap.registerPlugin(ScrollTrigger,SplitText)


function App() {
  return (
  <>
    
    <BrowserRouter>
    <Routing />
    </BrowserRouter>

  
  </>
  )
}

export default App

