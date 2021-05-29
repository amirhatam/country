import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "./components/Button";
import "./assets/styles/styles.css";
import Card from "./components/Card";
import BG from "./assets/img/1.jpg";

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
      image: "",
      currencies: "",
      languages: "",
      imagesC: "",
      imagesCollect:""
    };
    this.userInput = this.userInput.bind(this);
    this.renderImages = this.renderImages.bind(this);
   
  }
  componentDidMount() {
    // fetch("http://localhost:8000/countries/name/france")
    // fetch("https://restcountries.eu/rest/v2/name/france")
    //   .then((response) => response.json())
    //   .then((result) => {
        
    //     // let data = result[0];
    //     // // let data = result.resultCountries[0];

    //     // const countrieName = data.name;
    //     // const countrieCap = data.capital;
    //     // const countrieFlag = data.flag;
    //     // const countriePopul = data.population;
    //     // const countrieRegion = data.region;
    //     // const countrieImage = data.img;
    //     // const countrieCurren = data.currencies[0].name;
    //     // const countrielang = data.languages[0].name;
       

    //     // this.setState({
    //     //   name: countrieName,
    //     //   capital: countrieCap,
    //     //   flag: countrieFlag,
    //     //   population: countriePopul,
    //     //   region: countrieRegion,
    //     //   image: countrieImage,
    //     //   currencies: countrieCurren,
    //     //   languages: countrielang,
    //     // });
    //   });
  }
  getCountry(country) {
    // fetch("http://localhost:8000/countries/name/" + this.state.name)
    fetch("https://restcountries.eu/rest/v2/name/" + this.state.name)
      .then((response) => response.json())
      .then((result) => {
        // let data = result.resultCountries[0];
        let data = result[0];
         console.log("result", data);
        
        this.setState({
          name: data.name,
          capital: data.capital,
          flag: data.flag,
          population: data.population,
          region: data.region,
          image: data.img,
          currencies: data.currencies[0].name,
          languages: data.languages[0].name,
        });
      })
      .catch((err) => console.log(err));

    fetch(
      "http://api.unsplash.com/search/photos?page=1&query=" + this.state.name +"&client_id=" + clientId
    )
      .then((response) => response.json())
      .then((data) => {
   
        const testMap= data.results.map((elem)=> {
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

  renderImages(){
    if (!this.state.imagesCollect){
      return "Choose a country"
    }else if(!this.state.capital){
      const errImg = `https://www.portent.com/images/2018/01/Mystery-AdWords-Traffic-from-Banned-International-Countries-Portent.jpg`
      return <img className="bgImage py-1 border border-5" src={errImg} alt="new"/>
    }
    else {

      return  this.state.imagesCollect.map((elem, index) => {
        // console.log("App test elem :", elem);
        return <img className="bgImage py-1 border border-5" key={index} src={elem} alt="new"/>
      })
    }
    
  }

  render() {
    console.log(this.state.capital)
   const {
    flag,
    name,
    capital,
    region,
    population,
    image,
    currencies,
    languages,
    imageCnt,
   } = this.state
    return (
      <div
        className="text-center bgC "
        style={{ background: `url(${BG})` }}
      >
        <div className="input-group pt-3 headerContainer">
          <div className="input-group-prepend">
            <Button
              onClick={() => this.getCountry()}
              clickButton={() => this.getCountry("search")}
              // children=""
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
          flagImg={flag}
          country={name}
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
