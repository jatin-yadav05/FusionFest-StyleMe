import axios from 'axios'
let host='http://localhost:4444'
export const registerRoutes=`${host}/api/auth/register`
export const loginRoutes=`${host}/api/auth/login`;
export const orderPayment=`${host}/api/auth/order`
const api=axios.create({
    baseURL:`${host}/api/auth`
  })
export const googleAuth=(code)=>api.get(`/google/?code=${code}`)
