// src/Table.js
import React, { FC, useState } from 'react';

const Leaderboard:FC<any> = ({ data, rowsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data.length / rowsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleClick = (event: any) => {
    setCurrentPage(Number(event.target.id));
  };

  return (
    <div className="container mx-auto px-4 sm:px-8 max-w-3xl">
      <div className="py-8">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  {Object.keys(data[0]).map((key) => (
                    <th
                      key={key}
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentRows.map((row: any, index: any) => (
                  <tr key={index}>
                    {Object.values(row).map((val: any, i) => (
                      <td
                        key={i}
                        className="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                      >
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between mt-4 p-3">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-lg"
              >
                Previous
              </button>
              <div>
                {pageNumbers.map((number: any) => (
                  <button
                    key={number}
                    id={number}
                    onClick={handleClick}
                    className={`mx-1 px-3 py-2 ${
                      currentPage === number
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-700'
                    } font-semibold rounded-lg hover:bg-blue-400 hover:text-white`}
                  >
                    {number}
                  </button>
                ))}
              </div>
              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(prev + 1, pageNumbers.length)
                  )
                }
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-lg"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
