import React from 'react';

export const TeslaCounterComponent = ({
  title,
  onBlurItem,
  onFocusItem,
  counterNumber,
  onClickIncrease,
  disabledIncrease,
  onClickDecrease,
  disabledDecrease
}) => {
  return(
<div className="tesla-counter">
  <p className="tesla-counter__title">{title}</p>
   <div className="tesla-counter__container cf">
    <div className="tesla-counter__item"
       tabIndex="0"
       onBlur={onBlurItem}
       onFocus={onFocusItem}>
      <p className="tesla-counter__number">
      {counterNumber}
      <span>°</span>
      </p>
       <div className="tesla-counter__controls"
         tabIndex="-1">
        <button tabIndex="-1"
                type="button"
                onClick={onClickIncrease}
                disabled={disabledIncrease}/>
        <button tabIndex="-1"
                type="button"
                onClick={ onClickDecrease}    
                disabled={disabledDecrease}/>
      </div>
    </div>
  </div> 
</div> 
  )
}

{/* 
 ***** TeslaCounterComponent for speed *****
<div className="tesla-counter">
  <p className="tesla-counter__title">Speed</p>
  <div className="tesla-counter__container cf">
    <div className="tesla-counter__item" tabIndex="0"
        onBlur={this.onBlurSpeed}
        onFocus={this.onFocusSpeed}>
      <p className="tesla-counter__number">
        {speed.value}
        <span>mph</span>
      </p>
      <div className="tesla-counter__controls"
          tabIndex="-1">
        <button tabIndex="-1"
               type="button"
               onClick={this.incrementSpeed}
               disabled={speed.value === speed.max}/>
        <button tabIndex="-1"
               type="button"
               onClick={this.decrementSpeed}
               disabled={speed.value === speed.min}/>
      </div>
    </div>
  </div> 
</div>
***** End TeslaCounterComponent for speed *****
*/}

{/*
 ***** TeslaCounterComponent for outside temperature *****
<div className="tesla-counter">
  <p className="tesla-counter__title">Outside Temperature</p>
  <div className="tesla-counter__container cf">
    <div className="tesla-counter__item"
       tabIndex="0"
       onBlur={() => this.onBlurTemperature}
       onFocus={this.onFocusTemperature}>
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

 ******* End TeslaCounterComponent for outside temperature **********
 */}
