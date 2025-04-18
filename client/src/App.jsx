import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import SignIn from "./pages/SignIn"
import Profile from "./pages/Profile"
import SignUp from "./pages/SignUp"
import Header from "./component/Header"
import PrivateRoute from "./component/PrivateRoute"
import CreateListing from "./pages/CreateListing"

export default function App() {
  return (
    
    <BrowserRouter>
      <Header/> 
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route element={<PrivateRoute/>}>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/create-listing" element={<CreateListing/>}/>
        </Route>    
        <Route path="/sign-in" element={<SignIn/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
      </Routes>
      {/* create-listing */}
    </BrowserRouter>
  )
}
