import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
const PopulationChart = ({ data }) => {
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="card-title">Population Over Time</h2>
        <LineChart width={600} height={400} data={data}>
          <XAxis dataKey="year" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Line type="monotone" dataKey="value" name="Population" stroke="#8884d8" />
        </LineChart>
      </div>
    </div>
  );
};

export default PopulationChart;