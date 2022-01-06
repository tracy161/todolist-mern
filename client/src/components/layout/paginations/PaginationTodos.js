import React from 'react';

const PaginationTodos = ({ itemsPerPageTodos, totalItems, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPageTodos); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <ul className='pagination d-flex justify-content-center py-3'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <a onClick={()=> paginate(number)} href='#!' className='page-link'>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};

export default PaginationTodos;
