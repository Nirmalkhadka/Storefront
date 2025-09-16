export default function SkeletonLoader() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[...Array(8)].map((_, index) => (
        <div key={index} className="border rounded-lg p-4 animate-pulse bg-gray-100 dark:bg-gray-800 shadow-md">
          <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 mb-2 rounded"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 mb-2 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );
}