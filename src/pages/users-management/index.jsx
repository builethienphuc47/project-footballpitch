import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar'
import Loader from '../../components/loader'
import axios from 'axios'
import {
  API_GET_USERS_MANAGEMENT,
  API_DELETE_USER,
  API_SIGN_UP,
} from '../../assets/urls/endpoint'
import iconTrash from '../../assets/images/trash-bin.png'
import Modal from 'react-modal'
import { toast } from 'react-toastify'
import { customStyles } from '../my-pitches'

const UsersManagement = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [modalIsOpenDelete, setIsOpenDelete] = useState(false)
  const [modalIsOpenAdd, setIsOpenAdd] = useState(false)
  const [idOrder, setIdOrder] = useState('')
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

  useEffect(() => {
    if (name && phone && email && password) {
      setDisable(false)
    } else {
      setDisable(true)
    }
  }, [name, phone, email, password])

  const fetchAPI = () => {
    setLoading(true)
    axios
      .get(API_GET_USERS_MANAGEMENT)
      .then(function (response) {
        // handle success
        const data = response.data.users
        console.log('Management: ', data)
        setData(data.reverse())
        setLoading(false)
      })
      .catch(function (error) {
        // handle error
        setLoading(false)
        console.log(error)
      })
  }

  const handleOpenDeleteDialog = (id) => {
    setIsOpenDelete(true)
    setIdOrder(id)
  }

  const handleClearData = () => {
    setName('')
    setPassword('')
    setEmail('')
    setPhone('')
  }

  const handleDeleteUser = (id) => {
    setLoading(true)
    axios
      .delete(API_DELETE_USER + id)
      .then(function (response) {
        // handle success
        setIsOpenDelete(false)
        setLoading(false)
        fetchAPI()
        toast.success('Xoá tài khoản thành công!!!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
      })
      .catch(function (error) {
        // handle error
        setLoading(false)
        console.log(error)
        toast.erorr('Xoá tài khoản thất bại. Thử lại lần sau!!!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
      })
  }

  const handleRegister = () => {
    setLoading(true)
    const url = API_SIGN_UP
    axios
      .post(url, {
        name: name,
        email: email,
        phone: phone,
        password: password,
        isAdmin: true,
      })
      .then(function (response) {
        setLoading(false)
        handleClearData()
        setIsOpenAdd(false)
        toast.success('Thêm tài khoản nhân viên thành công!!!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
        fetchAPI()
      })
      .catch(function (error) {
        setIsOpenAdd(false)
        handleClearData()
        setLoading(false)
        toast.erorr('Thêm tài khoản nhân viên thất bại. Thử lại lần sau!!!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
      })
  }

  const onCloseModal = () => {
    setIsOpenDelete(false)
  }

  useEffect(() => {
    fetchAPI()
  }, [])

  return (
    <div>
      <Navbar />
      <div className="p-20 pt-10">
        <p className="text-center my-5 font-bold text-xl uppercase text-cyan-800">
          Quản lý tài khoản
        </p>
        <div className="flex justify-between mb-8">
          <div />
          <button
            onClick={() => setIsOpenAdd(true)}
            className="w-[200px] font-semibold bg-green-700 py-2 rounded-lg hover:bg-green-600 hover:text-green-200"
          >
            Thêm tài khoản
          </button>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="py-3 px-6">
                    Tên người dùng
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Email
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Số điện thoại
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Vai trò
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.map((item) => (
                  <tr
                    key={item?._id}
                    class="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item?.name}
                    </th>
                    <td class="py-4 px-6">{item?.email}</td>
                    <td class="py-4 px-6">{item?.phone}</td>
                    <td
                      class={`py-4 px-6 ${item?.isAdmin && 'text-violet-700'}`}
                    >
                      {item?.isAdmin ? 'Nhân viên' : 'Khách hàng'}
                    </td>
                    <td class="py-4 px-6">
                      <img
                        src={iconTrash}
                        onClick={() => handleOpenDeleteDialog(item?._id)}
                        alt=""
                        srcset=""
                        className="w-6 h-6 hover:scale-110 cursor-pointer"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Modal
        isOpen={modalIsOpenDelete}
        onRequestClose={onCloseModal}
        style={customStyles}
        contentLabel="Example Modal"
        shouldCloseOnOverlayClick={false}
      >
        <h2 className="text-center mb-3 font-bold text-red-800">
          Xoá tài khoản
        </h2>
        <p className="font-semibold">
          Bạn có chắc chắn muốn xoá tài khoản này?
        </p>
        <div className="flex justify-between mt-4">
          <button
            onClick={() => handleDeleteUser(idOrder)}
            className="w-[90px] font-semibold bg-green-700 py-2 rounded-lg hover:bg-green-600 hover:text-green-200"
          >
            Có
          </button>
          <button
            onClick={onCloseModal}
            className="w-[90px] font-semibold bg-gray-200 py-2 rounded-lg hover:bg-gray-300"
          >
            Không
          </button>
        </div>
      </Modal>
      <Modal
        isOpen={modalIsOpenAdd}
        onRequestClose={() => setIsOpenAdd(false)}
        style={customStyles}
        contentLabel="Example Modal"
        shouldCloseOnOverlayClick={false}
      >
        <div className="bg-gray-300 w-[400px] h-auto shadow-lg shadow-cyan-500/50 rounded-lg p-5">
          <div className="text-center">
            <p className="font-bold text-xl uppercase text-cyan-800 pb-4">
              Thêm tài khoản nhân viên
            </p>
          </div>
          <p>Tên nhân viên</p>
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
          <div className="flex justify-between mt-4">
            <button
              disabled={disable}
              onClick={handleRegister}
              className="mr-2 w-[180px] disabled:opacity-75 disabled:cursor-not-allowed font-semibold bg-green-700 py-2 rounded-lg hover:bg-green-600 hover:text-green-200"
            >
              Đăng ký
            </button>
            <button
              onClick={() => setIsOpenAdd(false)}
              className="ml-2 w-[180px] font-semibold bg-gray-200 py-2 rounded-lg hover:bg-gray-300"
            >
              Huỷ
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default UsersManagement
