import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Controller } from "react-hook-form";
import useLogin from "./useLogin";
import { cn } from "@/utils/cn";

const Login = () => {
  const {
    isVisible,
    toggleVisibility,
    control,
    handleSubmit,
    handleLogin,
    isPendingLogin,
    errors,
  } = useLogin();

  return (
    <section className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
      <div className="flex w-full max-w-6xl flex-col items-center gap-10 lg:flex-row lg:gap-20">
        {/* Left Side */}
        <div className="flex w-full flex-col items-center gap-8 text-center lg:w-1/2">
          <Image
            src="/images/general/logo.svg"
            alt="logo"
            width={150}
            height={150}
            priority
          />
          <Image
            src="/images/bg.jpg"
            alt="login"
            className="w-3/4 max-w-md lg:w-full"
            width={1024}
            height={1024}
          />
        </div>

        {/* Right Side */}
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800">Login</h2>
          <p className="mt-2 mb-6 text-sm text-gray-600">
            Don{"'"}t have an account?{" "}
            <Link
              href="/auth/register"
              className="font-semibold text-red-500 hover:underline"
            >
              Register here
            </Link>
          </p>

          {errors.root && (
            <div className="mb-4 rounded-md bg-red-50 p-2 text-sm text-red-500">
              {errors?.root?.message}
            </div>
          )}

          <form
            className={cn(
              "flex flex-col",
              Object.keys(errors).length > 0 ? "gap-3" : "gap-5",
            )}
            onSubmit={handleSubmit(handleLogin)}
          >
            {/* Email / Username */}
            <Controller
              name="identifier"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium text-gray-700">
                    Email / Username
                  </label>
                  <input
                    {...field}
                    type="text"
                    autoComplete="off"
                    placeholder="Enter your email or username"
                    className={cn(
                      "w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm shadow-sm focus:border-red-400 focus:bg-white focus:outline-none",
                      errors.identifier && "border-red-500",
                    )}
                  />
                  {errors.identifier && (
                    <span className="mt-1 text-xs text-red-500">
                      {errors.identifier.message}
                    </span>
                  )}
                </div>
              )}
            />

            {/* Password */}
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      {...field}
                      type={isVisible ? "text" : "password"}
                      autoComplete="off"
                      placeholder="Enter your password"
                      className={cn(
                        "w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 pr-10 text-sm shadow-sm focus:border-red-400 focus:bg-white focus:outline-none",
                        errors.password && "border-red-500",
                      )}
                    />
                    <button
                      type="button"
                      className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <Eye className="h-5 w-5" />
                      ) : (
                        <EyeOff className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <span className="mt-1 text-xs text-red-500">
                      {errors.password.message}
                    </span>
                  )}
                </div>
              )}
            />

            {/* Submit */}
            <button
              type="submit"
              disabled={isPendingLogin}
              className="mt-4 flex items-center justify-center rounded-lg bg-red-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isPendingLogin ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
