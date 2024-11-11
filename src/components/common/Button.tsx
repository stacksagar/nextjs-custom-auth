import React from "react";
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  loading?: boolean;
}

export default function Button({ children, loading, ...props }: Props) {
  return (
    <button
      disabled={loading}
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-4 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 relative flex items-center justify-center gap-x-2"
      {...props}
    >
      <div>{children}</div>
      {loading ? (
        <span className="block w-4 h-4 rounded-full border-2 border-white border-r-transparent animate-spin transition-all"></span>
      ) : null}
    </button>
  );
}
