import { useQuery } from '@tanstack/react-query'
import { blogApi } from '@/services/blogService'
import { Badge } from '@/components/ui/badge'
import type { Blog } from '@/types/blog'
import { TrendingUp, Users, FileText, Lightbulb, Building } from 'lucide-react'

interface BlogListProps {
  onSelectBlog: (blog: Blog) => void
  selectedBlogId?: string
}

const getCategoryIcon = (category: string) => {
  switch (category.toUpperCase()) {
    case 'FINANCE':
      return <TrendingUp className="w-3 h-3" />
    case 'CAREER':
      return <Users className="w-3 h-3" />
    case 'REGULATIONS':
      return <FileText className="w-3 h-3" />
    case 'TECH':
      return <Lightbulb className="w-3 h-3" />
    default:
      return <Building className="w-3 h-3" />
  }
}

const getTimeAgo = (date: string) => {
  const now = new Date()
  const blogDate = new Date(date)
  const diffMs = now.getTime() - blogDate.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  const diffWeeks = Math.floor(diffDays / 7)

  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return '1 day ago'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffWeeks === 1) return '1 week ago'
  return `${diffWeeks} weeks ago`
}

export function BlogList({ onSelectBlog, selectedBlogId }: BlogListProps) {
  const { data: blogs, isLoading, error } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogApi.getAllBlogs,
  })

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse border-l-4 border-gray-200 pl-4 py-3">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="border-l-4 border-red-500 pl-4 py-3 bg-red-50">
        <p className="text-red-600 text-sm">Error loading blogs</p>
      </div>
    )
  }

  return (
    <div className="space-y-3 lg:h-screen overflow-y-scroll hidesidebar">
      {blogs?.map((blog, index) => (
        <div
          key={blog.id}
          className={` p-4 rounded-lg cursor-pointer transition-all duration-100 ease-in-out bg-white hover:border-l-4 hover:border-blue-700 hover:shadow-md active:scale-[0.98] ${selectedBlogId === blog.id
            ?  ' border-l-4 border-blue-700 bg-blue-50/50 shadow-md'
              : ''
            }`}
          onClick={() => onSelectBlog(blog)}
        >
          <div className={`flex items-center gap-2 mb-1.5 text-xs uppercase  ${selectedBlogId === blog.id ? 'text-blue-700' : ""} `}>
            {getCategoryIcon(blog.category[0])}
            <span
              className={`font-semibold ${selectedBlogId === blog.id ? 'text-blue-700' : ""} `}
            >{blog.category[0]}</span>
            <span className="ml-auto text-xs">{getTimeAgo(blog.date)}</span>
          </div>

          <h3 className="font-bold text-base leading-tight mb-2 text-gray-900">
            {blog.title}
          </h3>

          <p className="text-sm text-gray-600 line-clamp-2 mb-2">
            {blog.description}
          </p>

          {index === 0 && (
            <Badge>
              Featured
            </Badge>
          )}
          {blog.category.includes('CAREER') && index !== 0 && (
            <Badge>
              Study Tips
            </Badge>
          )}
          {blog.category.includes('REGULATIONS') && (
            <Badge>
              Taxation
            </Badge>
          )}
          {blog.category.includes('TECH') && index > 2 && (
            <Badge>
              Development
            </Badge>
          )}
        </div>
      ))}
    </div>
  )
}
