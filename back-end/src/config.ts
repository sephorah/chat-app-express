import dotenv from 'dotenv';
import env from 'env-var';

dotenv.config();

const port: number = env.get("SERVER_PORT").required(true).asIntPositive();
const saltRounds: number = env.get("SALT_ROUNDS").required(true).asIntPositive();
const secretJwt: string = env.get("SECRET_JWT").required(true).asString();

export { port, saltRounds, secretJwt };