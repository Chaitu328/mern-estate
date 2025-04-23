import { useState } from "react"
import axios from "axios";
import { useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom';

export default function CreateListing() {
    const {currentUser} = useSelector(state => state.user)
    const [files, setFiles] = useState([]);
    const navigate = useNavigate()
    const [formData, setFormData] = useState({ 
        imageUrls: [],
        title: '',
        description: '',
        address: '',
        type: 'rent',
        bedrooms: 1,
        bathrooms: 1,
        regularPrice: 50,
        discountPrice: 50,
        offer: false,
        parking: false,
        furnished: false,
    });
    const [imageUploadError, setImageUploadError] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [loading,setLoading] = useState(false)
    const[error,setError] = useState(false)
    console.log(formData)
    const handleImageSubmit =  () => {
        if (files.length > 0 && (files.length + formData.imageUrls.length) <= 6) {
          setUploading(true);
          setImageUploadError(false);
    
          const promises = Array.from(files).map((file) => {         
              const formData = new FormData();
              formData.append('file', file);
              formData.append('upload_preset', 'ml_default');
              return axios.post(
                `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
                formData,
                {
                    onUploadProgress: (progressEvent) => {
                      const progress = Math.round(
                        (progressEvent.loaded / progressEvent.total) *100
                      );
                      console.log(`Upload is ${progress}% done`);
                    },
                }
            )
            .then((res) => res.data.secure_url)
            .catch((err) => {
                throw err;
            });
        });
    
          Promise.all(promises)
            .then((urls) => {
              setFormData({ ...formData, imageUrls: formData.imageUrls.concat(urls) });
              setImageUploadError(false);
            })
            .catch(() => {
              setImageUploadError('Image upload failed (2 MB max per image)');
            })
            .finally(() => setUploading(false));
        } else {
          setImageUploadError('You must upload atleast 1-6 images per listing');
          setUploading(false);
        }
      };
    // console.log(files)
    const handleRemoveImg =(index)=>{
        setFormData(
           { ...formData,
            imageUrls: formData.imageUrls.filter((_,i)=>i!==index)}
        )
    }
    const handleChange = (e)=>{
        if(e.target.id === 'sale' || e.target.id === 'rent') {
            setFormData({
                ...formData,
                type: e.target.id
        })
        }
        if(e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
            setFormData({
                ...formData,
                [e.target.id]: e.target.checked
            })
        }
        if(e.target.type === 'text' || e.target.type === 'number' || e.target.type === 'textarea') {
          setFormData({
            ...formData,
            [e.target.id]: e.target.value
          })
        }
    }
    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
            if(formData.imageUrls.length < 1) return setError("You must upload atleast one image")
            if(+formData.regularPrice < +formData.discountPrice) return setError("Discount price must be lower than regular price")
            setLoading(true)
            setError(false)
            const res = await fetch('/api/listing/create', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                ...formData,
                userRef: currentUser._id,
                }),
            });
            const data = await res.json()
            setLoading(false)
            if(data.success === 'false'){
                setError(data.message)
            }
            navigate(`/listing/${data._id}`)
        } catch (error) {
            setError(error.message);
            setLoading(false)
        }
    }
  return (
    <main className='p-3 max-w-4xl mx-auto'>
        <h1 className='text-3xl font-bold text-center my-7'>Create a Listing</h1>
        <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
            <div className='flex flex-col gap-4 flex-1'>
                <input 
                className='border p-3 rounded-lg bg-white' 
                type="text" 
                placeholder='Title' 
                id="title"
                maxLength='62' 
                minLength='10' 
                required
                onChange={handleChange}
                value={formData.title} 
                />
                <textarea
                className='border p-3 rounded-lg bg-white'
                placeholder="Description" id="description"
                required onChange={handleChange} value={formData.description}
                />
                <input 
                type="text"
                className='border p-3 rounded-lg bg-white'
                placeholder='Address'
                id='address'
                required
                onChange={handleChange} value={formData.address}
                />
                <div className='flex gap-6 flex-wrap'>
                    <div className='flex gap-2'>
                        <input className='w-5' type="checkbox" id="sale" onChange={handleChange} checked={formData.type === 'sale'}/>
                        <span>Sell</span>
                    </div>
                    <div className='flex gap-2'>
                        <input className='w-5' type="checkbox" id="rent" onChange={handleChange} checked={formData.type==='rent'}/>
                        <span>Rent</span>
                    </div>
                    <div className='flex gap-2'>
                        <input className='w-5' type="checkbox" id="parking" onChange={handleChange} checked={formData.parking}/>
                        <span>Parking Spot</span>
                    </div>
                    <div className='flex gap-2'>
                        <input className='w-5' type="checkbox" id="furnished" onChange={handleChange} checked={formData.furnished}/>
                        <span>Furnished</span>
                    </div>
                    <div className='flex gap-2'>
                        <input className='w-5' type="checkbox" id="offer" onChange={handleChange} checked={formData.offer}/>
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
                        onChange={handleChange}
                        value={formData.bedrooms}
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
                        onChange={handleChange}
                        value={formData.bathrooms}
                        className='border border-gray-700 bg-white rounded-lg p-3 '
                        />
                        <p>Baths</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input 
                        type="number" 
                        id="regularPrice" 
                        min='50'
                        max='100000000'
                        required
                        onChange={handleChange}
                        value={formData.regularPrice}
                        className='border border-gray-700 bg-white rounded-lg p-3 '
                        />
                        <div className='flex flex-col items-center'>
                            <p>Regular price</p>
                            {formData.type!=='sale' && (
                                <span className='text-xs'>(₹/month)</span>
                            )}
                            
                        </div>
                    </div>
                    {formData.offer && (
                        <div className='flex items-center gap-2'>
                        <input 
                        type="number" 
                        id="discountPrice" 
                        min='50'
                        max='10000000'
                        required
                        onChange={handleChange}
                        value={formData.discountPrice}
                        className='border border-gray-700 bg-white rounded-lg p-3 '
                        />
                        <div className='flex flex-col items-center'>
                            <p>Discounted Price</p>
                            {formData.type!=='sale' && (
                                <span className='text-xs'>(₹/month)</span>
                            )}
                        </div>   
                    </div>
                    )}
                    
                </div>
            </div>
            <div className='flex flex-col gap-4 flex-1'>
                <p className='font-semibold'>Images: <span className='font-normal text-gray-700'> The first image will be the cover (max 6)</span></p>
                <div className='flex gap-4'>
                    <input 
                    onChange={(e)=>setFiles(e.target.files)}
                    type="file" 
                    id='images'
                    className='border p-3 border-gray-300 rounded w-full'
                    accept='image/*'
                    multiple
                    />
                    <button disabled={uploading} onClick={handleImageSubmit} className='border border-green-700 p-3 rounded-lg uppercase hover:shadow-lg disabled:opacity-80 text-green-700' type="button">{uploading ? 'Uploading...' : 'Upload'}</button>
                </div>
                {imageUploadError && <p className='text-red-700 text-sm'> {imageUploadError} </p>}

                {
                    formData.imageUrls.length > 0 && formData.imageUrls.map((url,index)=>(
                        <div key={url} className="flex justify-between p-3 border item-center">
                             <img src={url} alt="listing_image" className="w-40 h-40 object-cover rounded-lg"/>
                             <button 
                             type="button"
                             onClick={()=>handleRemoveImg(index)}
                             className="text-red-700 rounded-lg uppercase hover:opacity-95" >Delete</button>
                        </div>    
                    ))
                }
                
                <button disabled={loading || uploading} className='p-3 bg-slate-700 rounded-lg uppercase text-white hover:opacity-95 disabled:opacity-80'>{loading ? 'loading...' : 'create listing'}</button>
                {error && <p className='text-red-700 text-sm' >{error} </p>}
            </div>
        </form>
    </main>
  )
}
