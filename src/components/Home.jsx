import img from "../assets/img1.webp";
import img1 from "../assets/img2.webp";
import img2 from "../assets/img3.webp";
import img3 from "../assets/img4.webp";
import img4 from "../assets/img5.jpg";
import img5 from "../assets/img6.jpg";

const Home = () => {
  return (
    <div className="bg-slate-400 bg-center min-h-screen flex flex-col items-center">
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        <img src={img1} className="w-full h-48 sm:h-64 md:h-80 lg:h-96 xl:h-112 object-cover" alt="Image 2" />
        <img src={img2} className="w-full h-48 sm:h-64 md:h-80 lg:h-96 xl:h-112 object-cover" alt="Image 3" />
        <img src={img3} className="w-full h-48 sm:h-64 md:h-80 lg:h-96 xl:h-112 object-cover" alt="Image 4" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <img src={img4} className="w-full h-48 sm:h-64 md:h-80 lg:h-96 xl:h-112 object-cover" alt="Image 5" />
        <img src={img5} className="w-full h-48 sm:h-64 md:h-80 lg:h-96 xl:h-112 object-cover" alt="Image 6" />
      </div>
    </div>
  );
};

export default Home;
