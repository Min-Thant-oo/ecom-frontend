// import React from 'react';

// const Pagination = ({ currentPage, totalPages, onPageChange }) => {
//   const renderPageNumbers = () => {
//     const pageNumbers = [];
//     for (let i = 1; i <= totalPages; i++) {
//       pageNumbers.push(
//         <li
//           key={i}
//           onClick={() => onPageChange(i)}
//           className={`inline-block px-3 py-1 mr-2 cursor-pointer ${
//             currentPage === i ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
//           }`}
//         >
//           {i}
//         </li>
//       );
//     }
//     return pageNumbers;
//   };

//   return (
//     <ul className="flex justify-center mt-4">{renderPageNumbers()}</ul>
//   );
// };

// export default Pagination;




// import React from 'react';
// import classNames from 'classnames';

// const BootstrapPagination = ({ currentPage, totalPages, onPageChange }) => {
//   const renderPageNumbers = () => {
//     const pageNumbers = [];
//     for (let i = 1; i <= totalPages; i++) {
//       pageNumbers.push(
//         <li
//           key={i}
//           onClick={() => onPageChange(i)}
//           className={classNames('page-item', {
//             active: currentPage === i,
//           })}
//         >
//           <button className="page-link">{i}</button>
//         </li>
//       );
//     }
//     return pageNumbers;
//   };

//   return (
//     <nav aria-label="Page navigation">
//       <ul className="pagination">
//         <li className={classNames('page-item', { disabled: currentPage === 1 })}>
//           <button className="page-link" onClick={() => onPageChange(currentPage - 1)}>Previous</button>
//         </li>
//         {renderPageNumbers()}
//         <li className={classNames('page-item', { disabled: currentPage === totalPages })}>
//           <button className="page-link" onClick={() => onPageChange(currentPage + 1)}>Next</button>
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default BootstrapPagination;
