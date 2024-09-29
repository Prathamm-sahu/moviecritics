import Link from "next/link"
import UserAuthForm from "./UserAuthForm"

const SignIn = ({}) => {
  return (
    <div className="conatiner mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
      <div className="flex flex-col space-y-2 text-center">
        {/* Logo */}
        
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="text-sm max-w-xs mx-auto">
          By continuing, you are setting up a Movie Critic account and agree to our User Agreement and Privacy Policy
        </p>

        {/* Sign-in form  */}
        <UserAuthForm />


        {/* Navigation to sign-up page */}
        {/* <p className="px-8 text-center text-sm text-zinc-700">
          New to MovieCritic?{" "}
          <Link href="/sign-up" className="hover:text-zinc-800 text-sm underline underline-offset-4">
            Sign Up
          </Link>
        </p> */}
      </div>
    </div>
  )
}

export default SignIn