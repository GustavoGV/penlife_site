import io from "socket.io-client"
//http://170.231.232.90:3000
//http://172.16.0.5:3000
//http://18.231.106.46:3042

export const socket = io.connect('http://172.16.0.5:3000', { transports : ['websocket'] })