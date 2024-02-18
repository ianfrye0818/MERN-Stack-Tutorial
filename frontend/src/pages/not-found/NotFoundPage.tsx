// NotFoundPage.js

export default function NotFoundPage() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='max-w-md w-full bg-white p-8 rounded-lg shadow-lg'>
        <h2 className='text-3xl font-bold text-center text-gray-800 mb-6'>404 - Page Not Found</h2>
        <p className='text-gray-600 text-center'>The page you're looking for does not exist.</p>
      </div>
    </div>
  );
}
