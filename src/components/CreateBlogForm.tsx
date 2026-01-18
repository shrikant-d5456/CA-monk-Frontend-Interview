import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { blogApi } from '@/services/blogService'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import type { CreateBlogInput } from '@/types/blog'

interface CreateBlogFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateBlogForm({ open, onOpenChange }: CreateBlogFormProps) {
  const queryClient = useQueryClient()
  const [formData, setFormData] = useState<CreateBlogInput>({
    title: '',
    category: [],
    description: '',
    coverImage: '',
    content: '',
  })
  const [categoryInput, setCategoryInput] = useState('')

  const createMutation = useMutation({
    mutationFn: blogApi.createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      onOpenChange(false)
      resetForm()
    },
  })

  const resetForm = () => {
    setFormData({
      title: '',
      category: [],
      description: '',
      coverImage: '',
      content: '',
    })
    setCategoryInput('')
  }

  const handleAddCategory = () => {
    if (categoryInput.trim() && !formData.category.includes(categoryInput.trim().toUpperCase())) {
      setFormData({
        ...formData,
        category: [...formData.category, categoryInput.trim().toUpperCase()],
      })
      setCategoryInput('')
    }
  }

  const handleRemoveCategory = (cat: string) => {
    setFormData({
      ...formData,
      category: formData.category.filter((c) => c !== cat),
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createMutation.mutate(formData)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent >

        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Title</label>
            <Input
              placeholder="Enter blog title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">Categories</label>
            <div className="flex gap-2 mb-2">
              <Input
                placeholder="Add category (e.g., FINANCE, TECH)"
                value={categoryInput}
                onChange={(e) => setCategoryInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleAddCategory()
                  }
                }}
              />
              <Button type="button" onClick={handleAddCategory} variant="outline">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.category.map((cat) => (
                <span
                  key={cat}
                  className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm flex items-center gap-1"
                >
                  {cat}
                  <button
                    type="button"
                    onClick={() => handleRemoveCategory(cat)}
                    className="ml-1 hover:text-blue-900"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">Description</label>
            <Textarea
              placeholder="Brief description of the blog"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows={2}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">Cover Image URL</label>
            <Input
              placeholder="https://example.com/image.jpg"
              value={formData.coverImage}
              onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
              required
              type="url"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">Content</label>
            <Textarea
              placeholder="Write your blog content here..."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              required
              rows={10}
            />
          </div>

          <div className="flex gap-2 justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                onOpenChange(false)
                resetForm()
              }}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={createMutation.isPending}>
              {createMutation.isPending ? 'Creating...' : 'Create Blog'}
            </Button>
          </div>

          {createMutation.isError && (
            <p className="text-red-600 text-sm">
              Error creating blog. Please try again.
            </p>
          )}
        </form>
      </DialogContent>
    </Dialog>
  )
}
