import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";


// Adding a movie
export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if(!session) {
      return new Response("Unauthenticated", { status: 401 })
    }

    const { name, releaseDate } = await req.json();

    const parsedRealsedDate = new Date(releaseDate);

    const movieExist = await db.movie.findFirst({
      where: {
        name,
        releaseDate: parsedRealsedDate,
      }
    })

    if(movieExist) {
      return new Response("Movie already exists", { status: 400 })
    }

    await db.movie.create({
      data: {
        name,
        releaseDate: parsedRealsedDate,
        userId: session.user.id
      }
    })

    return new Response("OK")

  } catch (error) {
    console.log(error)
    return new Response("Something went wrong", { status: 500 })
  }
}

// Get all movies
export async function GET(req: Request) {
  try {
    const movies = await db.movie.findMany({})

    return NextResponse.json(movies)
  } catch (error) {
    return new Response("Something went wrong", { status: 500 })
  }
}