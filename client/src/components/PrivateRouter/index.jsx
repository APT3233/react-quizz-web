import { Navigate, Outlet } from "react-router"
import { getCookie } from "../../helper/cookie"

export default function PrivateRouter(){
  var token = getCookie('user_token')
  return(
    <>
    {token ? ( <Outlet />) : (<Navigate to='/login'/>)}
    </>
  )
}