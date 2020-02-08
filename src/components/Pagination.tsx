import React from 'react';

interface IPagination {
  totalPageCount: number;
  loading: boolean;
  activePage: number;
  onChangePage: (page: number) => void;
}

function Pagination({
  totalPageCount,
  loading,
  activePage,
  onChangePage,
}: IPagination) {
  if (loading) {
    return null;
  }

  return (
    <div className="pagination-container">
      <p className="details-text" onClickCapture={() => onChangePage(1)}>
        First
      </p>
      <p
        className="details-text"
        onClickCapture={() => onChangePage(activePage - 1)}>
        Previous
      </p>
      <p>
        Page {activePage} of {totalPageCount}
      </p>
      <p
        className="details-text"
        onClickCapture={() => onChangePage(activePage + 1)}>
        Next
      </p>
      <p
        className="details-text"
        onClickCapture={() => onChangePage(totalPageCount)}>
        Last
      </p>
    </div>
  );
}

export default Pagination;
