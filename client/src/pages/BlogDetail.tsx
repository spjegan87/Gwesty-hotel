import { useQuery } from "@tanstack/react-query";
import { Link, useRoute, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { BlogCard } from "@/components/shared/BlogCard";
import { 
  Calendar, 
  User, 
  MessageCircle,
  Tag,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from "lucide-react";

export default function BlogDetail() {
  const [, params] = useRoute("/blog/:id");
  const [, navigate] = useLocation();
  const blogId = params?.id;

  // Fetch blog post details
  const { data: blog, isLoading: isBlogLoading } = useQuery({
    queryKey: [`/api/blogs/${blogId}`],
  });

  // Fetch related blog posts (same category)
  const { data: relatedBlogs, isLoading: isRelatedLoading } = useQuery({
    queryKey: ['/api/blogs/recent'],
    enabled: !!blog,
  });

  // Filter related posts to exclude current post and match category
  const filteredRelatedBlogs = relatedBlogs?.filter(
    (relatedBlog: any) => 
      relatedBlog.id !== Number(blogId) && 
      (!blog?.category || relatedBlog.category === blog.category)
  ).slice(0, 3);

  if (isBlogLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-8/12">
            <Skeleton className="h-96 w-full rounded-lg mb-6" />
            <Skeleton className="h-10 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/3 mb-6" />
            <div className="space-y-4 mb-8">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
          <div className="md:w-4/12">
            <Skeleton className="h-64 w-full rounded-lg mb-6" />
            <Skeleton className="h-64 w-full rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Blog Post Not Found</h2>
        <p className="mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
        <Link href="/blog">
          <Button className="bg-primary hover:bg-primary/90">Back to Blog</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Hero Banner */}
      <section className="relative bg-neutral-800 text-white h-64">
        <div className="absolute inset-0 bg-black opacity-30 z-10"></div>
        <div
          className="h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${blog.image})` }}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-center">{blog.title}</h1>
            <nav className="flex justify-center mt-4">
              <ol className="flex items-center space-x-2 text-sm">
                <li><Link href="/" className="hover:underline">Home</Link></li>
                <li>/</li>
                <li><Link href="/blog" className="hover:underline">Blog</Link></li>
                <li>/</li>
                <li>{blog.title}</li>
              </ol>
            </nav>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Blog Content - Left Column */}
          <div className="md:w-8/12">
            {/* Blog Header Information */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex flex-wrap gap-2 mb-4">
                {blog.category && (
                  <Badge variant="outline" className="text-primary border-primary">
                    {blog.category}
                  </Badge>
                )}
                {blog.tags && blog.tags.map((tag: string, index: number) => (
                  <Badge key={index} variant="secondary" className="bg-gray-100">
                    {tag}
                  </Badge>
                ))}
              </div>

              <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
              
              <div className="flex flex-wrap items-center text-gray-600 mb-6 gap-x-4 gap-y-2">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{blog.date}</span>
                </div>
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  <span>By {blog.author}</span>
                </div>
                <div className="flex items-center">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  <span>0 Comments</span>
                </div>
                <div className="flex items-center">
                  <Tag className="h-4 w-4 mr-2" />
                  <span>{blog.category}</span>
                </div>
              </div>
              
              {/* Featured Image */}
              <div className="mb-6">
                <img 
                  src={blog.image}
                  alt={blog.title}
                  className="w-full rounded-lg h-auto object-cover"
                />
              </div>

              {/* Blog Content */}
              <div className="prose prose-lg max-w-none">
                <div dangerouslySetInnerHTML={{ __html: blog.content }} />
              </div>
              
              {/* Tags and Share */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex flex-wrap justify-between items-center">
                  <div className="flex items-center gap-2 mb-4 md:mb-0">
                    <span className="font-semibold">Tags:</span>
                    <div className="flex flex-wrap gap-2">
                      {blog.tags.map((tag: string, index: number) => (
                        <Badge key={index} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Share:</span>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                        <Facebook className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                        <Twitter className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                        <Instagram className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                        <Linkedin className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Author Box */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                  <img 
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(blog.author)}&background=random`}
                    alt={blog.author}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{blog.author}</h3>
                  <p className="text-gray-600 mb-4">
                    Travel writer and photographer passionate about exploring new cultures and sharing authentic experiences through compelling storytelling.
                  </p>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full bg-gray-100">
                      <Facebook className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full bg-gray-100">
                      <Twitter className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full bg-gray-100">
                      <Instagram className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Related Posts */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-xl font-bold mb-6">Related Posts</h3>
              
              {isRelatedLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="flex flex-col space-y-3">
                      <Skeleton className="h-48 w-full rounded-lg" />
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  ))}
                </div>
              ) : filteredRelatedBlogs?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {filteredRelatedBlogs.map((relatedBlog: any) => (
                    <BlogCard key={relatedBlog.id} {...relatedBlog} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No related posts found</p>
              )}
            </div>
            
            {/* Comments Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-6">Comments (0)</h3>
              
              <div className="mb-8">
                <p className="text-gray-500 text-center py-4">No comments yet. Be the first to comment!</p>
              </div>
              
              <h3 className="text-xl font-bold mb-4">Leave a Comment</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Input placeholder="Your Name*" required />
                  </div>
                  <div>
                    <Input type="email" placeholder="Your Email*" required />
                  </div>
                </div>
                <div>
                  <Input placeholder="Website" />
                </div>
                <div>
                  <Textarea 
                    placeholder="Your Comment*" 
                    className="min-h-[150px]" 
                    required 
                  />
                </div>
                <div>
                  <Button type="submit" className="bg-primary hover:bg-primary/90">
                    Post Comment
                  </Button>
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar - Right Column */}
          <div className="md:w-4/12">
            {/* Search Box */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="font-bold text-lg mb-4">Search</h3>
              <form className="flex items-center">
                <Input
                  type="text"
                  placeholder="Search blog posts..."
                  className="flex-grow"
                />
                <Button type="submit" className="ml-2 bg-primary hover:bg-primary/90" size="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </svg>
                </Button>
              </form>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="font-bold text-lg mb-4">Categories</h3>
              <div className="space-y-2">
                <Link href="/blog" className="block hover:text-primary transition-colors duration-200">
                  All Categories
                </Link>
                <Link 
                  href={`/blog?category=${encodeURIComponent(blog.category)}`} 
                  className="flex justify-between font-bold text-primary"
                >
                  <span>{blog.category}</span>
                  <span className="bg-gray-100 px-2 rounded-full text-xs">
                    {/* Placeholder for category count */}
                    10
                  </span>
                </Link>
                <Link href="/blog?category=Adventure%20Travel" className="flex justify-between hover:text-primary transition-colors duration-200">
                  <span>Adventure Travel</span>
                  <span className="bg-gray-100 px-2 rounded-full text-xs">8</span>
                </Link>
                <Link href="/blog?category=City%20Guides" className="flex justify-between hover:text-primary transition-colors duration-200">
                  <span>City Guides</span>
                  <span className="bg-gray-100 px-2 rounded-full text-xs">6</span>
                </Link>
                <Link href="/blog?category=Island%20Getaways" className="flex justify-between hover:text-primary transition-colors duration-200">
                  <span>Island Getaways</span>
                  <span className="bg-gray-100 px-2 rounded-full text-xs">4</span>
                </Link>
              </div>
            </div>

            {/* Recent Posts */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="font-bold text-lg mb-4">Recent Posts</h3>
              {isRelatedLoading ? (
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
                  {relatedBlogs?.slice(0, 3).map((relatedBlog: any) => (
                    <div key={relatedBlog.id} className="flex space-x-4">
                      <img 
                        src={relatedBlog.image} 
                        alt={relatedBlog.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <Link href={`/blog/${relatedBlog.id}`}>
                          <h4 className="font-medium hover:text-primary transition-colors duration-200 line-clamp-2">
                            {relatedBlog.title}
                          </h4>
                        </Link>
                        <p className="text-sm text-gray-500">{relatedBlog.date}</p>
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
                {blog.tags.map((tag: string, index: number) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="px-3 py-2 hover:bg-primary hover:text-white cursor-pointer transition-colors duration-200"
                  >
                    {tag}
                  </Badge>
                ))}
                <Badge 
                  variant="outline" 
                  className="px-3 py-2 hover:bg-primary hover:text-white cursor-pointer transition-colors duration-200"
                >
                  travel
                </Badge>
                <Badge 
                  variant="outline" 
                  className="px-3 py-2 hover:bg-primary hover:text-white cursor-pointer transition-colors duration-200"
                >
                  hotel
                </Badge>
                <Badge 
                  variant="outline" 
                  className="px-3 py-2 hover:bg-primary hover:text-white cursor-pointer transition-colors duration-200"
                >
                  vacation
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
