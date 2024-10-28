import React from 'react'
import { useTheme } from '../Context/Theme'

const Navbar = () => {
  const [theme,toggleTheme] = useTheme();


  return (
    <div className='py-5 shadow-xl px-8 flex justify-between header'>
        <h1 className=' font-bold'>Where in the world?</h1>
        <button className='font-bold' onClick={toggleTheme}>Dark</button>
    </div>
  )
}

export default Navbar