import api from "api";
import axios from "axios";
import { loginSchema, registerSchema } from "schema/user";
import { User } from "types";
import { z } from "zod";

const login = (values: z.infer<typeof loginSchema>) => {
    return axios.post("/api/auth/login", values);
}

const signup = (values: z.infer<typeof registerSchema>) => {
    return axios.post("/api/auth/signup", values);
}

const getUsers = (): Promise<User[]> => {
    return api.get("/users");
}

export { login, signup, getUsers };
