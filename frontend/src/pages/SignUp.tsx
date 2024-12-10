import { FC, useState } from "react";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

type Inputs = {
  Username: string;
  Password: string;
};

export const SignUp: FC = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setLoading(true);
    console.log(data);
  };
  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center  ">
      <div className="bg-white rounded-xl p-14 shadow-2xl ">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Sign Up
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Input type="text" placeholder="Username" {...register("Username")} />
          <Input
            type="password"
            placeholder="Password"
            {...register("Password")}
          />

          <div className="flex   justify-end gap-2 mt-4">
            <Button text="Clear" variant="secondary" />
            <Button
              type="submit"
              text="Signup"
              variant="primary"
              loading={loading}
            />
          </div>
        </form>
        <p className="text-sm text-gray-600 text-center mt-4">
          Already have an account? <Link to="/signin">Login</Link>
        </p>
      </div>
    </div>
  );
};
