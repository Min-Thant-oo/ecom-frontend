import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.css"; // requires a loader
import carousel1 from '../../images/carousel1.jpg'
import carousel2 from '../../images/carousel2.jpg'
import carousel3 from '../../images/carousel3.jpg'
import logo from '../../images/logo.png'
import Image from "next/image";

const Banner = () => {
  return (
    <div className="relative">
        <div className="absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20"/>
        <Carousel 
            autoPlay 
            infiniteLoop
            showStatus={false}
            showIndicators={false} 
            showThumbs={false} 
            interval={50000}
        >
            <div>
                <Image src={carousel1} priority={true} alt="img1" className=""/>
            </div>

            <div>
                <Image loading="lazy" src={carousel2} alt="img2" className=""/>
            </div>

            <div>
                <Image loading="lazy" src={carousel3} alt="img3" className=""/>
            </div>
        </Carousel>
    </div>
  )
}

export default Banner 