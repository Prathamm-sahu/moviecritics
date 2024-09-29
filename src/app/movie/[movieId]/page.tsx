"use client";

import DeleteModal from "@/components/DeleteModal";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Movie, MovieReview } from "@prisma/client";
import axios from "axios";
import { Divide, Loader, SquarePen, Trash, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";

interface PageProps {
  params: {
    movieId: string;
  };
}

type ExtendedMovie = Movie & {
  movieReviews: MovieReview[];
};

const Page: FC<PageProps> = ({ params }) => {
  const [movie, setMovie] = useState<ExtendedMovie>();
  const router = useRouter();
  const { toast } = useToast();
  const fetchMovieById = async () => {
    try {
      const { data } = await axios.get(
        `/api/movie/${params.movieId}`
      );
      setMovie(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(movie);

  useEffect(() => {
    fetchMovieById();
  }, []);

  const handleDelete = async (id: string) => {
    await axios.delete(`/api/review/${id}`);
    fetchMovieById();
    router.refresh();
    toast({
      title: "Movie deleted successfully",
    });
  };

  if (!movie) {
    return (
      <div className="animate-spin flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <main className="">
        <div className="bg-white rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl md:text-4xl font-medium text-gray-800">
              {movie?.name}
            </h2>
            {movie?.averageRating && (
              <span className=" text-xl md:text-4xl font-bold text-indigo-600">{`${movie?.averageRating}/10`}</span>
            )}
          </div>
          {movie?.movieReviews.length === 0 ? (
            <div className="text-lg ">No reviewd found</div>
          ) : (
            movie?.movieReviews.map(({ id, rating, username }) => (
              <div
                key={id}
                className="border-[3px] border-gray-400 p-4 mb-4 space-y-4"
              >
                <div className="flex justify-between items-start">
                  <p className="text-lg text-gray-900 mb-2">
                    This is the best movie ever! I really enjoyed it.
                  </p>
                  <span className="text-xl font-bold text-indigo-600">
                    {rating}/10
                  </span>
                </div>
                <div className="flex justify-between items-center ">
                  <span className="italic font-medium">By {`${username}`}</span>
                  <div className="space-x-2">
                    <button className="hover:text-indigo-600">
                      <SquarePen className="w-5 h-5 text-gray-600 " />
                    </button>
                    <DeleteModal
                      ratingId={id}
                      handleDelete={handleDelete}
                      item="review"
                    >
                      <button className="hover:text-indigo-600">
                        <Trash className="w-5 h-5 text-gray-600" />
                      </button>
                    </DeleteModal>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Page;
