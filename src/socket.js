import io from "socket.io-client"

export const socket = io.connect('http://170.231.232.90:3000', { transports : ['websocket'] })
//http://18.231.106.46:3042

