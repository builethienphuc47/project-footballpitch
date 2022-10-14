import React from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'
import pitch1 from '../../assets/images/pitch1.jpeg'
import pitch2 from '../../assets/images/pitch2.jpeg'
import pitch3 from '../../assets/images/pitch3.jpeg'
import pitch4 from '../../assets/images/pitch4.jpeg'
import pitch5 from '../../assets/images/pitch5.jpeg'
import pitch6 from '../../assets/images/pitch6.jpeg'
import pitch7 from '../../assets/images/pitch7.jpeg'

const CarouselList = () => {
  return (
    <Carousel showIndicators={false} autoPlay infiniteLoop className="pt-10">
      <div className="h-[390px] w-[100%]">
        <img alt="" src={pitch1} />
      </div>
      <div className="h-[350px] w-[100%]">
        <img alt="" src={pitch2} />
      </div>
      <div className="h-[350px] w-[100%]">
        <img alt="" src={pitch3} />
      </div>
      <div className="h-[350px] w-[100%]">
        <img alt="" src={pitch4} />
      </div>
      <div className="h-[350px] w-[100%]">
        <img alt="" src={pitch5} />
      </div>
      <div className="h-[350px] w-[100%]">
        <img alt="" src={pitch6} />
      </div>
      <div className="h-[350px] w-[100%]">
        <img alt="" src={pitch7} />
      </div>
    </Carousel>
  )
}

export default CarouselList
