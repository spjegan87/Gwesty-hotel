import { Link } from "wouter";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export interface BlogCardProps {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  image: string;
}

export function BlogCard({ id, title, excerpt, date, author, image }: BlogCardProps) {
  return (
    <Card className="overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <CardContent className="p-4">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <span>{date}</span>
          <span className="mx-2">•</span>
          <span>By {author}</span>
        </div>
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{excerpt}</p>
      </CardContent>
      <CardFooter className="px-4 pb-4 pt-0">
        <Link href={`/blog/${id}`} className="text-primary hover:underline font-medium">
          Read More
        </Link>
      </CardFooter>
    </Card>
  );
}
