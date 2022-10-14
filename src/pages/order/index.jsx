import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import { API_ADD_ORDER } from '../../assets/urls/endpoint'
import { TimePicker } from 'react-ios-time-picker'
import { toast } from 'react-toastify'
import moment from 'moment'
import DatePicker from 'react-date-picker'

const Order = () => {
  let navigate = useNavigate()
  const userId = localStorage.getItem('userId')
  const [customerName, setCustomerName] = useState()
  const [phone, setPhone] = useState()
  const [timeOrder, setTimeOrder] = useState()
  const [disable, setDisable] = useState(true)
  const { state } = useLocation()
  const [value, onChange] = useState(new Date())

  const handleChange = (val, field) => {
    if (field === 'customerName') {
      setCustomerName(val)
    }
    if (field === 'phone') {
      setPhone(val)
    }
  }

  useEffect(() => {
    if (customerName && phone && timeOrder && value) {
      setDisable(false)
    } else {
      setDisable(true)
    }
  }, [customerName, phone, timeOrder, value])

  const onChangeTimeOrder = (timeValue) => {
    setTimeOrder(timeValue)
  }

  const handleOrderPitch = () => {
    const url = API_ADD_ORDER
    axios
      .post(url, {
        customerName: customerName,
        phone: phone,
        dateOrder: moment(value).format('DD/MM/YYYY'),
        timeOrder: timeOrder,
        orderStatus: 1,
        pitchName: state?.pitchName,
        pitchSize: state?.pitchSize,
        price: state?.price,
        userId: userId,
      })
      .then(function (response) {
        // handleClearData()
        toast.success(
          `Đặt sân thành công vào ngày ${moment(value).format(
            'DD/MM/YYYY',
          )} vào lúc ${timeOrder}!!!`,
          {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          },
        )
        navigate('/my-pitches')
      })
      .catch(function (error) {
        toast.erorr('Đặt sân thất bại. Thử lại lần sau!!!', {
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

  return (
    <div className="w-[100vw] grid place-items-center h-screen">
      <div className="bg-gray-300 w-[400px] h-auto shadow-lg shadow-cyan-500/50 rounded-lg p-5">
        <div className="text-center">
          <p className="font-bold text-xl uppercase text-cyan-800 pb-4">
            Đặt sân
          </p>
        </div>
        <p>Tên khách đặt sân</p>
        <input
          type="text"
          value={customerName}
          onChange={(e) => handleChange(e.target.value, 'customerName')}
          className="w-[100%] border border-slate-500 border-solid border border-slate-500 border-solid h-8 mt-2 px-2 outline-none"
        />
        <p className="mt-2">Số điện thoại</p>
        <input
          type="number"
          value={phone}
          onChange={(e) => handleChange(e.target.value, 'phone')}
          className="w-[100%] border border-slate-500 border-solid border border-slate-500 border-solid h-8 mt-2 px-2 outline-none"
        />
        <p className="mt-2">Ngày nhận sân</p>
        <DatePicker onChange={onChange} value={value} />
        <p className="mt-2">Giờ nhận sân</p>
        <TimePicker onChange={onChangeTimeOrder} value={timeOrder} />
        <div className="flex justify-between mt-4">
          <button
            disabled={disable}
            onClick={handleOrderPitch}
            className="mr-2 w-[180px] disabled:opacity-75 disabled:cursor-not-allowed font-semibold bg-green-700 py-2 rounded-lg hover:bg-green-600 hover:text-green-200"
          >
            Đặt sân
          </button>
          <button
            onClick={() => navigate('/')}
            className="ml-2 w-[180px] font-semibold bg-gray-200 py-2 rounded-lg hover:bg-gray-400"
          >
            Huỷ
          </button>
        </div>
      </div>
    </div>
  )
}

export default Order
