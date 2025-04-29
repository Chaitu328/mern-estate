import { useEffect,useState } from 'react'
import {Link} from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../component/ListingItem';


export default function Home() {
  const [offerListings,setOfferListings] = useState([])
  const [rentListings, setRentListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);

  SwiperCore.use(Navigation)
  useEffect(() => {
    const fetchAllListings = async () => {
      try {
        const offerRes = await fetch('/api/listing/get?offer=true&limit=4');
        const offerData = await offerRes.json();
        console.log("Offer Listings:", offerData);
        setOfferListings(offerData);
  
        const rentRes = await fetch('/api/listing/get?type=rent&limit=4');
        const rentData = await rentRes.json();
        console.log("Rent Listings:", rentData);
        setRentListings(rentData);
  
        const saleRes = await fetch('/api/listing/get?type=sale&limit=4');
        const saleData = await saleRes.json();
        console.log("Sale Listings:", saleData);
        setSaleListings(saleData);
      } catch (err) {
        console.error("Error fetching listings:", err);
      }
    };
  
    fetchAllListings();
  }, []);
  

  return (
    <div>
       {/* title */}
        <div className='flex flex-col gap-6 py-28 px-3 max-w-6xl mx-auto'>
          <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>Find Your Place next <span className='text-slate-500'>Perfect</span>
          <br />
          place with ease
          </h1>
          <div className='text-gray-400 text-xs sm:text-sm'>ChaituEastate will help you find your home fast, easy and comfortable.
            <br />
          Our expert support are always available.</div>
          <Link to={'/search'} className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'>
            Let's get started...
          </Link>
        </div>
       {/* swiper */}
        <Swiper navigation>
          {offerListings && offerListings.length>0 && offerListings.map((listing)=>(
            <SwiperSlide>
                  <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='h-[500px]'
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
        </Swiper>
       {/* slider woth offers, rent and sale */}

       <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
       {offerListings && offerListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>Show more offers</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {rentListings && rentListings.length > 0 && (
          <div>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for rent</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>Show more places for Rent</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {saleListings && saleListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for Sale</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>Show more places for Sale</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
       </div>
    </div>
  )
}
