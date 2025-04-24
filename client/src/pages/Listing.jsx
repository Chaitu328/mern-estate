import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import { useSelector } from 'react-redux';
import 'swiper/css/bundle';
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkedAlt,
  FaParking,
  FaShare,
} from 'react-icons/fa';
import Contact from '../component/Contact';

// https://sabe.io/blog/javascript-format-numbers-commas#:~:text=The%20best%20way%20to%20format,format%20the%20number%20with%20commas.

export default function Listing() {
    SwiperCore.use([Navigation])
    const [listing,setListing] = useState(null)
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(false)
    const [copied,setCopied] = useState(false)
    const params = useParams()
    const {currentUser} = useSelector((state)=>state.user)
    const [contact , setContact] =useState(false)
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
            <div className='z-10 border rounded-full w-12 h-12 fixed top-[13%] right-[3%] flex justify-center items-center bg-slate-100 cursor-pointer'>
              <FaShare
              className='text-slate-500'
              onClick={()=>{
                navigator.clipboard.writeText(window.location.href);
                setCopied(true)
                setTimeout(()=>{
                  setCopied(false)
                },2000)
              }}
              />
            </div>
            {
                copied && (
                  <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>
                    Link Copied!
                  </p>
                )
              }
            <div className='p-3 max-w-4xl mx-auto my-7 flex flex-col'>
              <p className='text-2xl font-semibold'>{listing.title} - ₹{' '} {listing.offer ? listing.discountPrice.toLocaleString('en-IN') : listing.regularPrice.toLocaleString('en-IN')}
              {listing.type === 'sale' && 'Lakhs'}
              {listing.type === 'rent' && '/month'}
              </p>
              <p className='flex items-center gap-2 text-slate-600 text-sm mt-6'>
                <FaMapMarkedAlt
                className='text-green-700' 
                />
                 {listing.address}
              </p>
              <div className='gap-4'>
                <div className='flex my-4 gap-4'>
                <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                  {listing.type==='rent'? 'For Rent' : 'For Sale'}
                </p>
                {listing.offer && (
                  <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                    ${+listing.regularPrice - +listing.discountPrice} discount 
                  </p>
                )}
                </div>
                <p className='font-semibold text-black'>
                  {listing.description}
                </p>
                <ul className='flex flex-wrap items-center text-green-900 font-semibold text-sm gap-4 sm:gap-6 mt-4'>
                  <li className='flex items-center gap-1 whitespace-nowrap'>
                    <FaBed
                    className='text-lg'
                    />
                    {listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : `${listing.bedrooms} Bed`}
                  </li>
                  <li className='flex items-center gap-1 whitespace-nowrap'>
                    <FaBath
                    className='text-lg'
                    />
                    {listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : `${listing.bathrooms} Bath`}
                  </li>
                  <li className='flex items-center gap-1 whitespace-nowrap'>
                    <FaParking 
                    className='text-lg'
                    />
                    {listing.parking ? 'Parking spot' : 'No Parking'}
                  </li>
                  <li className='flex items-center gap-1 whitespace-nowrap'>
                    <FaChair 
                    className='text-lg'
                    />
                    {listing.furnished ? 'Furnished' : 'Unfurnished'}
                  </li>
                </ul>
                
              </div>
              {currentUser && listing.userRef !== currentUser._id && !contact && (
                   <button onClick={()=>{setContact(true)}}
                   className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3 mt-3'>Contact a LandLord</button>
              )}
             {contact && (
              <Contact listing={listing}/>
             )}
            </div>
        </div>
        )}       
    </main>
  )
}
