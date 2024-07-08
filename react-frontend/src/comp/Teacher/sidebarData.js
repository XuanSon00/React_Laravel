import React from 'react'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SubjectIcon from '@mui/icons-material/Subject';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ListIcon from '@mui/icons-material/List';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';

export const SidebarData = [
    
    {
        title: "Trang chủ",
        icon: <HomeIcon />,
        link: '/'
    },
    {
        title: "Tài khoản",
        icon: <AccountBoxIcon />,
        link: '/teacher/account'
    },
    {
        title: "Môn học",
        icon: <SubjectIcon />,
        link: '/teacher/subject'
    },
    {
        title: "Danh sách lớp",
        icon: <ListIcon />,
        link: '/teacher/list'
    },
    {
        title: "Logout",
        icon: <LogoutIcon />,
        action: 'logout'
    },

]

