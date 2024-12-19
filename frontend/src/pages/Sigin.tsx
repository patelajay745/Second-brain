import { FC, useState } from "react";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { userDataTypes } from "@/types/user";
import { loginUser } from "@/api/user";
import { Link, useNavigate } from "react-router-dom";

export const SignIn: FC = () => {
  const { register, handleSubmit } = useForm<userDataTypes>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<userDataTypes> = async (data) => {
    setLoading(true);

    console.log(data);
    try {
      const response = await loginUser(data);
      console.log("login request response", response);
      if (response.status != 200) {
        throw new Error("User registration failed: " + response.statusText);
      }
      navigate("/");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center ">
      <div className="bg-white rounded-xl p-14 shadow-2xl ">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Sign In
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input type="text" placeholder="Username" {...register("username")} />
          <Input
            type="password"
            placeholder="Password"
            {...register("password")}
          />

          <div className="flex   justify-end gap-2 mt-4">
            <Button type="reset" text="Clear" variant="secondary" />
            <Button
              type="submit"
              text="Login"
              variant="primary"
              loading={loading}
            />
          </div>
        </form>
        <p className="text-sm text-gray-600 text-center mt-4">
          Don't have an account?
          <Link to="/signup">
            <span className="text-indigo-600 hover:underline">Signup</span>
          </Link>
        </p>
      </div>
    </div>
  );
};
