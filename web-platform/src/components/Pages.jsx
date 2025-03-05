import { useState } from 'react';

const Pages = ({ totalPages, currentPage: initialPage, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(initialPage || 1);

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
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <button onClick={handlePrevPage} disabled={currentPage === 1}>
        Anterior
      </button>
      {pageNumbers.map((num) => (
        <button
          key={num}
          onClick={() => handlePageChange(num)}
          style={{
            margin: '0 5px',
            padding: '8px 12px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            backgroundColor: currentPage === num ? '#007bff' : 'transparent',
            color: currentPage === num ? 'white' : 'black',
            cursor: 'pointer',
          }}
        >
          {num}
        </button>
      ))}
      <button onClick={handleNextPage} disabled={currentPage === totalPages}>
        Siguiente
      </button>
    </div>
  );
};

export default Pages;