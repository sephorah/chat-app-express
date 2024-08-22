import api from "api";
import axios from "axios";
import { loginSchema, registerSchema } from "schema/user";
import { z } from "zod";

const login = (values: z.infer<typeof loginSchema>) => {
    return axios.post("/api/auth/login", values);
}

const signup = (values: z.infer<typeof registerSchema>) => {
    return axios.post("/api/auth/signup", values);
}

const getUsers = () => {
    return api.get("/profiles");
}

export { login, signup, getUsers };
