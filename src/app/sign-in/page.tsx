"use client"

import { FC } from 'react'

import { signIn } from "next-auth/react";
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import SignIn from '@/components/SigIn';

interface pageProps {
  
}

const page: FC<pageProps> = ({}) => {
  const login = async () => {
    await signIn("google")
  }
  return (
    <div className="absolute inset-0">
      <div className="h-full max-w-2xl mx-auto flex flex-col items-center justify-center gap-20">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "self-start -mt-20"
          )}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />Home
        </Link>
        <SignIn />
      </div>
    </div>
  )
}

export default page