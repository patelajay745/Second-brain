import { FC } from "react";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

export const SignIn: FC = () => {
  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center ">
      <div className="bg-white rounded-xl p-14 shadow-2xl ">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Sign In
        </h1>
        <Input type="text" placeholder="Username" onChange={() => {}} />
        <Input type="password" placeholder="Password" onChange={() => {}} />

        <div className="flex   justify-end gap-2 mt-4">
          <Button text="Clear" variant="secondary" />
          <Button text="Login" variant="primary" loading={true} />
        </div>
        <p className="text-sm text-gray-600 text-center mt-4">
          Don't have an account?{" "}
          <a href="#" className="text-indigo-600 hover:underline">
            Signup
          </a>
        </p>
      </div>
    </div>
  );
};
