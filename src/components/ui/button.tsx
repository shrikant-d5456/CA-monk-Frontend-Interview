import * as React from "react"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'destructive'
  size?: 'default' | 'sm' | 'lg' | 'icon' | 'xs'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        className=' flex  justify-center items-center bg-blue-700 px-4 py-1 rounded-full text-white hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:pointer-events-none'
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
