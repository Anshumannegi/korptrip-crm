import React from "react";

const ShimmerTable = () => {
  return (
    <div>
      <div className="hidden md:block">
        <table className="w-full mt-24 border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 p-5"></th>
              <th className="border border-gray-200 p-5"></th>
              <th className="border border-gray-200 p-5"></th>
              <th className="border border-gray-200 p-5"></th>
              <th className="border border-gray-200 p-5"></th>
              <th className="border border-gray-200 p-5"></th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 6 }).map((_, index) => (
              <tr
                key={index}
                className="border border-gray-300 cursor-pointer animate-pulse"
              >
                <td className="border border-gray-200 p-5 bg-gray-200"></td>
                <td className="border border-gray-200 p-5 bg-gray-200"></td>
                <td className="border border-gray-200 p-5 bg-gray-200"></td>
                <td className="border border-gray-200 p-5 bg-gray-200"></td>
                <td className="border border-gray-200 p-5 bg-gray-200"></td>
                <td className="border border-gray-200 p-5 bg-gray-200"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShimmerTable;
