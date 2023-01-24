import img from "../assets/img1.webp";
import img1 from "../assets/img2.webp";
import img2 from "../assets/img3.webp";
import img3 from "../assets/img4.webp";
import img4 from "../assets/img5.jpg";
import img5 from "../assets/img6.jpg";

const Home = () => {
  return (
    <div className="bg-slate-400 px-8 py-8">
  
      <div className="grid grid-cols-3">
        <img className="h-80  px-5 py-5  " src={img}></img>

        <img className="h-80 px-5 py-5 " src={img1}></img>
        <img className="h-80 px-5 py-5 " src={img2}></img>
        <img className="h-80 px-5 py-5" src={img3}></img>
        <img className="h-80 px-5 py-5" src={img4}></img>
        <img className="h-80 px-5 py-5 " src={img5}></img>
      </div>
    </div>
  );
};
export default Home;
