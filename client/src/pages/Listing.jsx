import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';

export default function Listing() {
    SwiperCore.use([Navigation])
    const [listing,setListing] = useState(null)
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(false)
    const params = useParams()
    const listingId = params.listingId
    useEffect(()=>{
        // console.log(listingId)
        const fetchListing =async()=>{
            try {
                setLoading(true)
            const res= await fetch(`/api/listing/get/${listingId}`)
            const data = await res.json()
            if (data.success === false) {
                console.log(data.message);
                setError(true)
                setLoading(false)
                return;
            }
            setListing(data);
            setLoading(false);
            setError(false);
            } catch (error) {
                setError(error)
                setLoading(false)
            }

        }
        
        fetchListing()

    },[listingId])
  return (
    <main>
        {loading && <p className='text-center my-7 text-2xl'>loading....</p>}
        {error && <p className='text-center my-7 text-2xl'>Something Went Wrong!</p>}
        
        {listing && !loading && !error &&(
            <div>
                
            <Swiper navigation>
                {
                    listing.imageUrls.map((url)=>(
                        <SwiperSlide key={url}>
                        <div
                          className='h-[550px]'
                          style={{
                            background: `url(${url}) center no-repeat`,
                            backgroundSize: 'cover',
                          }}
                        ></div>
                      </SwiperSlide>
                    ))
                }

            </Swiper>
        </div>
        )}       
    </main>
  )
}
