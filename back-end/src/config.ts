import dotenv from 'dotenv';
import env from 'env-var';

dotenv.config();

const serverPort: number = env.get("SERVER_PORT").required(true).asIntPositive();
const saltRounds: number = env.get("SALT_ROUNDS").required(true).asIntPositive();
const secretJwt: string = env.get("SECRET_JWT").required(true).asString();
const clientPort: number = env.get("CLIENT_PORT").required(true).asIntPositive();

export { serverPort, saltRounds, secretJwt, clientPort };