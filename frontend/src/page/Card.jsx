import React from 'react' 
import { Outlet  } from 'react-router-dom'



function Card() { 
  return (<div className='mx-24'>
      <Outlet />
  </div>)
}
export default Card