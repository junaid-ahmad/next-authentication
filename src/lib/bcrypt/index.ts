import { compare, hash } from "bcrypt";

export const comparePassword = async (
  enteredPassword: string,
  storedPassword: string
) => {
  const isPasswordCorrect = await compare(enteredPassword, storedPassword);
  return isPasswordCorrect;
};

export const hashPassword = async (enteredPassword: string) => {
  const result = await hash(enteredPassword, 10);
  return result;
};
