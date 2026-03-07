import React from 'react';

const RoomFilter = ({ capacity, setCapacity }) => {
  const capacities = [1, 2, 3, 4, 5, 6];

  return (
    <div className="mb-8">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Filtrar por capacidad:
      </label>
      <select
        value={capacity}
        onChange={(e) => setCapacity(e.target.value)}
        className="w-full md:w-64 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
      >
        <option value="" className="dark:bg-gray-800 dark:text-white">Todas las capacidades</option>
        {capacities.map(num => (
          <option key={num} value={num} className="dark:bg-gray-800 dark:text-white">{num} persona(s)</option>
        ))}
      </select>
    </div>
  );
};

export default RoomFilter;