import { axiosi } from "../auth/AuthApi"

export const fetchLoggedInUserById=async(id)=>{
    try {
        const res=await axiosi.get(`/users/${id}`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}