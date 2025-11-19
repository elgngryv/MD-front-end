import InteractiveSVG from "./interactivesvg";
import data from "./data.json";

const Svg = () => {
  return (
    <InteractiveSVG
      data={data}
      width={47}
      categoryCode={1}
      height={148}
      viewBox="0 0 57 148"
      defaultColor="#D1D5DB"
      hoverColor="#0040C1"
      activeColor="#FD4A3D"
    />
  );
};

export default Svg;
