import { useState } from 'react'
import './App.css'
import ContentFilterView from './pages/ContentFilterView'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <ContentFilterView/>
    </>
  )
}

export default App
