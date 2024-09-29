import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// Update a review
export async function PATCH(req: NextRequest, { params }: { params: { ratingId: string }}) {
  try {
    const session = await getAuthSession();

    if (session?.user) {
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

    return NextResponse.json(updatedRating)
  } catch (error) {
    return new Response("Something went wrong", { status: 500 });
  }
}

// Delete an existing review
export async function DELETE(req: NextRequest, { params }: { params: { ratingId: string }}) {
  try {
    const session = await getAuthSession();

    if (session?.user) {
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

    await db.movieReview.delete({
      where: {
        id: params.ratingId
      }
    })

    return new Response("OK")
  } catch (error) {
    return new Response("Something went wrong", { status: 500 });
  }
}