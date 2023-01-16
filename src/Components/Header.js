import React from 'react'
import logo from "../assets/images/logo.jpg";

const Header = () => {
  return (
    <div className='app__header'>
         <img className="app__headerImage" src={logo} alt="logo" />
    </div>
  )
}

export default Header