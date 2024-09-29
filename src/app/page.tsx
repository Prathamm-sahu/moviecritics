import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, SquarePen, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-7">
      <h2 className="text-4xl">The best movie reviews site!</h2>
      <div className="mb-6 relative">
        <SearchBar />
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <MovieCard />
      </div>
    </div>
  );
}
