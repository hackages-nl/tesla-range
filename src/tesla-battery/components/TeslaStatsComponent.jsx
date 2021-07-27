import React from 'react'

function TeslaStatsComponent({models, metrics, wheels, climate, speed, temperature}) {
  return (
    <div className="tesla-stats">
      <ul>
        {/* This is working well in the first place you won't have to touch it */}
        {models.map(model => {
          const miles = metrics[model][wheels.value][
            climate.value ? 'on' : 'off'
            ].speed[speed.value][temperature.value];
          return {
            model,
            miles,
          }
        }).map(stat => <li key={stat.model}>
          {/* the stat.model here under must be lowercased */}
          <div className={`tesla-stats-icon tesla-stats-icon--${stat.model.toLowerCase()}`} />
            <p>{stat.miles}
              <span>MI</span>
            </p>
          </li>
        )}
      </ul>
    </div>
  )
}

export default TeslaStatsComponent
