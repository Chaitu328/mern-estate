import React from 'react'

export default function CreateListing() {
  return (
    <main className='p-3 max-w-4xl mx-auto'>
        <h1 className='text-3xl font-bold text-center my-7'>Create a Listing</h1>
        <form className='flex flex-col sm:flex-row gap-4'>
            <div className='flex flex-col gap-4 flex-1'>
                <input 
                 className='border p-3 rounded-lg bg-white' 
                type="text" 
                placeholder='Name' 
                id="name"
                maxLength='62' 
                minLength='10' 
                required />
                <textarea
                className='border p-3 rounded-lg bg-white'
                placeholder="Description" id="description"
                required/>
                <input 
                type="text"
                className='border p-3 rounded-lg bg-white'
                placeholder='Address'
                id='address'
                required
                />
                <div className='flex gap-6 flex-wrap'>
                    <div className='flex gap-2'>
                        <input className='w-5' type="checkbox" id="sale" />
                        <span>Sell</span>
                    </div>
                    <div className='flex gap-2'>
                        <input className='w-5' type="checkbox" id="rent" />
                        <span>Rent</span>
                    </div>
                    <div className='flex gap-2'>
                        <input className='w-5' type="checkbox" id="parking" />
                        <span>Parking Spot</span>
                    </div>
                    <div className='flex gap-2'>
                        <input className='w-5' type="checkbox" id="furnished" />
                        <span>Furnished</span>
                    </div>
                    <div className='flex gap-2'>
                        <input className='w-5' type="checkbox" id="offer" />
                        <span>Offer</span>
                    </div>
                </div>
                <div className='flex flex-wrap gap-6'>
                    <div className='flex items-center gap-6'>
                        <input 
                        type="number" 
                        id="bedrooms" 
                        min='1'
                        max='10'
                        required
                        className='border border-gray-700 bg-white rounded-lg p-3 '
                        />
                        <p>Beds</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input 
                        type="number" 
                        id="bathrooms" 
                        min='1'
                        max='10'
                        required
                        className='border border-gray-700 bg-white rounded-lg p-3 '
                        />
                        <p>Baths</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input 
                        type="number" 
                        id="regularPrice" 
                        min='1'
                        max='10'
                        required
                        className='border border-gray-700 bg-white rounded-lg p-3 '
                        />
                        <div className='flex flex-col items-center'>
                            <p>Regular price</p>
                            <span className='text-xs'>($/month)</span>
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input 
                        type="number" 
                        id="discountPrice" 
                        min='1'
                        max='10'
                        required
                        className='border border-gray-700 bg-white rounded-lg p-3 '
                        />
                        <div className='flex flex-col items-center'>
                            <p>Discounted Price</p>
                            <span className='text-xs'>($/month)</span>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-4 flex-1'>
                <p className='font-semibold'>Images: <span className='font-normal text-gray-700'> The first image will be the cover (max 6)</span></p>
                <div className='flex gap-4'>
                    <input 
                    type="file" 
                    id='images'
                    className='border p-3 border-gray-300 rounded w-full'
                    accept='image/*'
                    multiple
                    />
                    <button className='border border-green-700 p-3 rounded-lg uppercase hover:shadow-lg disabled:opacity-80 text-green-700' type="button">upload</button>
                </div>
                <button className='p-3 bg-slate-700 rounded-lg uppercase text-white hover:opacity-95 disabled:opacity-80'>create listing</button>
            </div>
        </form>
    </main>
  )
}
