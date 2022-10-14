import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import iconFootball from '../../assets/images/football.png'

const Navbar = () => {
  const navigate = useNavigate()
  const userId = localStorage.getItem('userId')
  const isAdmin = localStorage.getItem('isAdmin')

  const handleLogout = () => {
    localStorage.clear()
    navigate('/')
    window.location.reload()
  }

  return (
    <div className="flex justify-between bg-slate-400 h-10 w-full fixed z-10 px-20 pt-2">
      <div>
        <Link to="/">
          <img
            src={iconFootball}
            alt=""
            srcset=""
            className="w-6 h-6 cursor-pointer"
          />
        </Link>
      </div>
      <div className="flex justify-between">
        <Link
          to="/"
          className="px-2 md:px-3 lg:px-4 min-w-[40px] truncate hover:text-green-700 text-lime-100 font-semibold"
        >
          TRANG CHỦ
        </Link>
        {/* <Link
          to="/intro"
          className="px-2 md:px-3 lg:px-4 min-w-[40px] truncate hover:text-green-700 text-lime-100 font-semibold"
        >
          GIỚI THIỆU
        </Link> */}
        {isAdmin !== 'true' && userId && (
          <Link
            to="/my-pitches"
            className="px-2 md:px-3 lg:px-4 min-w-[40px] truncate hover:text-green-700 text-lime-100 font-semibold"
          >
            SÂN CỦA TÔI
          </Link>
        )}
        {isAdmin === 'true' && (
          <Link
            to="/users-management"
            className="px-2 md:px-3 lg:px-4 min-w-[40px] truncate hover:text-green-700 text-lime-100 font-semibold"
          >
            QUẢN LÝ TÀI KHOẢN
          </Link>
        )}
        {isAdmin === 'true' && (
          <Link
            to="/pitches-management"
            className="px-2 md:px-3 lg:px-4 min-w-[40px] truncate hover:text-green-700 text-lime-100 font-semibold"
          >
            QUẢN LÝ SÂN
          </Link>
        )}
        {isAdmin === 'true' && (
          <Link
            to="/orders-management"
            className="px-2 md:px-3 lg:px-4 min-w-[40px] truncate hover:text-green-700 text-lime-100 font-semibold"
          >
            QUẢN LÝ LỊCH ĐẶT
          </Link>
        )}
        {userId ? (
          <Link
            className="px-2 md:px-3 lg:px-4 min-w-[40px] truncate hover:text-green-700 text-lime-100 font-semibold"
            onClick={handleLogout}
          >
            ĐĂNG XUẤT
          </Link>
        ) : (
          <Link
            to="/sign-in"
            className="px-2 md:px-3 lg:px-4 min-w-[40px] truncate hover:text-green-700 text-lime-100 font-semibold"
          >
            ĐĂNG NHẬP
          </Link>
        )}
        {!userId && (
          <Link
            to="/sign-up"
            className="px-2 md:px-3 lg:px-4 min-w-[40px] truncate hover:text-green-700 text-lime-100 font-semibold"
          >
            ĐĂNG KÝ
          </Link>
        )}
      </div>
    </div>
  )
}

export default Navbar
