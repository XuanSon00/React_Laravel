import React from 'react'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SubjectIcon from '@mui/icons-material/Subject';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ListIcon from '@mui/icons-material/List';
import ReceiptIcon from '@mui/icons-material/Receipt';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HowToRegSharpIcon from '@mui/icons-material/HowToRegSharp';
import SchoolIcon from '@mui/icons-material/School';
import PaidIcon from '@mui/icons-material/Paid';
import HomeIcon from '@mui/icons-material/Home';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
const SidebarData = [
    {
        title: "Home",
        icon: <HomeIcon />,
        link: '/'  
    },
    {
        title: "Admin",
        icon: <AdminPanelSettingsIcon />,
        link: '/admin/dashboard'  
    },
    {
        title: "Loại tài khoản",
        icon: <SupervisorAccountIcon />,
        link: '/admin/accountType'
    },
    {
        title: "Tài khoản",
        icon: <AccountBoxIcon />,
        link: '/admin/account'
    },
    {
        title: "Loại hình giáo dục",
        icon: <SchoolIcon />,
        link: '/admin/educationType'
    },
    {
        title: "Khóa học",
        icon: <SubjectIcon />,
        link: '/admin/subject'
    },
    {
        title: "Bài học",
        icon: <ImportContactsIcon />,
        link: '/admin/lesson'
    },
    {
        title: "Lớp học",
        icon: <CalendarMonthIcon />,
        link: '/admin/date'
    },
    {
        title: "Danh sách lớp",
        icon: <ListIcon />,
        link: '/admin/list'
    },
    {
        title: "Logout",
        icon: <LogoutIcon />,
        action: 'logout'
    },
]
/******************************************/

const TotalUser = ({ totalUsers, lastUpdated }) => (
    <div className='total-user'>
        <div className='total-user-up'>
            <div className='total-user-up-left'>
                <h3>Người dùng</h3>
                <p>{totalUsers}</p>
            </div>
            <div className='total-user-up-right'><AccountCircleIcon /></div>
        </div>
        <div className='total-user-down'>
            <h3>Lần cập nhật cuối:</h3>
            <p>{lastUpdated}</p>
        </div>
    </div>
)

const TotalSubject = ({ totalSubjects, lastUpdated }) => (
    <div className='total-subject'>
        <div className='total-subject-up'>
            <div className='total-subject-up-left'>
                <h3>Môn học</h3>
                <p>{totalSubjects}</p>
            </div>
            <div className='total-subject-up-right'><SubjectIcon /></div>
        </div>
        <div className='total-subject-down'>
            <h3>Lần cập nhật cuối:</h3>
            <p>{lastUpdated}</p>
        </div>
    </div>
)

const TotalStudent = ({ totalStudents, lastUpdated }) => (
    <div className='total-student'>
        <div className='total-student-up'>
            <div className='total-student-up-left'>
                <h3>Học sinh</h3>
                <p>{totalStudents}</p>
            </div>
            <div className='total-student-up-right'><HowToRegSharpIcon /></div>
        </div>
        <div className='total-student-down'>
            <h3>Lần cập nhật cuối:</h3>
            <p>{lastUpdated}</p>
        </div>
    </div>
)

const TotalTeacher = ({ totalTeachers, lastUpdated }) => (
    <div className='total-teacher'>
        <div className='total-teacher-up'>
            <div className='total-teacher-up-left'>
                <h3>Giảng viên</h3>
                <p>{totalTeachers}</p>
            </div>
            <div className='total-teacher-up-right'><SchoolIcon /></div>
        </div>
        <div className='total-teacher-down'>
            <h3>Lần cập nhật cuối:</h3>
            <p>{lastUpdated}</p>
        </div>
    </div>
);

const TotalPrice = ({ totalPrices, lastUpdated }) => (
    <div className='total-price'>
        <div className='total-price-up'>
            <div className='total-price-up-left'>
                <h3>Thanh Toán</h3>
                <p>{totalPrices.toLocaleString()} <sup>vnđ</sup></p>
            </div>
            <div className='total-price-up-right'><PaidIcon /></div>
        </div>
        <div className='total-price-down'>
            <h3>Lần cập nhật cuối:</h3>
            <p>{lastUpdated}</p>
        </div>
    </div>
);






export {SidebarData, TotalUser, TotalSubject, TotalStudent,TotalTeacher, TotalPrice, }