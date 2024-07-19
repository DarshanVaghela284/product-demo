interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="flex justify-center mt-8">
      <button
        className="px-4 py-2 mx-1 bg-blue-600 font-semibold text-white rounded disabled:opacity-50"
        onClick={handlePrev}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span className="px-5 py-2 mx-1">
        Page {currentPage} of {totalPages}
      </span>
      <button
        className="px-5 py-2 mx-1 bg-blue-600 font-semibold text-white rounded disabled:opacity-50"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
