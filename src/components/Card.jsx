import React from "react";
import Fade from "react-reveal/Fade";

class Card extends React.Component {
  render() {
    const {
      cntImages,
      flagImg,
      capitalName,
      regionName,
      countryPopulation,
      countryLang,
      countryCurren,
      country,
      imagecoll
     } = this.props
    return (
      <div
        className="bgCard"
        style={{
          background: `url(${cntImages})`,
         
        }}
      >
        <Fade duration={30000}>
          <div className="row thead-light m-0">
            <p className="col-2 cardP">
              {flagImg}
              {country}
            </p>
            <p className=" col-2 cardP"> {capitalName}</p>
            <p className=" col-2 cardP"> {regionName}</p>
            <p className=" col-2 cardP"> {countryPopulation}</p>
            <p className=" col-2 cardP"> {countryLang}</p>
            <p className=" col-2 cardP"> {countryCurren}</p>
          </div>
        </Fade>
        <div>{imagecoll}</div>
      </div>
    );
  }
}

export default Card;
