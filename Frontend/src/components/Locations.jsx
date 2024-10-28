import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMethod } from '../redux/slices/AnalyticsSlice';
import { fetchFacilitiesAccordingToCountries } from '../services/Apis';

const Locations = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.analytics);

  // State to manage the current page number
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch data on page load and whenever `currentPage` changes
  useEffect(() => {
    dispatch(fetchMethod({ func: fetchFacilitiesAccordingToCountries, name: "fetchFacilitiesAccordingToCountries", page: currentPage }));
  }, [dispatch, currentPage]);

  // Handlers for moving between pages
  const movePrevious = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const moveNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 space-y-6 bg-gray-400">
      
      {/* Heading */}
      <h1 className="text-3xl font-bold text-gray-800">Distribution of Clinical Trial Locations</h1>
      
      {/* Chart Container */}
      <div style={{ width: '100%', height: 400 }}>
        <h2>Country vs Facility Count</h2>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="country" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="facilityCount" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {/* Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={movePrevious}
          className="px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-600 active:bg-blue-700 transition duration-200"
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <button
          onClick={moveNext}
          className="px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-600 active:bg-blue-700 transition duration-200"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Locations;
