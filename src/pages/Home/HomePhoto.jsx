import React from "react";

// Style
import "../../assets/style/home.css";

// Components
import OrdinaryListHeader from "../../components/OrdinaryList/OrdinaryListHeader";
import HomeImage from "../../assets/images/login-page-images/login-background-now.jpg";

function Home() {
  return (
    <>
      <div className="HomeWrapper">
        <img className="w-[1700px] h-[750px]" src={HomeImage} alt={HomeImage} />
      </div>
    </>
  );
}

export default Home;
