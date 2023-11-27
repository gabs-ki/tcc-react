import axios from "axios"

const blogFetch = axios.create({
    baseURL: "http://localhost:3000",
    headers: {'Content-Type': 'application/json'}
})


// https://super-hare-shoulder-pads.cyclic.cloud
//  http://10.107.144.23:3000

export default blogFetch