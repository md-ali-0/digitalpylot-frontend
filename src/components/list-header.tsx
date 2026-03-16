export const ListHeader: React.FC<{ title: string; subtitle?: string }> = ({
  title,
  subtitle,
}) => {
  return (
    <div className="mb-4 p-2 shadow rounded bg-white">
      <h1 className="text-xl font-bold text-gray-800 tracking-tight flex items-center gap-2 uppercase">
        {title}
      </h1>
      <div className="mt-2 h-1 w-60 bg-linear-to-r from-blue-400 to-blue-200 rounded-full" />

      {subtitle ? (
        <p className="text-gray-500 mt-1 text-sm leading-relaxed">{subtitle}</p>
      ) : null}
    </div>
  );
};
