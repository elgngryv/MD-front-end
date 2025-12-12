import InteractiveSVG from "./interactivesvg";
import data from "./data.json";

const Svg = ({ categoryCode = null }) => {
  return (
    <InteractiveSVG
      data={data}
      width={47}
      categoryCode={categoryCode}
      height={148}
      viewBox="0 0 57 148"
      defaultColor="#D1D5DB"
      hoverColor="#0040C1"
      activeColor="#FD4A3D"
    />
  );
};

export default Svg;
