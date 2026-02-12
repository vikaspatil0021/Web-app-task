import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { registerSchema, type RegisterFormData } from "../zod/auth.schema";
import { registerUser } from "../api/auth.api";
import { useContext, useState } from "react";
import type { AuthContextType } from "../types/auth.type";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext) as AuthContextType;

  const [api_error, set_api_error] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const result = await registerUser(data);

      setUser(result?.user);
      navigate("/dashboard");
    } catch (error: any) {
      set_api_error(error.response.data.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f2f2f2] p-6">
      <div className="w-full max-w-md bg-white border border-black/10 shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              {...register("name")}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

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
            className="w-full bg-black text-white py-2 rounded-lg hover:opacity-90 transition disabled:opacity-50"
          >
            {isSubmitting ? "Creating account..." : "Register"}
          </button>
          <div className="w-full justify-center flex gap-3">
            Already have an account?{" "}
            <Link to="/login" className="underline">
              Login
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
