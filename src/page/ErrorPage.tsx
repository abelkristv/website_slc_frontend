export default function ErrorPage() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        Oops! Something went wrong.
      </h1>
      <p className="text-lg text-gray-700 mb-2">
        An unexpected error has occurred.
      </p>
      <p className="text-gray-500 italic mb-2">Page not found</p>
    </div>
  );
}
