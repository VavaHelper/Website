export function CardSkeleton() {
  return (
    <div className="space-y-2">
      <div className="h-4 bg-gray-400 rounded w-5/6 animate-pulse" />
      <div className="h-4 bg-gray-400 rounded w-3/4 animate-pulse" />
      <div className="h-4 bg-gray-400 rounded w-4/6 animate-pulse" />
    </div>
  );
}
