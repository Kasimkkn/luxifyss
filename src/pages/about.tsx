import about1 from "../assets/images/about-2.jpg";
const About = () => {
  return (
    <div className="about-page">
      <h1>Welcome to <span>LUXIFY</span>  Your Ultimate Destination for Trendy and Premium Footwear!</h1>
      <div className="about">
        <div className="about-image">
          <img src={about1} alt="about img" />
        </div>
        <div className="about-content">
          <h5>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi
            nulla quis ipsam ipsum esse fugiat dolorem culpa magnam, nemo,
            reiciendis voluptatibus quibusdam beatae cumque, velit qui? Labore
            voluptatum natus pariatur.
          </h5>
        </div>
      </div>
    </div>
  );
};

export default About;
