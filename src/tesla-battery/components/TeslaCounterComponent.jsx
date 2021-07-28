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

