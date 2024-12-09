import { FC } from "react";
import { Input } from "../components/ui/Input";

export const SignUp: FC = () => {
  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white rounded border min-w-48">
        <Input placeHolder="Username" onChange={() => {}} />
        <Input placeHolder="Username" onChange={() => {}} />
        <Input placeHolder="Username" onChange={() => {}} />
        <Input placeHolder="Username" onChange={() => {}} />
      </div>
    </div>
  );
};
