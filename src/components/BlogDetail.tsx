import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import type { Blog } from '@/types/blog'
import { Share2, ThumbsUp, MessageCircle, Clock, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface BlogDetailProps {
  blog: Blog
}

export function BlogDetail({ blog }: BlogDetailProps) {
  return (
    <div className=" h-screen overflow-y-scroll hidesidebar bg-white  ">
      <Card >
        <CardContent >
          {/* Cover Image */}
          <div className="relative w-full h-72 md:h-96 mb-8  rounded-t-lg overflow-hidden">
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-snug text-gray-900 mt-8">
            {blog.title}
          </h1>

          {/* Category Badge */}
          <div className="flex flex-wrap items-center gap-3 mb-6 mt-6">
            <div className="flex gap-2 flex-wrap">
              {blog.category.map((cat) => (
                <Badge
                  key={cat}
                  className="bg-blue-100 text-blue-700 px-2 py-1 hover:bg-blue-200 text-xs font-semibold uppercase tracking-wide"
                >
                  {cat}
                </Badge>
              ))}
            </div>
          </div>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date(blog.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              5 min read
            </div>
            <Button variant="ghost" size="sm" >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>

          {/* Content */}
          <div className="mt-8 mb-12">
            {blog.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-6 text-gray-700 leading-relaxed text-lg">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Engagement Section */}
          <div className="flex items-center gap-4 pt-8 border-t">
            <Button variant="outline" size="sm" >
              <ThumbsUp className="w-4 h-4 mr-2" />
              Like this article
            </Button>
            <Button variant="outline" size="sm" >
              <MessageCircle className="w-4 h-4 mr-2" />
              Leave a comment
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
