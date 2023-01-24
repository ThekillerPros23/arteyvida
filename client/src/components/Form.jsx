import { Link } from "react-router-dom";

const Form = () => {
  return (
    <div className="bg-slate-500 bg-cover mx-auto h-screen">
    
    
      <div className="flex justify-center px-10 py-10">
      
        <form className="bg-white border-4 px-4 py-4">
        <ul className="text-center px-4">
          <li className="inline px-4 bg-red-500">Login</li>
          <li className="inline bg-yellow-400">Register</li>
        </ul>
          <div className="px-4 py-4 bg-white">
            <input
              className="border-2 h-9 w-64 text-black font-bold text-center"
              type="text"
              placeholder="Email"
            ></input>
          </div>
          <div className="px-4 py-4 ">
            <input
              className=" border-2 border-slate-500 placeholder:text-black selection:bg-slate-400 text-black  font-bold text-center"
              type="password"
              placeholder="Password"
            ></input>
          </div>
          <Link to="/dashboard">Submit</Link>
        </form>
      </div>
    </div>
  );
};

export default Form;
