import React, { useContext, useState } from 'react'
import './sidebar.css'
import { SidebarData } from './sidebarData'
import { UserContext } from '../context/useContext'
import MenuIcon from '@mui/icons-material/Menu';

const Sidebar = () => {
  const { logout } = useContext(UserContext)
  const handleClick = (val) => {
    if (val.action === 'logout') {
      logout();
    } else {
      window.location.pathname = val.link; 
    }
  };
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
    <div className='sidebar-user' style={{width: isOpen ? "250px":"50px", transition: isOpen ? "0.5s":"0.5s"}}>
      <div className='userInfo'>
        <h3 style={{display: isOpen ? "block" :"none" }}>User</h3>
        <MenuIcon onClick={toggle} style={{marginLeft: isOpen ? "50px": "0px", transition: isOpen ? "0.5s":"0.5s"}}/>
      </div>
      <ul className='sidebarList'>
          {SidebarData.map((val,key) =>{
              return(
                  <li key ={key} className='listData' id={window.location.pathname === val.link ? "active" : ""} onClick={() => handleClick(val)}>
                      <div className='icon'>{val.icon}</div>
                      <div className='title' style={{display: isOpen ? "block" : "none",transition: isOpen ? "0.5s":"0.5s" }}>{val.title}</div>
                  </li>
              )
          })}
      </ul>
  </div>
</>
  )
}

export default Sidebar
