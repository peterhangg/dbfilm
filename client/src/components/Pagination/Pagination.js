import React from 'react'

import './Pagination.scss';

const Pagination = ({ paginate, totalPages, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    const active = currentPage === i ? "active" : "";
    pageNumbers.push(
      <li key={i} className="pagination_page-item">
        <a className={`pagination_page-link ${active}`} onClick={() => paginate(i)}>
          {i}
        </a>
      </li>
    );
  };

  return (
    <div>
      <ul className="pagination">
        {currentPage > 1 ? <li className="pagination_page-item" onClick={() => paginate(currentPage -= 1)}><a className="pagination_page-link">Previous</a></li> : ""}
        { pageNumbers }
        {currentPage < pageNumbers.length ? <li className="pagination_page-item" onClick={() => paginate(currentPage += 1)}><a className="pagination_page-link">Next</a></li> : ""}
      </ul>
    </div>
  )
};

export default Pagination
