import { useSelector } from "react-redux"
import { useRef, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { 
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserSet,
  deleteUserSuccess,
  deleteUserFailure, 
} from "../redux/User/userSlice";
import { useDispatch } from "react-redux";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser,loading,error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const [updateSuccess, setUpdateSuccess] = useState(false);
  
  // define the function like this
  const handleFileUpload = useCallback(async (file) => {
    setFileUploadError(false);
    setFilePerc(0);
    try {
      const data = new FormData();
      data.append('image', file);
      const response = await axios.post('http://localhost:3000/api/upload', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setFilePerc(progress);
        },
      });

      setFormData((prev) => ({ ...prev, avatar: response.data.url }));
    } catch {
      setFileUploadError(true);
    }
  }, []);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file, handleFileUpload]);
  
  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json();
      if(data.success === false) {
        dispatch(updateUserFailure(data.message));
        return
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.error.message));
    }
  }
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserSet());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      })
      const data = await res.json();
      if(data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  }
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className='text-3xl font-semibold text-center my-7'>Profile
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input 
        onChange={(e) => setFile(e.target.files[0])}
        type="file" 
        ref={fileRef} 
        hidden
        accept='image/*'
        />
        <img 
        onClick={()=>fileRef.current.click()} 
        className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2" 
        src={formData.avatar || currentUser.avatar} 
        alt="profile is not found"/>
        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error uploading image (must be less than 2MB)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>
        <input  type="text" 
        placeholder='username'
        id="username"
        defaultValue={currentUser.username}
        onChange={handleChange}
        className="border p-3 rounded-lg"
         />
         <input  type="email" 
        placeholder='email'
        id="email"
        defaultValue={currentUser.email}
        onChange={handleChange}
        className="border p-3 rounded-lg"
         />
         <input  type="password" 
        placeholder='password'
        id="password"
        onChange={handleChange}
        className="border p-3 rounded-lg"
         />
         <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">{loading ? 'loading...':'Update'}</button>
      </form>
      <div className="flex justify-between mt-4">
        <span onClick={handleDeleteUser} className="text-red-700 cursor-pointer ">Delete Account</span>
        <span className="text-red-700 cursor-pointer ">Sign Out</span>
      </div>
      <p className="text-red-700">{error ? error : ""}</p>
      <p className='text-green-700 mt-5'>
        {updateSuccess ? 'User is updated successfully!' : ''}
      </p>
  </div>    
  )
}
