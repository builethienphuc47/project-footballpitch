import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar'
import Loader from '../../components/loader'
import axios from 'axios'
import { API_GET_ORDERS_MANAGEMENT } from '../../assets/urls/endpoint'
import iconTrash from '../../assets/images/trash-bin.png'

const OrdersManagement = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchAPI = () => {
    setLoading(true)
    axios
      .get(API_GET_ORDERS_MANAGEMENT)
      .then(function (response) {
        // handle success
        const data = response.data.orders
        console.log('Management: ', data)
        setData(data)
        setLoading(false)
      })
      .catch(function (error) {
        // handle error
        setLoading(false)
        console.log(error)
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
          Quản lý lịch sử đặt sân
        </p>
        {loading ? (
          <Loader />
        ) : (
          <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="py-3 px-6">
                    Tên khách hàng
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Số điện thoại
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Ngày đặt
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Giờ đặt
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Tên sân
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
                      {item?.customerName}
                    </th>
                    <td class="py-4 px-6">{item?.phone}</td>
                    <td class="py-4 px-6">{item?.dateOrder}</td>
                    <td class="py-4 px-6">{item?.timeOrder}</td>
                    <td class="py-4 px-6">{item?.pitchName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default OrdersManagement
