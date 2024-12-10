import { FC, useState } from "react";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/user";
import { userDataTypes } from "../types/user";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

export const SignUp: FC = () => {
  const navigate = useNavigate();

  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm<userDataTypes>();
  const onSubmit: SubmitHandler<userDataTypes> = async (data) => {
    setLoading(true);

    try {
      const response = await registerUser(data);
      console.log(response.status);
      if (response.status != 201) {
        throw new Error("User registration failed: " + response.statusText);
      }

      toast({
        variant: "success",
        title: "User has been registered successfully",
      });

      setTimeout(() => {
        navigate("/signin");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center  ">
      <div className="bg-white rounded-xl p-14 shadow-2xl ">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Sign Up
        </h1>

        <Toaster />

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
