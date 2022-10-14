import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar'
import PitchCard from '../../components/pitch-card'
import Loader from '../../components/loader'
import axios from 'axios'
import {
  API_GET_PITCHES_MANAGEMENT,
  API_ADD_PITCH,
} from '../../assets/urls/endpoint'
import Modal from 'react-modal'
import { toast } from 'react-toastify'
import { customStyles } from '../my-pitches'

const PitchesManagement = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [modalIsOpenAdd, setIsOpenAdd] = useState(false)
  const [pitchName, setPitchName] = useState()
  const [pitchSize, setPitchSize] = useState()
  const [information, setInformation] = useState()
  const [price, setPrice] = useState()
  const [disable, setDisable] = useState(true)

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
    if (pitchName && pitchSize && price && information) {
      setDisable(false)
    } else {
      setDisable(true)
    }
  }, [pitchName, pitchSize, price, information])

  const handleClearData = () => {
    setIsOpenAdd(false)
    setPitchName('')
    setPrice('')
    setPitchSize('')
    setInformation('')
  }

  const fetchAPI = () => {
    setLoading(true)
    axios
      .get(API_GET_PITCHES_MANAGEMENT)
      .then(function (response) {
        // handle success
        const data = response.data.pitches
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

  const handleCreatePitch = () => {
    setLoading(true)
    const url = API_ADD_PITCH
    axios
      .post(url, {
        pitchName: pitchName,
        pitchSize: pitchSize,
        price: price,
        information: information,
      })
      .then(function (response) {
        setLoading(false)
        setIsOpenAdd(false)
        handleClearData()
        toast.success('Thêm sân thành công!!!', {
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
        setLoading(false)
        toast.erorr('Thêm sân thất bại. Thử lại lần sau!!!', {
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

  useEffect(() => {
    fetchAPI()
  }, [])

  return (
    <div>
      <Navbar />
      <div className="p-20 pt-10">
        <p className="text-center my-5 font-bold text-xl uppercase text-cyan-800">
          Quản lý sân bóng
        </p>
        <div className="flex justify-between mb-8">
          <div />
          <button
            onClick={() => setIsOpenAdd(true)}
            className="w-[200px] font-semibold bg-green-700 py-2 rounded-lg hover:bg-green-600 hover:text-green-200"
          >
            Thêm sân
          </button>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-10">
            {data?.map((item) => (
              <div key={item?._id} className="px-3">
                <PitchCard
                  isShowInHome={false}
                  data={item}
                  refetchApi={fetchAPI}
                />
              </div>
            ))}
          </div>
        )}
      </div>
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
              Thêm mới sân
            </p>
          </div>
          <p>Tên sân</p>
          <input
            type="text"
            value={pitchName}
            onChange={(e) => handleChange(e.target.value, 'pitchName')}
            className="w-[100%] border border-slate-500 border-solid h-8 mt-2 px-2 outline-none"
          />
          <p className="mt-2">Kích thước (người/đội)</p>
          <input
            type="number"
            value={pitchSize}
            onChange={(e) => handleChange(e.target.value, 'pitchSize')}
            className="w-[100%] border border-slate-500 border-solid h-8 mt-2 px-2 outline-none"
          />
          <p className="mt-2">Giá</p>
          <input
            type="number"
            value={price}
            onChange={(e) => handleChange(e.target.value, 'price')}
            className="w-[100%] border border-slate-500 border-solid h-8 mt-2 px-2 outline-none"
          />
          <p className="mt-2">Thông tin thêm</p>
          <input
            type="text"
            value={information}
            onChange={(e) => handleChange(e.target.value, 'information')}
            className="w-[100%] border border-slate-500 border-solid h-8 mt-2 px-2 outline-none"
          />
          <div className="flex justify-between mt-4">
            <button
              disabled={disable}
              onClick={handleCreatePitch}
              className="mr-2 w-[180px] disabled:opacity-75 disabled:cursor-not-allowed font-semibold bg-green-700 py-2 rounded-lg hover:bg-green-600 hover:text-green-200"
            >
              Thêm sân
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
    </div>
  )
}

export default PitchesManagement
