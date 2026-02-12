import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema } from "../zod/auth.schema";
import type { LoginFormData } from "../zod/auth.schema";
import { loginUser } from "../api/auth.api";
import { AuthContext } from "../context/AuthContext";
import type { AuthContextType } from "../types/auth.type";

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext) as AuthContextType;

  const [api_error, set_api_error] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await loginUser(data);

      setUser(result?.data?.user);
      navigate("/dashboard");
    } catch (error: any) {
      set_api_error(error.response.data.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f2f2f2] p-6">
      <div className="w-full max-w-md bg-white border border-black/10 shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              {...register("email")}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              {...register("password")}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-black text-white py-2 rounded-lg hover:opacity-90 transition disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>

          <div className="w-full justify-center flex gap-3">
            Dont have an account?
            <Link to="/register" className="underline">
              Register
            </Link>
          </div>
        </form>

        <div className="w-full justify-center flex text-red-500">
          {api_error}
        </div>
      </div>
    </div>
  );
}
