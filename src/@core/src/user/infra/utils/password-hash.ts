import * as bcrypt from "bcrypt";

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  console.log(password);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}
