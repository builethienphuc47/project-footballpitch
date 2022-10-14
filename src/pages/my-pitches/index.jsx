import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar'
import Loader from '../../components/loader'
import axios from 'axios'
import { API_GET_MY_PITCHES, API_DELTE_ORDER } from '../../assets/urls/endpoint'
import iconTrash from '../../assets/images/trash-bin.png'
import moment from 'moment'
import Modal from 'react-modal'
import { toast } from 'react-toastify'

export const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}

const MyPitches = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [modalIsOpen, setIsOpen] = useState(false)
  const [idOrder, setIdOrder] = useState('')
  const userId = localStorage.getItem('userId')

  const fetchAPI = () => {
    setLoading(true)
    axios
      .get(API_GET_MY_PITCHES + userId)
      .then(function (response) {
        // handle success
        const data = response.data.orders
        console.log('My pitches: ', data)
        setData(data)
        setLoading(false)
      })
      .catch(function (error) {
        // handle error
        setLoading(false)
        console.log(error)
      })
  }

  const handleDeleteOrder = (id) => {
    setLoading(true)
    axios
      .delete(API_DELTE_ORDER + id)
      .then(function (response) {
        // handle success
        setIsOpen(false)
        setLoading(false)
        fetchAPI()
        toast.success('Huỷ sân thành công!!!', {
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
        toast.erorr('Huỷ sân thất bại. Thử lại lần sau!!!', {
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

  const handleOpenDeleteDialog = (id) => {
    setIsOpen(true)
    setIdOrder(id)
  }

  const handleDisableDelete = (item) => {
    const orderTime = item?.dateOrder + ' ' + item?.timeOrder
    const date = new Date().toLocaleString()
    const currentTime = moment(date).format('DD/MM/YYYY HH:mm')
    if (orderTime < currentTime) {
      return (
        <img
          src={iconTrash}
          alt=""
          srcset=""
          className="w-6 h-6 hover:disabled:cursor-not-allowed opacity-50"
        />
      )
    } else {
      return (
        <img
          src={iconTrash}
          onClick={() => handleOpenDeleteDialog(item?._id)}
          alt=""
          srcset=""
          className="w-6 h-6 hover:scale-110 cursor-pointer"
        />
      )
    }
  }

  const onCloseModal = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    fetchAPI()
  }, [])

  return (
    <div>
      <Navbar />
      <div className="p-20 pt-10">
        <p className="text-center my-5 font-bold text-xl uppercase text-cyan-800">
          Sân đã đặt
        </p>
        {loading ? (
          <Loader />
        ) : (
          <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="py-3 px-6">
                    Tên sân
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Ngày đặt
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Giờ đặt
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Kích thước sân
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
                      {item?.pitchName}
                    </th>
                    <td class="py-4 px-6">{item?.dateOrder}</td>
                    <td class="py-4 px-6">{item?.timeOrder}</td>
                    <td class="py-4 px-6">{item?.pitchSize} người/đội</td>
                    <td class="py-4 px-6">{handleDisableDelete(item)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={onCloseModal}
        style={customStyles}
        contentLabel="Example Modal"
        shouldCloseOnOverlayClick={false}
      >
        <h2 className="text-center mb-3 font-bold text-red-800">Hủy đặt sân</h2>
        <p className="font-semibold">Bạn có chắc chắn muốn huỷ sân?</p>
        <div className="flex justify-between mt-4">
          <button
            onClick={() => handleDeleteOrder(idOrder)}
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
    </div>
  )
}

export default MyPitches
