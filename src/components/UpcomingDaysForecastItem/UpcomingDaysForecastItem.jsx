import React from 'react';
import PropTypes from "prop-types";

import styles from './UpcomingDaysForecastItem.module.css';
const imgUrlBase = "https://www.metaweather.com/static/"

const UpcomingDaysForecastItem = ({imgUrl, temperature, weekday}) => (
    <li className={`${styles.weekday} d-flex flex-column justify-content-center align-items-center p-2`}>
        <img className="mb-2" width="30" src={`${imgUrlBase}img/weather/${imgUrl}.svg`} alt="upcomingDaysIcon" /> 
        <span className="mb-2">{weekday}</span>
        <span className="mb-2">{temperature}&deg;</span>
    </li>
);
UpcomingDaysForecastItem.propTypes = {
    imgUrl: PropTypes.string.isRequired,
    temperature: PropTypes.number.isRequired,
    weekday: PropTypes.string.isRequired,
}

export default UpcomingDaysForecastItem;
