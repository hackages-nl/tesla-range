import React, {Component} from 'react';
import teslaService from "./tesla-battery.service";
import {TeslaCar} from "./components/TeslaCar";
import TeslaStatsComponent from './components/TeslaStatsComponent';
import TeslaCounterComponent from './components/TeslaCounterComponent';

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
    const {speed} = this.state
    if(speed.value < speed.max){
      this.setState({speed: {...this.state.speed, value: speed.value + speed.step}})
    }
  }
  incrementTemperature = () => {
    const {temperature} = this.state
    if (temperature.value < temperature.max) {
      this.setState({temperature: {...this.state.temperature, value: temperature.value + temperature.step}})
    }
  }

  decrementSpeed = () => {
    const {speed} = this.state
    if(speed.value > speed.min){
      this.setState({speed: {...this.state.speed, value: speed.value - speed.step}})
    }
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
      <form className="tesla-battery">
        <h1>{title}</h1>

        {/* TeslaCarComponent */}
        <TeslaCar wheels={wheels.value}
                   speed={speed.value}/>
        {/* End TeslaCarComponent */}

        <TeslaStatsComponent models={models}
                            metrics={metrics}
                            wheels={wheels}
                            speed={speed}
                            climate={climate}
                            temperature={temperature}/>

        <div className="tesla-controls cf">
          {/* TeslaCounterComponent for speed */}
          <TeslaCounterComponent speed={speed} 
                                incrementSpeed={this.incrementSpeed} 
                                decrementSpeed={this.decrementSpeed} 
                                onFocusSpeed={this.onFocusSpeed} 
                                onBlurSpeed={this.onBlurSpeed}/>
          {/* End TeslaCounterComponent for speed */}
          <div className="tesla-climate cf">

            {/* TeslaCounterComponent for outside temperature */}
            <div className="tesla-counter">
              <p className="tesla-counter__title">Outside Temperature</p>
              <div className="tesla-counter__container cf">
                <div className="tesla-counter__item"
                     tabIndex="0"
                     onBlur={() => this.onBlurTemperature}
                     onFocus={() => this.onFocusTemperature()}>
                  <p className="tesla-counter__number">
                    {temperature.value}
                    <span>°</span>
                  </p>
                  <div className="tesla-counter__controls"
                       tabIndex="-1">
                    <button tabIndex="-1"
                            type="button"
                            onClick={this.incrementTemperature}
                            disabled={temperature.value === temperature.max}/>
                    <button tabIndex="-1"
                            type="button"
                            onClick={this.decrementTemperature}
                            disabled={temperature.value === temperature.min}/>
                  </div>
                </div>
              </div>
            </div>
            {/* End TeslaCounterComponent for outside temperature */}

            {/* TeslaClimateComponent */}
            <div>
              <label className={`tesla-climate__item ${!(temperature.value > 10) ? 'tesla-heat ' : ' '}${climate.value ? 'tesla-climate__item--active ': ' '}${climate.focused === climate.value ? 'tesla-climate__item--focused': ''}`}>
                <p className="heat">{temperature.value > 10 ? 'ac' : 'heat'} {climate.value ? 'on' : 'off'}</p>
                <i className="tesla-climate__icon"/>
                <input type="checkbox"
                       name="climate"
                       defaultChecked={climate.value}
                       onClick={this.changeClimate}
                       onBlur={this.onBlurClimate}
                       onFocus={this.onFocusClimate}/>
              </label>
            </div>
            {/* End TeslaClimateComponent */}
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
                         name="wheelsize"
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
    )
  }
}
