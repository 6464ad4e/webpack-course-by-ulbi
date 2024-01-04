import jpg from "@/assets/1.jpeg";
import png from "@/assets/2.png";
import Svg from "@/assets/math.svg";

const About = () => {
  return (
    <div>
      <h1>ABOUT</h1>
      <img src={jpg} alt='' />
      <img src={png} alt='' />
      <Svg color={"red"} width={450} height={450} />
    </div>
  );
};

export default About;
