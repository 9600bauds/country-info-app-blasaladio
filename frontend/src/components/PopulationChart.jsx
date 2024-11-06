import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const PopulationChart = ({ data }) => {
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="card-title">Population Over Time</h2>
        
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <XAxis dataKey="year" />
            <YAxis
              angle={-45}
              textAnchor="end"
              tickFormatter={(value) => value && value.toLocaleString()}
            />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip 
              formatter={(value) => value && value.toLocaleString()}
            />
            <Line type="monotone" dataKey="value" name="Population" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PopulationChart;
