import React, { useState, useEffect } from 'react'
import pitch from '../../assets/images/pitch1.jpeg'
import iconEdit from '../../assets/images/pencil.png'
import iconTrash from '../../assets/images/trash-bin.png'
import axios from 'axios'
import { API_EDIT_PITCH, API_DELTE_PITCH } from '../../assets/urls/endpoint'
import Modal from 'react-modal'
import { toast } from 'react-toastify'
import { customStyles } from '../../pages/my-pitches'
import { useNavigate } from 'react-router-dom'

const PitchCard = ({ isShowInHome, data, refetchApi }) => {
  const [modalIsOpenEdit, setIsOpenEdit] = useState(false)
  const [modalIsOpenDelete, setIsOpenDelete] = useState(false)
  const [pitchName, setPitchName] = useState()
  const [pitchSize, setPitchSize] = useState()
  const [information, setInformation] = useState()
  const [price, setPrice] = useState()
  const [disable, setDisable] = useState(true)
  const [pitchId, setPitchId] = useState()
  const userId = localStorage.getItem('userId')
  const isAdmin = localStorage.getItem('isAdmin')
  const navigate = useNavigate()

  const handleOpenEditPitch = async (item) => {
    await setPitchId(item?._id)
    await setPitchName(item?.pitchName)
    await setPrice(item?.price)
    await setPitchSize(item?.pitchSize)
    await setInformation(item?.information)
    await setIsOpenEdit(true)
  }

  const handleChange = (val, field) => {
    if (field === 'pitchName') {
      setPitchName(val)
    }
    if (field === 'price') {
      setPrice(val)
    }
    if (field === 'pitchSize') {
      setPitchSize(val)
    }
    if (field === 'information') {
      setInformation(val)
    }
  }

  useEffect(() => {
    if (pitchName && pitchSize && information && price) {
      setDisable(false)
    } else {
      setDisable(true)
    }
  }, [pitchName, pitchSize, information, price])

  const handleClearData = () => {
    setIsOpenEdit(false)
    setPitchId()
    setPitchName('')
    setPrice('')
    setPitchSize('')
    setInformation('')
  }

  const handleEditPitch = () => {
    const url = API_EDIT_PITCH + pitchId
    axios
      .patch(url, {
        pitchName: pitchName,
        pitchSize: pitchSize,
        price: price,
        information: information,
      })
      .then(function (response) {
        handleClearData()
        refetchApi()
        toast.success('Chỉnh sửa thông tin sân thành công!!!', {
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
        toast.erorr('Chỉnh sửa thông tin sân thất bại. Thử lại lần sau!!!', {
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

  const handleDeletePitch = () => {
    axios
      .delete(API_DELTE_PITCH + pitchId)
      .then(function (response) {
        // handle success
        setIsOpenDelete(false)
        setPitchId()
        refetchApi()
        toast.success('Xoá sân thành công!!!', {
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
        setPitchId()
        toast.erorr('Xoá sân thất bại. Thử lại lần sau!!!', {
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
    setIsOpenDelete(true)
    setPitchId(id)
  }

  const handleCloseDeleteDialog = () => {
    setIsOpenDelete(false)
    setPitchId()
  }

  const handleNavigateToOrder = (data) => {
    if (userId && isAdmin !== 'true') {
      navigate('/order-pitch', { state: data })
    }
    if (!userId) {
      console.log('hi')
      toast.error('Bạn cần phải đăng nhập để đặt sân!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
    }
  }

  return (
    <div
      className={`w-[200px] min-w-[200px] h-auto rounded-md p-2 transition ease-in-out delay-50 bg-slate-200 ${
        isShowInHome &&
        'hover:-translate-y-1 hover:scale-105 hover:bg-emerald-200'
      } duration-300 mx-3`}
      onClick={() => handleNavigateToOrder(data)}
    >
      <div className="w-15 h-[123px] bg-slate-500">
        <img src={pitch} alt="" srcset="" />
      </div>
      <div className="mt-1">
        <p>Tên sân: {data?.pitchName}</p>
        <p>Kích thước: {data?.pitchSize} người/đội </p>
        <p>
          Giá thuê: <span className="text-red-500"> {data?.price} VNĐ</span>
        </p>
      </div>
      {!isShowInHome && (
        <div className="flex justify-between my-2 px-3">
          <img
            src={iconEdit}
            onClick={() => handleOpenEditPitch(data)}
            alt=""
            srcset=""
            className="w-6 h-6 hover:scale-110 cursor-pointer"
          />
          <img
            src={iconTrash}
            onClick={() => handleOpenDeleteDialog(data?._id)}
            alt=""
            srcset=""
            className="w-6 h-6 hover:scale-110 cursor-pointer"
          />
        </div>
      )}
      <Modal
        isOpen={modalIsOpenEdit}
        onRequestClose={() => setIsOpenEdit(false)}
        style={customStyles}
        contentLabel="Example Modal"
        shouldCloseOnOverlayClick={false}
      >
        <div className="bg-gray-300 w-[400px] h-auto shadow-lg shadow-cyan-500/50 rounded-lg p-5">
          <div className="text-center">
            <p className="font-bold text-xl uppercase text-cyan-800 pb-4">
              Chỉnh sửa thông tin sân
            </p>
          </div>
          <p>Tên sân</p>
          <input
            type="text"
            value={pitchName}
            onChange={(e) => handleChange(e.target.value, 'pitchName')}
            className="w-[100%] border border-slate-500 border-solid border border-slate-500 border-solid h-8 mt-2 px-2 outline-none"
          />
          <p className="mt-2">Kích thước (người/đội)</p>
          <input
            type="number"
            value={pitchSize}
            onChange={(e) => handleChange(e.target.value, 'pitchSize')}
            className="w-[100%] border border-slate-500 border-solid border border-slate-500 border-solid h-8 mt-2 px-2 outline-none"
          />
          <p className="mt-2">Giá</p>
          <input
            type="number"
            value={price}
            onChange={(e) => handleChange(e.target.value, 'price')}
            className="w-[100%] border border-slate-500 border-solid border border-slate-500 border-solid h-8 mt-2 px-2 outline-none"
          />
          <p className="mt-2">Thông tin thêm</p>
          <input
            type="text"
            value={information}
            onChange={(e) => handleChange(e.target.value, 'information')}
            className="w-[100%] border border-slate-500 border-solid border border-slate-500 border-solid h-8 mt-2 px-2 outline-none"
          />
          <div className="flex justify-between mt-4">
            <button
              disabled={disable}
              onClick={handleEditPitch}
              className="mr-2 w-[180px] disabled:opacity-75 disabled:cursor-not-allowed font-semibold bg-green-700 py-2 rounded-lg hover:bg-green-600 hover:text-green-200"
            >
              Cập nhật
            </button>
            <button
              onClick={handleClearData}
              className="ml-2 w-[180px] font-semibold bg-gray-200 py-2 rounded-lg hover:bg-gray-300"
            >
              Huỷ
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={modalIsOpenDelete}
        onRequestClose={handleCloseDeleteDialog}
        style={customStyles}
        contentLabel="Example Modal"
        // shouldCloseOnOverlayClick={false}
      >
        <h2 className="text-center mb-3 font-bold text-red-800">Xoá sân</h2>
        <p className="font-semibold">Bạn có chắc chắn muốn xoá sân này?</p>
        <div className="flex justify-between mt-4">
          <button
            onClick={handleDeletePitch}
            className="w-[90px] font-semibold bg-green-700 py-2 rounded-lg hover:bg-green-600 hover:text-green-200"
          >
            Có
          </button>
          <button
            onClick={handleCloseDeleteDialog}
            className="w-[90px] font-semibold bg-gray-200 py-2 rounded-lg hover:bg-gray-300"
          >
            Không
          </button>
        </div>
      </Modal>
    </div>
  )
}

export default PitchCard
