import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { BlogCard } from "@/components/shared/BlogCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { Search } from "lucide-react";

export default function Blog() {
  const [location, setLocation] = useLocation();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Get URL parameters
  const params = new URLSearchParams(location.split("?")[1]);
  const categoryParam = params.get("category");
  
  // If category param changes, update selected category
  if (categoryParam !== selectedCategory) {
    setSelectedCategory(categoryParam);
  }

  // Fetch blogs with pagination and category filter
  const { data: blogsData, isLoading: isBlogsLoading } = useQuery({
    queryKey: [`/api/blogs?page=${page}${selectedCategory ? `&category=${selectedCategory}` : ''}`],
  });
  
  // Fetch blog categories
  const { data: categories, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ['/api/blogs/categories'],
  });

  // Filter blogs by search term if entered
  const filteredBlogs = blogsData?.blogs ? 
    blogsData.blogs.filter((blog: any) => 
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled client-side with the current data
  };

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
    setPage(1);
    
    // Update URL with category parameter
    if (category) {
      setLocation(`/blog?category=${encodeURIComponent(category)}`);
    } else {
      setLocation("/blog");
    }
  };

  return (
    <>
      {/* Hero Banner */}
      <section className="relative bg-neutral-800 text-white h-64">
        <div className="absolute inset-0 bg-black opacity-30 z-10"></div>
        <div
          className="h-full bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')" }}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-center">Our Blogs</h1>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Blog Content - Left Column */}
          <div className="md:w-8/12">
            {isBlogsLoading ? (
              <div className="space-y-8">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="flex flex-col space-y-3">
                    <Skeleton className="h-60 w-full rounded-lg" />
                    <div className="space-y-2 p-4">
                      <Skeleton className="h-8 w-3/4" />
                      <Skeleton className="h-4 w-1/3" />
                      <Skeleton className="h-24 w-full" />
                      <div className="flex gap-2 mt-2">
                        <Skeleton className="h-8 w-20" />
                        <Skeleton className="h-8 w-8" />
                        <Skeleton className="h-8 w-8" />
                        <Skeleton className="h-8 w-8" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredBlogs.length > 0 ? (
              <div className="space-y-8">
                {filteredBlogs.map((blog: any) => (
                  <div key={blog.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                    <div className="md:flex">
                      <div className="md:w-1/3">
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="w-full h-full md:h-64 object-cover"
                        />
                      </div>
                      <div className="md:w-2/3 p-6">
                        <div className="flex flex-wrap gap-2 mb-2">
                          {blog.category && (
                            <Badge variant="outline" className="text-primary border-primary">
                              {blog.category}
                            </Badge>
                          )}
                          {blog.tags && blog.tags.slice(0, 2).map((tag: string, index: number) => (
                            <Badge key={index} variant="secondary" className="bg-gray-100">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <Link href={`/blog/${blog.id}`}>
                          <h2 className="text-xl font-bold mb-2 hover:text-primary transition-colors duration-200">
                            {blog.title}
                          </h2>
                        </Link>
                        
                        <div className="flex items-center text-sm text-gray-500 mb-3">
                          <span>{blog.date}</span>
                          <span className="mx-2">•</span>
                          <span>By {blog.author}</span>
                        </div>
                        
                        <p className="text-gray-600 mb-4 line-clamp-3">{blog.excerpt}</p>
                        
                        <div className="flex justify-between items-center">
                          <Link href={`/blog/${blog.id}`}>
                            <Button variant="link" className="text-primary p-0 h-auto">
                              Read More
                            </Button>
                          </Link>
                          
                          <div className="flex space-x-2 text-gray-400">
                            <button aria-label="Share on social media" className="hover:text-primary">
                              <i className="fab fa-facebook-f"></i>
                            </button>
                            <button aria-label="Share on social media" className="hover:text-primary">
                              <i className="fab fa-twitter"></i>
                            </button>
                            <button aria-label="Share on social media" className="hover:text-primary">
                              <i className="fab fa-pinterest-p"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-2">No Blog Posts Found</h2>
                <p className="text-gray-500 mb-6">
                  {searchTerm ? 
                    `No results matching "${searchTerm}"` : 
                    selectedCategory ? 
                      `No blog posts found in the "${selectedCategory}" category` : 
                      "No blog posts available at the moment"}
                </p>
                {(searchTerm || selectedCategory) && (
                  <Button 
                    onClick={() => {
                      setSearchTerm("");
                      handleCategorySelect(null);
                    }}
                    className="bg-primary hover:bg-primary/90"
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            )}
            
            {/* Pagination */}
            {blogsData?.totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                      />
                    </PaginationItem>
                    {Array.from({ length: blogsData.totalPages }).map((_, i) => (
                      <PaginationItem key={i}>
                        <PaginationLink
                          isActive={page === i + 1}
                          onClick={() => setPage(i + 1)}
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => setPage(p => Math.min(blogsData.totalPages, p + 1))}
                        disabled={page === blogsData.totalPages}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>

          {/* Sidebar - Right Column */}
          <div className="md:w-4/12">
            {/* Search Box */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="font-bold text-lg mb-4">Search</h3>
              <form onSubmit={handleSearch} className="flex items-center">
                <Input
                  type="text"
                  placeholder="Search blog posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-grow"
                />
                <Button type="submit" className="ml-2 bg-primary hover:bg-primary/90" size="icon">
                  <Search className="h-4 w-4" />
                </Button>
              </form>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="font-bold text-lg mb-4">Categories</h3>
              <div className="space-y-2">
                <div 
                  className={`cursor-pointer hover:text-primary transition-colors duration-200 ${!selectedCategory ? 'font-bold text-primary' : ''}`}
                  onClick={() => handleCategorySelect(null)}
                >
                  All Posts
                </div>
                {isCategoriesLoading ? (
                  <div className="space-y-2">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Skeleton key={index} className="h-6 w-full" />
                    ))}
                  </div>
                ) : (
                  <>
                    {categories?.map((category: any) => (
                      <div 
                        key={category.name}
                        className={`flex justify-between cursor-pointer hover:text-primary transition-colors duration-200 ${
                          selectedCategory === category.name ? 'font-bold text-primary' : ''
                        }`}
                        onClick={() => handleCategorySelect(category.name)}
                      >
                        <span>{category.name}</span>
                        <span className="bg-gray-100 px-2 rounded-full text-xs">{category.count}</span>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>

            {/* Recent Posts */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="font-bold text-lg mb-4">Recent Post</h3>
              {isBlogsLoading ? (
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="flex space-x-3">
                      <Skeleton className="h-16 w-16 rounded" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {blogsData?.blogs?.slice(0, 3).map((blog: any) => (
                    <div key={blog.id} className="flex space-x-4">
                      <img 
                        src={blog.image} 
                        alt={blog.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <Link href={`/blog/${blog.id}`}>
                          <h4 className="font-medium hover:text-primary transition-colors duration-200 line-clamp-2">
                            {blog.title}
                          </h4>
                        </Link>
                        <p className="text-sm text-gray-500">{blog.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Tags */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="font-bold text-lg mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {isBlogsLoading ? (
                  Array.from({ length: 10 }).map((_, index) => (
                    <Skeleton key={index} className="h-8 w-20" />
                  ))
                ) : (
                  <>
                    {Array.from(new Set(blogsData?.blogs?.flatMap((blog: any) => blog.tags || []))).map(
                      (tag: string, index: number) => (
                        <Badge 
                          key={index} 
                          variant="outline" 
                          className="px-3 py-2 hover:bg-primary hover:text-white cursor-pointer transition-colors duration-200"
                        >
                          {tag}
                        </Badge>
                      )
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
