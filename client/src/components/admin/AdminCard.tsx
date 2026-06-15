type AdminCardProps = {
  title?: string;
  children: React.ReactNode;
  className?: string;
};

export default function AdminCard({
  title,
  children,
  className = "",
}: AdminCardProps) {
  return (
    <div
      className={`
        w-full
        min-w-0

        bg-white
        border border-gray-200
        rounded-2xl
        shadow-sm

        p-4 sm:p-6

        ${className}
      `}
    >
      {title && (
        <h3 className="text-gray-800 font-semibold text-base sm:text-lg mb-4">
          {title}
        </h3>
      )}

      {children}
    </div>
  );
}
