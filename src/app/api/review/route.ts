import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";


// Add a review
export async function POST(req: NextRequest) {
  try {
    const session = await getAuthSession()

    if(!session) {
      return new Response("Unauthenticated", { status: 401 })
    }

    const { movieId, rating, comment } = await req.json()

    await db.movieReview.create({
      data: {
        movieId,
        rating,
        comment,
        userId: session.user.id
      }
    })

    return new Response("OK")

  } catch (error) {
    return new Response("Something went wrong", { status: 500 })
  }
}