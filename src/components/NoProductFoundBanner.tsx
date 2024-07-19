const NoProductsFoundBanner = () => {
  return (
    <div className="flex justify-center items-center w-full h-[calc(100vh_-_130px)]">
      <div className="flex flex-col items-center justify-center h-64 bg-gray-100 rounded-lg shadow-md p-8">
        <svg
          className="w-16 h-16 text-gray-500 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 13h6m2 6H7a2 2 0 01-2-2V7a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2z"
          ></path>
        </svg>
        <p className="text-lg font-semibold text-gray-700 mb-2">
          No Products Found
        </p>
        <p className="text-gray-500">
          Try adjusting your search or filter to find what you're looking for.
        </p>
      </div>
    </div>
  );
};

export default NoProductsFoundBanner;
