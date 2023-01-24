const Dashboard = () => {
  return (
    <table className="text-center px-4 border-2 border-black">
      <div>
      <thead >
        <tr>
          <th className="border-black border-2 flex-grow">celda</th>
          <th className="border-black border-2">charla</th>
          <th className="border-black border-2">distraer</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border-black border-2">January</td>
          <td className="border-black border-2">$100</td>
          <td className="border-black border-2">$200</td>
        </tr>
      </tbody>
      </div>
      
    </table>
  );
};
export default Dashboard;
