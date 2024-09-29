"use client"

import { FC, useEffect, useState } from 'react'
import { Card, CardContent } from './ui/card'
import Link from 'next/link'
import { SquarePen, Trash } from 'lucide-react'
import { Movie } from '@prisma/client'
import axios from 'axios'
import { format } from "date-fns"
import { Button } from './ui/button'
import DeleteModal from './DeleteModal'
import { useToast } from '@/hooks/use-toast'

interface MovieCardProps {
  
}

const MovieCard: FC<MovieCardProps> = ({}) => {
  const [movies, setMovies] = useState<Movie[]>([])
  const { toast } = useToast()

  const fetchAllMovies = async () => {
    try {
      const { data } = await axios.get("/api/movie")
      setMovies(data)
    } catch (error) {
      
    }
  }
  console.log(movies)

  useEffect(() => {
    fetchAllMovies()
  }, [])

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/movie/${id}`)
      fetchAllMovies()
      toast({
        title: "Movie deleted successfully"
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Unauthorized you are not allowed to delete this item. You can only delete the item which you have created."
      })
    }
    
  }
  return (
    <>
      {movies.map((movie, i) => (
          <Card key={i} className="bg-indigo-100 border-none rounded-none">
            <CardContent className="p-4 space-y-3">
              <h3 className="text-3xl font-normal text-black/70 hover:underline">
                <Link href={`movie/${movie.id}`}>
                  {movie.name}
                </Link>
              </h3>
              <p className="text-lg italic font-medium text-gray-600 ">
                Released: {format(new Date(movie.releaseDate), "do MMMM, yyy")}
              </p>
              <p className="mt-2 font-bold text-lg">
                Rating: {movie.averageRating === null ? "No rating" : `${movie.averageRating}/10`}
              </p>
              <div className="flex justify-end gap-4">
                <Link href={""} >
                  <SquarePen className="h-5 w-5" />
                </Link>
                <DeleteModal ratingId={movie.id} handleDelete={handleDelete} item="movie">
                    <button className="hover:text-indigo-600">
                      <Trash className="w-5 h-5 text-gray-600" />
                    </button>
                </DeleteModal>
              </div>
            </CardContent>
          </Card>
        ))}
    </>
  )
}

export default MovieCard