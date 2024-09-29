"use client"

import { FC, useState } from "react";
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
import axios from "axios"
import { useToast } from "@/hooks/use-toast";

interface AddMovieDialogProps {}

const AddMovieDialog: FC<AddMovieDialogProps> = ({}) => {
  const [open, setOpen] = useState(false)
  const [movieName, setMovieName] = useState("")
  const [releaseDate, setReleaseDate] = useState("")
  const { toast } = useToast()

  const onSubmit = async () => {
    try {
      await axios.post("/api/movie", { name: movieName, releaseDate })
      toast({
        title: "Movie added successfully"
      })
    } catch (error: any) {
      console.log(error)
      toast({
        title: "Error Occured",
        description: error.message
      })
    } finally {
      setOpen(false)
      window.location.reload()
      
    }
  }
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="bg-white text-indigo-600 hover:bg-indigo-50 rounded border-2 border-indigo-300"
          >
            Add new movie
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Add new movie
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              id="name"
              type="text"
              placeholder="Name"
              onChange={(e) => setMovieName(e.target.value)}
              className="border-gray-300"
            />
            <Input
              id="release-date"
              type="date"
              onChange={(e) => setReleaseDate(e.target.value)}
              placeholder="Release date"
              className="border-gray-300"
            />
          </div>
          <DialogFooter>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white" onClick={onSubmit}>
              Create movie
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddMovieDialog;
