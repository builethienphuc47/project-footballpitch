import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { API_SIGN_UP } from '../../assets/urls/endpoint'

const SignUp = () => {
  let navigate = useNavigate()
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [phone, setPhone] = useState()
  const [password, setPassword] = useState()
  const [disable, setDisable] = useState(true)

  const handleChange = (val, field) => {
    if (field === 'name') {
      setName(val)
    }
    if (field === 'password') {
      setPassword(val)
    }
    if (field === 'email') {
      setEmail(val)
    }
    if (field === 'phone') {
      setPhone(val)
    }
  }

  const handleRegister = () => {
    const url = API_SIGN_UP
    axios
      .post(url, {
        name: name,
        email: email,
        phone: phone,
        password: password,
        isAdmin: false,
      })
      .then(function (response) {
        console.log('SUCCESS: ', response.data)
        navigate('/sign-in')
      })
      .catch(function (error) {
        console.log('ERROR: ', error)
        alert('Lỗi đăng ký, xin vui lòng thử lại!!!')
      })
  }

  useEffect(() => {
    if (name && phone && email && password) {
      setDisable(false)
    } else {
      setDisable(true)
    }
  }, [name, phone, email, password])

  return (
    <div className="w-[100vw] grid place-items-center h-screen">
      <div className="bg-gray-300 w-[400px] h-auto shadow-lg shadow-cyan-500/50 rounded-lg p-5">
        <div className="text-center">
          <p className="font-bold text-xl uppercase text-cyan-800 pb-4">
            Đăng ký
          </p>
        </div>
        <p>Tên khách hàng</p>
        <input
          type="text"
          value={name}
          onChange={(e) => handleChange(e.target.value, 'name')}
          className="w-[100%] border border-slate-500 border-solid h-8 mt-2 px-2 outline-none"
        />
        <p className="mt-2">Số điện thoại</p>
        <input
          type="text"
          value={phone}
          onChange={(e) => handleChange(e.target.value, 'phone')}
          className="w-[100%] border border-slate-500 border-solid h-8 mt-2 px-2 outline-none"
        />
        <p className="mt-2">Email</p>
        <input
          type="text"
          value={email}
          onChange={(e) => handleChange(e.target.value, 'email')}
          className="w-[100%] border border-slate-500 border-solid h-8 mt-2 px-2 outline-none"
        />
        <p className="mt-2">Mật khẩu</p>
        <input
          type="password"
          value={password}
          onChange={(e) => handleChange(e.target.value, 'password')}
          className="w-[100%] border border-slate-500 border-solid h-8 mt-2 px-2 outline-none"
        />
        <div className="text-center mt-4">
          <button
            disabled={disable}
            onClick={handleRegister}
            className="w-[180px] disabled:opacity-75 disabled:cursor-not-allowed font-semibold bg-green-700 py-2 rounded-lg hover:bg-green-600 hover:text-green-200"
          >
            Đăng ký
          </button>
        </div>
      </div>
    </div>
  )
}

export default SignUp
