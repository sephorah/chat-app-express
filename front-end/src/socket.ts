"use client";
import { io } from "socket.io-client";

const socket = io(`${process.env.NEXT_PUBLIC_SERVER_HOST}:${process.env.NEXT_PUBLIC_SERVER_PORT}`)

export default socket;