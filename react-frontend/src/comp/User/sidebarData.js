import React, { useContext } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SubjectIcon from '@mui/icons-material/Subject';
import ReceiptIcon from '@mui/icons-material/Receipt';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';


export const SidebarData = [
    {
        title: "Trang chủ",
        icon: <HomeIcon />,
        link: '/'  
    },
    {
        title: "User",
        icon: <AccountCircleIcon />,
        link: '/user/account'  
    },
    {
        title: "Khóa học",
        icon: <SubjectIcon />,
        link: '/user/subject'
    },
    {
        title: "Hóa đơn",
        icon: <ReceiptIcon />,
        link: '/user/recipt'
    },
    {
        title: "Logout",
        icon: <LogoutIcon />,
        action: 'logout'
    },

]

