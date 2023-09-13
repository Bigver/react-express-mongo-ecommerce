import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone } from '@fortawesome/free-solid-svg-icons'


const Footer = () => {
  return (
    <div className='footer-container'>
      <div className="footer">
        <h1>WEBSITE MODEL1 2023</h1>
        <p className='h1'>
          <FontAwesomeIcon icon={faPhone} style={{color: "#62df6b",}} size='' />
          <span>0834633494</span>
        </p>    
      </div>
    </div>
  )
}

export default Footer