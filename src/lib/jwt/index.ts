import { JwtPayload, sign, verify } from "jsonwebtoken";

const secretKey = process.env.JWT_USER_ID_SECRET as string;

type SignOption = {
  expiresIn: string | number;
};

const DEFAULT_SIGN_OPTION: SignOption = {
  expiresIn: "1d",
};

export function signJwt(
  payload: JwtPayload,
  option: SignOption = DEFAULT_SIGN_OPTION
) {
  const token = sign(payload, secretKey);

  return token;
}

export function verifyJwt(token: string) {
  try {
    const decoded = verify(token, secretKey);

    return decoded as JwtPayload;
  } catch (error) {
    console.log(error);
    return null;
  }
}
