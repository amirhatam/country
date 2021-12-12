import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "./components/Button";
import "./assets/styles/styles.css";
import Card from "./components/Card";
import BG from "./assets/img/1.jpg";
import loading from "./assets/img/loading .gif";

const clientId = "KUzY-BCgRUgnhx7Y-TI9EXsr3Oq6HStenfHd9zNZIGk";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      capital: "",
      flag: "",
      population: "",
      region: "",
      // image: "",
      currencies: "",
      languages: "",
      imagesC: "",
      imagesCollect: "",
      countryName: ""
    };
    this.userInput = this.userInput.bind(this);
    this.renderImages = this.renderImages.bind(this);

  }


  getCountry(country) {
    fetch("https://restcountries.com/v3.1/name/" + this.state.name)
      .then((response) => response.json())
      .then((result) => {
        let data = result[0];

        let currenciesArray = Object.values(data.currencies)
        const currenciesMap = currenciesArray.map((elem) => {
          return elem.name;
        });

        this.setState({
          name: data.name.common,
          capital: data.capital[0],
          flag: data.flags.png,
          population: data.population,
          region: data.region,
          // image: data.img,
          currencies: currenciesMap,
          languages: Object.values(data.languages),
          countryName: data.name.common,
        });
      })
      .catch((err) => console.log(err));


    fetch(
      "https://api.unsplash.com/search/photos?page=1&query=" + this.state.name + "&client_id=" + clientId
    )
      .then((response) => response.json())
      .then((data) => {

        const testMap = data.results.map((elem) => {
          return elem.urls.regular
        })

        this.setState({
          // imageCnt: data.results[1].urls.full,
          imagesCollect: testMap
        });
      })
      .catch((err) => console.log(err));
  }

  userInput(event) {

    this.setState({
      name: event.target.value,

    });
  }

  componentDidMount() {

  }

  renderImages() {
    if (!this.state.imagesCollect) {
      return <h1 className="mt-5">Write the name of a Country</h1> 
    }
    else if (!this.state.capital) {
      // const errImg = `https://www.portent.com/images/2018/01/Mystery-AdWords-Traffic-from-Banned-International-Countries-Portent.jpg`
      // return <img className="bgImage py-1 border border-5" src={errImg} alt="new" />
      return <img className=" col-6 py-1 " src={loading} alt="new" />
    }
    else {

      return this.state.imagesCollect.map((elem, index) => {
        // console.log("App test elem :", elem);
        return <img className="bgImage py-1 border border-5" key={index} src={elem} alt="new" />
      })
    }

  }
  renderFlag() {
    if (!this.state.flag) {
      return ""
    }
    else {
      return <img className="flag" alt=" " src={this.state.flag}></img>
    }
  }

  render() {
    const {
      capital,
      region,
      population,
      image,
      currencies,
      languages,
      imageCnt,
      countryName
    } = this.state


    return (
      <div
        className="text-center bgC "
        style={{ background: `url(${BG})`, height: `${window.innerHeight}px` }}
      >
        <div className="input-group pt-3 headerContainer">
          <div className="input-group-prepend">
            <Button
              onClick={() => this.getCountry()}
              clickButton={() => this.getCountry("search")}
            >
              <i className="fas fa-search"></i>
            </Button>
          </div>
          <input
            onChange={this.userInput}
            type="text"
            className="form-control inputS"
            placeholder="Search Country"
          ></input>
        </div>

        <div className="row m-0">
          <p className="col-2 mt-2">Country</p>
          <p className="col-2 mt-2">Capital</p>
          <p className="col-2 mt-2">Region</p>
          <p className="col-2 mt-2">Population</p>
          <p className="col-2 mt-2">Languages</p>
          <p className="col-2 mt-2">Currencies</p>
        </div>

        <Card
          flagImg={this.renderFlag()}
          country={countryName}
          capitalName={capital}
          regionName={region}
          countryPopulation={population}
          countryImage={image}
          countryCurren={currencies}
          countryLang={languages}
          cntImages={imageCnt}
          imagecoll={this.renderImages()}
        ></Card>
      </div>
    );
  }
}

export default App;
