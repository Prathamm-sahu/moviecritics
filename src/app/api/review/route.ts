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

    const { movieId, rating, comment, username } = await req.json()

    await db.movieReview.create({
      data: {
        movieId,
        rating,
        comment,
        username,
        userId: session.user.id
      }
    })

    const movie = await db.movie.findFirst({
      where: {
        id: movieId
      },
      include: {
        movieReviews: true
      }
    })

    if(!movie) {
      return new Response("Movie", { status: 404 })
    }
  
    const sumOfRatings = movie?.movieReviews.reduce((total, review) => {
      return total + review.rating
    }, 0)

    const avgRating = sumOfRatings/movie?.movieReviews.length

    await db.movie.update({
      where: {
        id: movieId
      },
      data: {
        averageRating: avgRating
      }
    })

    return new Response("OK")

  } catch (error) {
    return new Response("Something went wrong", { status: 500 })
  }
}