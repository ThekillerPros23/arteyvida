import { Link } from "react-router-dom";

const Form = () => {
  return (
    <div className="bg-slate-500 bg-cover h-screen flex justify-center items-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <ul className="flex justify-center mb-4">
          <li className="px-4 py-2 bg-red-500 rounded-tl-lg text-white font-bold">
            <Link to="/login">Login</Link>
          </li>
          <li className="px-4 py-2 bg-yellow-400 rounded-tr-lg text-white font-bold">
            <Link to="/register">Register</Link>
          </li>
        </ul>
        <form className="space-y-4">
          <div className="flex flex-col">
            <label className="text-black font-bold mb-2">Email</label>
            <input
              className="border-2 border-black rounded px-4 py-2 focus:outline-none focus:border-blue-500"
              type="text"
              placeholder="Email"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-black font-bold mb-2">Password</label>
            <input
              className="border-2 border-black rounded px-4 py-2 focus:outline-none focus:border-blue-500"
              type="password"
              placeholder="Password"
            />
          </div>
          <div className="flex justify-between items-center">
            <Link
              to="/dashboard"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </Link>
            <Link
              to="/newdata"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              New
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;

