import React from 'react'
import { dummyEducatorData } from '../../assets/assets'
import{UserButton,useUser} from '@clerk/clerk-react'
import colored_logo from '../../assets/favicon.png'
import { Link } from 'react-router-dom'
import "../../styles/Navbar.css";
import { User } from 'lucide-react'

const Navbar = () => {
  const educatorData = dummyEducatorData;
  const{user}=useUser()
  return (
    <div className='parent_contributor_nav'>
      <Link to='/'>
      <img src={colored_logo} className='logo'/>
      </Link>
      <div className='contributor_nav'>
        <p>Hi! {user?user.fullName:'Developers'}</p>
        {
          user? <UserButton/>:<User />
        }
      </div>
      </div>
  )
}

export default Navbar