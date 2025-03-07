import { useState } from 'react';

const Pages = ({ totalPages, currentPage, setCurrentPage, onPageChange }) => {
// console.log('totalPages, currentPage,  :>> ', totalPages, currentPage, );

  const getPageNumbers = () => {
    if (totalPages <= 10) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const start = Math.max(1, currentPage - 4);
    const end = Math.min(totalPages, currentPage + 5);

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (onPageChange) {
      onPageChange(page);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="pagination">
      <button className='pagination__button' id='prev' onClick={handlePrevPage} disabled={currentPage === 1}>
        Anterior
      </button>

      <div className="pagination__numbers">
        {pageNumbers.map((num) => (
          <button
            key={num}
            onClick={() => handlePageChange(num)}
            className={"pagination__number " + (num === currentPage ? "pagination__number--active" : '')}
          >
            {num}
          </button>
        ))}
      </div>

      <button className='pagination__button' id='next' onClick={handleNextPage} disabled={currentPage === totalPages}>
        Siguiente
      </button>
    </div>
  );
};

export default Pages;