import io from "socket.io-client"

export const socket = io.connect('http://18.231.106.46:3042', { transports : ['websocket'] })

