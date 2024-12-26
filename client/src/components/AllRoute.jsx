import { useRoutes } from "react-router-dom";
import {routes} from '../routes/'

export default function ALlRoute() {
  const router = useRoutes(routes)
  return(
    <>{router}</>
  )
}