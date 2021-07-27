import React from "react";

export const TeslaCounter = ({title, stat, unity, handleOnBlur, handleOnFocus, handleIncrement, handleDecrement}) => {
    return(
        <div className="tesla-counter">
            <p className="tesla-counter__title">{title}</p>
            <div className="tesla-counter__container cf">
                <div className="tesla-counter__item" tabIndex="0"
                    onBlur={handleOnBlur}
                    onFocus={handleOnFocus}>
                    <p className="tesla-counter__number">
                    {stat.value}
                    <span>{unity}</span>
                    </p>
                    <div className="tesla-counter__controls"
                        tabIndex="-1">
                    <button tabIndex="-1"
                            type="button"
                            onClick={handleIncrement}
                            disabled={stat.value === stat.max}/>
                    <button tabIndex="-1"
                            type="button"
                            onClick={handleDecrement}
                            disabled={stat.value === stat.min}/>
                    </div>
                </div>
            </div>
        </div>
    );
}