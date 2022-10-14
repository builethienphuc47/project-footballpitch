import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { API_SIGN_IN } from '../../assets/urls/endpoint'

const SignIn = () => {
  let navigate = useNavigate()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [disable, setDisable] = useState(true)

  const handleChange = (val, field) => {
    if (field === 'email') {
      setEmail(val)
    }
    if (field === 'password') {
      setPassword(val)
    }
  }

  const handleLogin = () => {
    const url = API_SIGN_IN
    axios
      .post(url, {
        email: email,
        password: password,
      })
      .then(function (response) {
        console.log('SUCCESS: ', response.data)
        localStorage.setItem('userId', response?.data?.userId)
        localStorage.setItem('isAdmin', response?.data?.isAdmin)
        navigate('/')
      })
      .catch(function (error) {
        console.log('ERROR: ', error)
        alert('Lỗi đăng nhập, xin vui lòng thử lại!!!')
      })
  }

  useEffect(() => {
    if (email && password) {
      setDisable(false)
    } else {
      setDisable(true)
    }
  }, [email, password])

  return (
    <div className="w-[100vw] grid place-items-center h-screen">
      <div className="bg-gray-300 w-[400px] h-auto shadow-lg shadow-cyan-500/50 rounded-lg p-5">
        <div className="text-center">
          <p className="font-bold text-xl uppercase text-cyan-800 pb-4">
            Đăng nhập
          </p>
        </div>
        <p>Email</p>
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
            onClick={handleLogin}
            className="w-[180px] disabled:opacity-75 disabled:cursor-not-allowed font-semibold bg-green-700 py-2 rounded-lg hover:bg-green-600 hover:text-green-200"
          >
            Đăng nhập
          </button>
        </div>
      </div>
    </div>
  )
}

export default SignIn
