import axios from "axios"

const blogFetch = axios.create({
    baseURL: "http://localhost:3000",
    headers: {'Content-Type': 'application/json'}
})


// https://super-hare-shoulder-pads.cyclic.cloud
//  http://10.107.144.8:3000
// http://10.107.144.17:3000

export default blogFetch