import React from 'react';

interface IAvailableCars {
  totalCarsCount: number;
  carListCount: number;
  loading: boolean;
}

function AvailableCars({
  totalCarsCount,
  carListCount,
  loading,
}: IAvailableCars) {
  if (loading) {
    return null;
  }
  return (
    <div data-testid="available-cars-view">
      <p className="head-text">Available cars</p>
      <p className="result-text">
        Showing {carListCount} of {totalCarsCount} results
      </p>
    </div>
  );
}

export default AvailableCars;
