import React from 'react'

import './Pagination.scss';

const Pagination = ({ paginate, totalPages, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    const active = currentPage === i ? "active" : "";
    pageNumbers.push(
      <li key={i} className="pagination_page-item">
        <button className={`pagination_page-link ${active}`} onClick={() => paginate(i)}>
          {i}
        </button>
      </li>
    );
  };

  return (
    <div>
      <ul className="pagination">
        {currentPage > 1 ? (
          <li className="pagination_page-item" onClick={() => paginate(currentPage -= 1)}>
            <button className="pagination_page-link">Previous</button>
          </li> 
          ) : (
            null
          )
        }
        { pageNumbers }
        {currentPage < pageNumbers.length ? (
          <li className="pagination_page-item" onClick={() => paginate(currentPage += 1)}>
            <button className="pagination_page-link">Next</button>
          </li> 
          ) : (
          null
          )
        }
      </ul>
    </div>
  )
};

export default Pagination
