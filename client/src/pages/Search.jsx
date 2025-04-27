import React from 'react'

export default function Search() {
  return (
    <div className='flex flex-col md:flex-row'>
        <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
           <form className='flex flex-col gap-7'>
            <div className='flex items-center gap-2'>
                <label className='whitespace-nowrap font-semibold'>Search Term:</label>
                    <input type="text" placeholder='search...'
                    id='searchTerm'
                    className='border bg-white rounded-lg p-2 w-full' />
            </div>
            <div className='flex gap-2 items-center flex-wrap'>
                <label className='font-semibold'>Type:</label>
                    <div className='flex gap-2'>
                        <input 
                        className='w-5' 
                        id='all'
                        type="checkbox" />
                        <span>Rent & sale</span>
                    </div>
                    <div className='flex gap-2'>
                        <input 
                        className='w-5' 
                        id='rent'
                        type="checkbox" />
                        <span>Rent</span>
                    </div>
                    <div className='flex gap-2'>
                        <input 
                        className='w-5' 
                        id='sale'
                        type="checkbox" />
                        <span>Sale</span>
                    </div>
                    <div className='flex gap-2'>
                        <input 
                        className='w-5' 
                        id='offer'
                        type="checkbox" />
                        <span>Offer</span>
                    </div>
            </div>
            <div className='flex gap-2 items-center flex-wrap'>
                <label className='font-semibold'>Amenities:</label>
                    <div className='flex gap-2'>
                        <input 
                        className='w-5' 
                        id='parking'
                        type="checkbox" />
                        <span>Parking</span>
                    </div>
                    <div className='flex gap-2'>
                        <input 
                        className='w-5' 
                        id='furnished'
                        type="checkbox" />
                        <span>Furnished</span>
                    </div>
            </div>
            <div className='flex items-center gap-2'>
                <label className='font-semibold'>Sort:</label>
                <select 
                id="sort_order"
                className='border rounded-lg p-3 bg-white'
                >
                    <option >Price high to low</option>
                    <option >Price low to High</option>
                    <option >Latest</option>
                    <option >Oldest</option>
                </select>
            </div>
            <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>Search</button>
           </form>
        </div>
        <div className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>
            Listings results:
        </div>
    </div>
  )
}
