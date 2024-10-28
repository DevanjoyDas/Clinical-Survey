import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { fetchMethod } from '../redux/slices/AnalyticsSlice';
import { fetchTopCitiesByCountOfFacilities } from '../services/Apis';



const Trials = () => {


  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.analytics);

  useEffect(() => {
      dispatch(fetchMethod({"func":fetchTopCitiesByCountOfFacilities,"name":"fetchTopCitiesByCountOfFacilities"}));
      console.log("hello")
      if(data){
        console.log(data);
      }

  }, [dispatch]);

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 space-y-6 bg-gray-400 ">
      
      {/* Heading */}
      <h1 className="text-3xl font-bold text-gray-800">Top-10 with number of facilities per city</h1>
      
      {/* Chart Container */}
      <div style={{ width: '100%', height: 400 }}>
      <h2>Country vs Facility Count</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="city" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="facilityCount" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
      
    </div>
  )
}

export default Trials