import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { fetchMethod } from '../redux/slices/AnalyticsSlice';
import { fetchDemographics } from '../services/Apis';

// Sample data for the charts (replace with your actual data)


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const Demographics = () => {



  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.analytics);

console.log(data)
  useEffect(() => {
      dispatch(fetchMethod({"func":fetchDemographics,"name":"fetchDemographics"}));

  }, [dispatch]);

  return (

    <div className="flex flex-col items-center justify-center p-10 bg-gray-400 max-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Demographics Data</h1>
      {
        data && data.sexData && data.sexData.length>0 && data.ageData && data.ageData.length>0 && (
          <div className="flex flex-row space-x-5 w-full max-w-full justify-center items-center">
        
        {/* Sex Distribution Chart */}
        <div className="flex-1 bg-white p-4 shadow-lg rounded-lg flex flex-col items-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Sex Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.sexData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={100} // Adjusted to fit within the box
                fill="#8884d8"
                dataKey="value"
              >
                {data.sexData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Avg Age Distribution Chart - Replaced with Bar Chart */}
        <div className="flex-1 bg-white p-4 shadow-lg rounded-lg flex flex-col items-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Average Age Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.ageData}>
              <XAxis dataKey="name" stroke="#8884d8" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" barSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
        )
      }
      
    </div>
  );
};

export default Demographics;
