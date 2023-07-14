import { useState } from 'react'
import ReactDOM from 'react-dom/client'
import '@picocss/pico'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
  <main className='container'>
    <h1>Hello world!</h1> </main>
    </>
  )
}

export default App
