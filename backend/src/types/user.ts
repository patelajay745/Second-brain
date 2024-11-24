export interface IUser extends Document {
  _id?: string;
  username: string;
  password: string;
  isPasswordCorrect: (password: string) => Promise<boolean>;
  generateAccessToken: () => string;
  generateRefreshToken: () => string;
}
