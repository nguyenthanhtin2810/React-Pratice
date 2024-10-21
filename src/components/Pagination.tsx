import React from 'react';
import { PaginationProps } from '../types/products.types';
import AngleLeft from '../assets/icon/angle-left.svg';
import AngleRight from '../assets/icon/angle-right.svg';

const getDisplayedPages = (totalPages: number, currentPage: number): number[] => {
  const maxVisiblePages = 5;
  const pages: number[] = [];

  let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
  const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(endPage - maxVisiblePages + 1, 1);
  }

  for (let i = startPage; i <= endPage; i += 1) {
    pages.push(i);
  }

  return pages;
};

function Pagination({ totalPages, currentPage, setCurrentPage }: PaginationProps) {
  const pages = getDisplayedPages(totalPages, currentPage);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="mt-4 flex justify-center items-center space-x-6 text-sm">
      <button
        type="button"
        onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
      >
        <img
          src={AngleLeft}
          alt="Angle left icon"
        />
      </button>

      <div className="space-x-2">
        {pages.map((page) => (
          <button
            type="button"
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-4 py-2 border rounded ${
              page === currentPage ? 'bg-yellow-600 text-white' : 'bg-gray-200'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        <img
          src={AngleRight}
          alt="Angle right icon"
        />
      </button>
    </div>
  );
}

export default Pagination;
