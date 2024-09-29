"use client";

import { FC, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import axios from "axios";
import { Movie } from "@prisma/client";
import { toast, useToast } from "@/hooks/use-toast";

interface AddReviewDialogProps {}

const AddReviewDialog: FC<AddReviewDialogProps> = ({}) => {
  const [open, setOpen] = useState(false)
  const [movies, setMovies] = useState<Movie[]>([]);
  const [movieId, setMovieId] = useState("sadfasf");
  const [userName, setUserName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { toast } = useToast()

  const fetchAllMovies = async () => {
    try {
      const { data } = await axios.get("/api/movie");
      setMovies(data);
    } catch (error) {}
  };
  useEffect(() => {
    fetchAllMovies();
  }, []);

  const onSubmit = async () => {
    try {
      console.log(movieId, userName, rating, comment)
      await axios.post("/api/review", { movieId, rating, comment, username: userName })
      toast({
        title: "Review added successfully"
      })
    } catch (error: any) {
      console.log(error)
      toast({
        title: "Error Occured",
        description: error.message
      })
    } finally {
      setOpen(false)
    }
  }

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="bg-indigo-600 text-white hover:bg-indigo-700 rounded"
          >
            Add new review
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Add new review
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Select onValueChange={(value) => setMovieId(value)}>
              <SelectTrigger className="">
                <SelectValue placeholder="Select a movie" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select a movie</SelectLabel>
                  {movies.map((movie) => (
                    <SelectItem
                      value={movie.id}
                      key={movie.id}
                    >
                      {movie.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Input
              type="text"
              placeholder="Your name"
              className="border-gray-300"
              onChange={(e) => setUserName(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Rating out of 10"
              min={0}
              max={10}
              className="border-gray-300"
              onChange={(e) => setRating(parseInt(e.target.value))}
            />
            <Textarea
              placeholder="Review Comments"
              className="border-gray-300"
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white" onClick={onSubmit}>
              Add review
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddReviewDialog;
