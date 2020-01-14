/* eslint-disable no-unused-vars */
import React from "react";
import Titles from "./components/Titles"
import Form from "./components/Form"
import Weather from "./components/Weather"

const API_KEY = "af009c86c9303d2ccd372ea39a7b2e11";

class App extends React.Component {

  state = {
    temperature: undefined,
    city: undefined,
    country: undefined, 
    humidity: undefined,
    description: undefined,
  }

  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    const api_call = await fetch(`//api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
    const data = await api_call.json();

    if (city && country) {
      console.log(data);

      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ""
      })
    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Enter the values"
      });
    }
  }

  render () {
    return (
      <div>
        <div class="wrapper">
          <div class="main">
            <div class="container">
              <div class="row ">
                <div class="col-xs-12 col-xs-5 title-container">
                  <Titles />
                </div>
                <div class="col-xs-12 col-xs-7 form-container">
                  <Form getWeather={this.getWeather}/>
                  <Weather 
                    temperature={this.state.temperature}
                    city={this.state.city}
                    country={this.state.country}
                    humidity={this.state.humidity}
                    description={this.state.description}
                    error={this.state.error}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    );
  }
}





export default App;
