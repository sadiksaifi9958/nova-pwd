import { useState, useCallback, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [number, setNumber] = useState(false)
  const [char, setChar] = useState(false)
  const [password, setPassword] = useState("")

  const passRef = useRef(null)

  const passGen = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (number) str += "0123456789"
    if (char) str += ".@#$%&_"

    for (let i=1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)

      pass += str.charAt(char);
    }

    setPassword(pass)

  }, [length, number, char, setPassword])

  const CopyPass = useCallback((e) => {
    passRef.current?.select();
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passGen()
  }, [length, number, char, passGen])


  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700'>
        <h1 className='text-white text-center my-3'>Password Generator</h1>

        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text" value={password} className='bg-white    outline-none w-full py-1 px-3 text-black' placeholder='Password' readOnly ref={passRef}/>
          <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 cursor-pointer' onClick={CopyPass}>Copy</button>
        </div>

        <div className='flex text-sm gap-x-2'>

          <input type="range" min={6} max={30} value={length} className='cursor-pointer' onChange={(e) => {setLength(e.target.value)}} />
          <label>Length: {length}</label>

          <input type="checkbox" defaultChecked={number} id="numberInput" onChange={() => {setNumber((prev) => !prev)}} />
          <label htmlFor='numberInput'>Numbers</label>

          <input type="checkbox" defaultChecked={char} id="charInput" onChange={() => {setChar((prev) => !prev)}} />
          <label htmlFor='charInput'>Characters</label>

        </div>
      </div>
    </>
  )
}

export default App
