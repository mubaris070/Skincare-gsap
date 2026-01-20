import './App.css'
import { ScrollTrigger, SplitText } from 'gsap/all'
import gsap from 'gsap'
import AboutUs from './Components/AboutUs'
import Blog from './Components/Blog'
import Contact from './Components/Contact'
import Home from './Components/Home'
import Navbar from './Components/Navbar'
gsap.registerPlugin(ScrollTrigger,SplitText)


function App() {
  return (
  <>
  <main>
    <Navbar />
  <Home />
  <Blog />
  <AboutUs />
  <Contact />
  </main>
 

  </>
  )
}

export default App

