import io from "socket.io-client"

export const socket = io.connect('http://localhost:3042', { transports : ['websocket'] })
//http://18.231.106.46:3042

