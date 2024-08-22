import axios from "axios";
import { loginSchema, registerSchema } from "schema/user";
import { z } from "zod";

const login = async (values: z.infer<typeof loginSchema>) => {
    return axios.post("/api/auth/login", values);
}

const signup = async (values: z.infer<typeof registerSchema>) => {
    return axios.post("/api/auth/signup", values);
}

export { login, signup };
