import img from "../assets/img1.webp";
import img1 from "../assets/img2.webp";
import img2 from "../assets/img3.webp";
import img3 from "../assets/img4.webp";
import img4 from "../assets/img5.jpg";
import img5 from "../assets/img6.jpg";

const Home = () => {
  return (
    <div className="bg-slate-400  bg-center h-screen">
      <div className="h-96 w-full">
        <img src={img} className="w-full h-full "></img>
      </div>
      <div>
        <img src={img1} className="w-full h-full"></img>
      </div>
    </div>
  );
};
export default Home;
