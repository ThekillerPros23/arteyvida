import img from "../assets/instagram.png";
const Footer = () => {
  return (
    <footer className="bg-black h-13 flex justify-center">
      <div className="px-4 ">
      <a href="https://www.instagram.com/_arteyvida/" target="_blank">
        <img classname="h-10 inline" src={img}></img>
      </a>
      </div>
    <div className="px-4">
    <a href="https://www.instagram.com/_arteyvida/" target="_blank">
        <img classname="h-10 inline" src={img}></img>
      </a>
    </div>
    <div className = "px-4">
    <a href="https://www.instagram.com/_arteyvida/" target="_blank">
        <img classname="h-10 inline" src={img}></img>
      </a>
    </div>
    </footer>
  );
};
export default Footer;
