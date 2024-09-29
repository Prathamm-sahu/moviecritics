import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// Update a review
export async function PATCH(req: NextRequest, { params }: { params: { ratingId: string }}) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthenticated", { status: 401 });
    }

    const reviewExists = await db.movieReview.findFirst({
      where: {
        id: params.ratingId
      }
    })

    if(!reviewExists) {
      return new Response("Review not found", { status: 404 })
    }

    if(reviewExists.userId !== session.user.id) {
      return new Response("Unauthorized", { status: 403 })
    }

    const { rating, comment } = await req.json()

    const updatedRating = await db.movieReview.update({
      where: {
        id: params.ratingId
      },
      data: {
        rating,
        comment
      }
    })

    const movie = await db.movie.findFirst({
      where: {
        id: updatedRating.movieId
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
        id: movie.id
      },
      data: {
        averageRating: avgRating
      }
    })

    return NextResponse.json(updatedRating)
  } catch (error) {
    return new Response("Something went wrong", { status: 500 });
  }
}

// Delete an existing review
export async function DELETE(req: NextRequest, { params }: { params: { ratingId: string }}) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthenticated", { status: 401 });
    }

    const reviewExists = await db.movieReview.findFirst({
      where: {
        id: params.ratingId
      }
    })

    if(!reviewExists) {
      return new Response("Review not found", { status: 404 })
    }

    if(reviewExists.userId !== session?.user.id) {
      return new Response("Unauthorized", { status: 403 })
    }

    const deleteRating = await db.movieReview.delete({
      where: {
        id: params.ratingId
      }
    })

    const movie = await db.movie.findFirst({
      where: {
        id: deleteRating.movieId
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
        id: movie.id
      },
      data: {
        averageRating: avgRating
      }
    })

    return new Response("OK")
  } catch (error) {
    return new Response("Something went wrong", { status: 500 });
  }
}