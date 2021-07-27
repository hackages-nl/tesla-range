import React, {Component} from 'react';
import teslaService from "./tesla-battery.service";
import {TeslaCar} from "./components/TeslaCar";
import {TeslaStats} from "./components/TeslaStats";
import {TeslaCounter} from "./components/TeslaCounter";
import { TeslaClimate } from './components/TeslaClimate';

export class TeslaBattery extends Component {
  state = {
    title: 'Ranger Per Charge',
    models: ['60', '60D', '75', '75D', '90D', 'P100D'],
    wheels: {
      sizes: [19, 21],
      value: 19,
      focused: null,
    },
    climate: {
      value: true,
      focused: false,
    },
    temperature: {
      value: 20,
      focused: false,
      min: -10,
      max: 40,
      step: 10,
    },
    speed: {
      value: 55,
      focused: false,
      min: 45,
      max: 70,
      step: 5,
    },
    metrics: {}
  }

  onBlurSpeed = () => {
    this.setState({speed: {...this.state.speed, focused: false}})
  }
  onBlurTemperature = () => {
    this.setState({temperature: {...this.state.temperature, focused: false}})
  }

  onFocusSpeed = () => {
    this.setState({speed: {...this.state.speed, focused: true}})
  }
  onFocusTemperature = () => {
    this.setState({temperature: {...this.state.temperature, focused: true}})
  }

  incrementSpeed = () => {

  }
  incrementTemperature = () => {

  }

  decrementSpeed = () => {

  }
  decrementTemperature = () => {
    const {temperature} = this.state
    if (temperature.value > temperature.min) {
      this.setState({temperature: {...this.state.temperature, value: temperature.value - temperature.step}})
    }
  }

  changeClimate = () => {

  }
  onBlurClimate = () => {
    this.setState({climate: {...this.state.climate, focused: false}})
  }
  onFocusClimate = () => {
    this.setState({climate: {...this.state.climate, focused: true}})

  }


  onBlurWheels = () => {
    this.setState({wheels: {...this.state.wheels, focused: null}})
  }
  changeWheelSize = (size) => {
    this.setState({wheels : {...this.state.wheels, value: size}})
  }
  onFocusWheels = (size) => {
    this.setState({wheels: {...this.state.wheels, focused: size}})
  }


  componentDidMount(){
    this.setState({metrics: teslaService.getModelData()})
  }

  render() {
    const {title, wheels, speed, models, metrics, climate, temperature} = this.state
    if(!metrics["60"]){
      return null
    }
    return (
      <>
        <form className="tesla-battery">
          <h1>{title}</h1>

          <TeslaCar wheels={wheels}
                    speed={speed.value}/>
         
          <TeslaStats models={models}
                      metrics={metrics}
                      wheels={wheels}
                      climate={climate}
                      speed={speed}
                      temperature={temperature} />
         

          <div className="tesla-controls cf">

            <TeslaCounter title="Speed"
                          stat={speed}
                          unity="mph"
                          handleOnBlur={this.onBlurSpeed}
                          handleOnFocus={this.onFocusSpeed}
                          handleDecrement={this.decrementSpeed}
                          handleIncrement={this.incrementSpeed}/>

            <div className="tesla-climate cf">

              <TeslaCounter title="Outside Temperature"
                            stat={temperature}
                            unity="°"
                            handleOnBlur={this.onBlurTemperature}
                            handleOnFocus={this.onFocusTemperature}
                            handleDecrement={this.decrementTemperature}
                            handleIncrement={this.incrementTemperature}/>              
              
              <TeslaClimate temperature={temperature}
                            climate={climate}
                            onChange={this.changeClimate}
                            onBlur={this.onBlurClimate}
                            onFocus={this.onFocusClimate}/>
            </div>

            {/* TeslaWheelsComponent */}
            <div className="tesla-wheels">
              <p className="tesla-wheels__title">Wheels</p>
              <div className="tesla-wheels__container cf">
                {wheels.sizes.map(size =>
                  <label                                  
                      key={size}
                      className={`${wheels.value === size ? 'tesla-wheels__item--active ': ' '}${wheels.focused === size ? 'tesla-wheels__item--focused ' : ' '}tesla-wheels__item tesla-wheels__item--${size}`}>
                    <input type="radio"
                          name={size}
                          value={size}
                          onBlur={this.onBlurWheels}
                          onClick={() => this.changeWheelSize(size)}
                          onFocus={() => this.onFocusWheels(size)}
                          defaultChecked={wheels.value === size}/>
                    <p>
                      {size}"
                    </p>
                  </label>
                )}
                  
              </div>
            </div>
            {/* End TeslaWheelsComponent */}

          </div>
          <div className="tesla-battery__notice">
            <p>
              The actual amount of range that you experience will vary based on your particular use conditions. See how
              particular use conditions may affect your range in our simulation model.
            </p>
            <p>
              Vehicle range may vary depending on the vehicle configuration, battery age and condition, driving style and
              operating, environmental and climate conditions.
            </p>
          </div>
        </form>
      </>
    )
  }
}

