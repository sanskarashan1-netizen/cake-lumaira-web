import { cn } from '../../utils/cn';

export default function Button({ children, variant = 'primary', className, ...props }) {
  const baseStyles = "inline-flex items-center justify-center font-poppins transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-text text-secondary hover:bg-primary hover:text-white dark:bg-white dark:text-gray-900 dark:hover:bg-primary dark:hover:text-white px-8 py-3 rounded-sm font-medium tracking-wide shadow-md hover:shadow-xl",
    secondary: "bg-primary text-white hover:bg-primary-dark px-8 py-3 rounded-sm font-medium tracking-wide shadow-md hover:shadow-xl",
    outline: "border border-gray-300 text-text hover:border-primary hover:text-primary dark:border-gray-700 dark:text-gray-300 dark:hover:border-primary dark:hover:text-primary px-8 py-3 rounded-sm font-medium tracking-wide bg-transparent",
    ghost: "text-text hover:text-primary dark:text-gray-300 dark:hover:text-primary px-4 py-2 font-medium bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800 rounded-sm"
  };

  return (
    <button 
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
