import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// Get movie by Id
export async function GET(req: Request, { params }: { params: { movieId: string }}) {
  try {
    const movie = await db.movie.findUnique({
      where: {
        id: params.movieId
      },
      include: {
        movieReviews: true
      }
    })

    if(!movie) {
      return new Response("Not found", { status: 404 })
    }

    return NextResponse.json(movie)
  } catch (error) {
    return new Response("Something went wrong", { status: 500 })
  }
}

// Update movie name
export async function PATCH(req: NextRequest, { params }: { params: { movieId: string }}) {
  try {
    const session = await getAuthSession()

    if(!session) {
      return new Response("Unauthenticated", { status: 401 })
    }

    const { name } = await req.json()

    const movieExists = await db.movieReview.findFirst({
      where: {
        id: params.movieId,
      }
    })

    if(!movieExists) {
      return new Response("Review not found", { status: 404 })
    }

    if(movieExists.userId !== session.user.id) {
      return new Response("Unauthorized", { status: 403 })
    }

    const updatedMovie = await db.movie.update({
      where: {
        id: params.movieId,
        userId: session.user.id
      },
      data: {
        name
      }
    })

    return NextResponse.json(updatedMovie)
  } catch (error) {
    return new Response("Something went wrong", { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { movieId: string }}) {
  try {
    const session = await getAuthSession();

    if (session?.user) {
      return new Response("Unauthenticated", { status: 401 });
    }

    const movieExists = await db.movie.findFirst({
      where: {
        id: params.movieId,
      }
    })

    if(!movieExists) {
      return new Response("Movie not found", { status: 404 })
    }

    if(movieExists.userId !== session?.user.id) {
      return new Response("Unauthorized", { status: 403 })
    }

    await db.movie.delete({
      where: {
        id: params.movieId
      }
    })

    return new Response("OK")
  } catch (error) {
    return new Response("Something went wrong", { status: 500 });
  }
}

