import { useState } from 'react'
import type { Blog } from '@/types/blog'
import { BlogList } from '@/components/BlogList'
import { BlogDetail } from '@/components/BlogDetail'
import { CreateBlogForm } from '@/components/CreateBlogForm'
import { Button } from '@/components/ui/button'

function App() {
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null)
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [SidebarOpen, setSidebarOpen] = useState(false);
  const [isSidebarHidden, setIsSidebarHidden] = useState(false);

  return (
    <div className="min-h-screen ">
      <header className="shadow-sm ">
        <div className="max-w-7xl  mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg text-white flex items-center justify-center text-sm font-bold shadow-md">
              CA
            </div>
            <span className="font-bold text-lg">CA MONK</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm text-gray-600">
            <a className="hover:text-gray-900 cursor-pointer">Tools</a>
            <a className="hover:text-gray-900 cursor-pointer">Practice</a>
            <a className="hover:text-gray-900 cursor-pointer">Events</a>
            <a className="hover:text-gray-900 cursor-pointer">Job Board</a>
            <a className="hover:text-gray-900 cursor-pointer">Points</a>
          </nav>
          <Button size="xs" >Profile</Button>
        </div>
      </header>

      <div className="bg-white ">
        <div className="max-w-7xl mx-auto px-6 py-12 text-center">
          <h1 className="text-5xl font-bold mb-3 text-gray-900">CA Monk Blog</h1>
          <p className="text-gray-500 text-lg">
            Stay updated with the latest trends in finance, accounting, and career growth
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto  md:px-4 pb-8 overflow-hidden">
        {/* Mobile Sidebar Toggle Button */}
        <div className='lg:hidden block m-4'>
          <Button
            size="xs"
            variant="outline"
            onClick={() => setSidebarOpen(!SidebarOpen)}
          >
            {SidebarOpen ? 'Close Articles List' : 'Open Articles List'}
          </Button>
        </div>

        {/* Desktop Sidebar Toggle Button */}
        <div className="hidden lg:flex mb-4 justify-end mt-2 ">
          <Button
            size="xs"
            variant="outline"
            onClick={() => setIsSidebarHidden(!isSidebarHidden)}
          >
            {isSidebarHidden ? 'Show Sidebar' : 'Hide Sidebar'}
          </Button>
        </div>

        <div className={`grid grid-cols-1 transition-all duration-300  ${isSidebarHidden ? 'lg:grid-cols-1' : 'lg:grid-cols-[280px_1fr]'} gap-6`}>
          {/* Mobile Sidebar - Slides in from left and overlay */}
          {SidebarOpen && (
            <>
              {/* Sidebar panel */}
              <aside className="lg:hidden fixed left-0 top-0 bottom-0 w-[280px] bg-white shadow-2xl overflow-y-auto p-4 z-50 animate-slide-in-left">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold text-lg text-gray-900">Latest Articles</h2>
                  <Button
                    size="xs"
                    variant="outline"
                    onClick={() => setIsCreateOpen(true)}
                  >
                    + New
                  </Button>
                </div>
                <div onClick={() => setSidebarOpen(false)}>
                  <BlogList
                    onSelectBlog={(blog) => setSelectedBlog(blog)}
                    selectedBlogId={selectedBlog?.id}
                  />
                </div>
              </aside>

              {/* Dark overlay that closes sidebar on click */}
              <div
                className="lg:hidden fixed inset-0 left-[280px]  bg-white/40 backdrop-blur-[1px] z-40"
                onClick={() => setSidebarOpen(false)}
              />
            </>
          )}

          {/* Desktop Sidebar */}
          <aside className={`${isSidebarHidden ? 'hidden' : 'hidden lg:block'} lg:sticky lg:top-8 lg:h-fit`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-lg text-gray-900">Latest Articles</h2>
              <Button
                size="xs"
                variant="outline"
                onClick={() => setIsCreateOpen(true)}
              >
                + New
              </Button>
            </div>
            <BlogList
              onSelectBlog={(blog) => { setSelectedBlog(blog)}}
              selectedBlogId={selectedBlog?.id}
            />
          </aside>

          {/* Main Content Area - shifts right on mobile when sidebar open */}
          <section className={`bg-white  shadow-sm transition-transform duration-300 ${SidebarOpen ? 'translate-x-[280px] lg:translate-x-0' : 'rounded-xl'}`}>
            {selectedBlog ? (
              <BlogDetail blog={selectedBlog} />
            ) : (
              <div className="h-96 flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <p className="text-lg font-medium">Select an article to read</p>
                  <p className="text-sm mt-2">Choose from the latest articles on the left</p>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-white rounded text-gray-900 flex items-center justify-center text-xs font-bold">
                  CA
                </div>
                <span className="font-bold text-white">CA MONK</span>
              </div>
              <p className="text-sm text-gray-400">
                Empowering the next generation of financial leaders with tools, community, and knowledge.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-3 text-sm">RESOURCES</h3>
              <ul className="space-y-2 text-sm">
                <li><a className="hover:text-white cursor-pointer">Blog</a></li>
                <li><a className="hover:text-white cursor-pointer">Webinars</a></li>
                <li><a className="hover:text-white cursor-pointer">Case Studies</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-3 text-sm">PLATFORM</h3>
              <ul className="space-y-2 text-sm">
                <li><a className="hover:text-white cursor-pointer">Job Board</a></li>
                <li><a className="hover:text-white cursor-pointer">Practice Tests</a></li>
                <li><a className="hover:text-white cursor-pointer">Mentorship</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-3 text-sm">CONNECT</h3>
              <ul className="space-y-2 text-sm">
                <li><a className="hover:text-white cursor-pointer">LinkedIn</a></li>
                <li><a className="hover:text-white cursor-pointer">Twitter</a></li>
                <li><a className="hover:text-white cursor-pointer">Instagram</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>© 2026 CA Monk. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a className="hover:text-white cursor-pointer">Privacy Policy</a>
              <a className="hover:text-white cursor-pointer">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      <CreateBlogForm open={isCreateOpen} onOpenChange={setIsCreateOpen} />
    </div>
  )
}

export default App
