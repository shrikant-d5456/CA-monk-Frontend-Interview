import * as React from "react"

const Dialog = ({ open, onOpenChange, children }: {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}) => {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={() => onOpenChange(false)} />
      <div className="relative z-50 bg-background rounded-lg shadow-lg max-w-lg w-full mx-4">
        {children}
      </div>
    </div>
  )
}

const DialogContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, ...props }, ref) => (
  <div ref={ref} className=" mt-2 max-w-2xl h-screen overflow-y-auto hidesidebar" {...props}>
    {children}
  </div>
))
DialogContent.displayName = "DialogContent"


export { Dialog, DialogContent }
