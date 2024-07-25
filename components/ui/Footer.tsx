import { Image } from 'lucide-react'
import React from 'react'
const Footer=({user, type='desktop'}:FooterProps)=>{
    return(
<footer className='footer'>
<div className={ type==='mobile' ? 'footer_name-mobile':'footer_name'}>
    <p className='text-xl font-bold text-gray-700'>
        {user.name[0]}
    </p>
</div>
<div className={ type==='mobile' ? 'footer_name-mobile':'footer_name'}
>
    <h1 className='text-14 truncate font-normal text-gray-700 font-semibold'>
        {user.name}
    </h1>
    <p>{user.email}</p>
</div>
{/* <div className="footer_image">
    <Image src='/icons/logout.svg'  onClick={} fill alt="jsm"/>
</div> */}
</footer>
  )
}

export default Footer
