import { useState } from 'react';
import axios from 'axios';

import getCurrentDayDetailedForecast from '../helpers/getCurrentDayDetailedForecast';
import getCurrentDayForecast from '../helpers/getCurrentDayForecast';
import getUpcomingDaysForecast from '../helpers/getUpcomingDaysForecast';

const BASE_URL = 'https://www.metaweather.com/api/location';
const CROSS_DOMAIN = 'https://the-ultimate-api-challenge.herokuapp.com';
const REQUEST_URL = `${CROSS_DOMAIN}/${BASE_URL}`;

const useForecast = () => {
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [forecast, setForecast] = useState(null);

    const getWoeid = async location => {
        // 1. get woeid
        const { data } = await axios(`${REQUEST_URL}/search`, { params: { query: location } });
        // 2. get weather
        console.log({ data });

        if (!data || data.length === 0) {
            // set an Error
            setIsError('There is no such location 😢💔');
            setIsLoading(false);
            return;
        }

        return data[0];
    };
    const getForecast = async (woeid) => {
        const { data } = await axios(`${REQUEST_URL}/${woeid}`);
        if (!data || data.length === 0) {
            setIsError('Something went wrong 😖💔');
            setIsLoading(false);
            return;
        }
        return data;
    };
    
    const gatherForecastData = (data) => {
        const currentDay = getCurrentDayForecast(data.consolidated_weather[0], data.title);
        const currentDayDetails = getCurrentDayDetailedForecast(data.consolidated_weather[0]);
        const upcomingDays = getUpcomingDaysForecast(data.consolidated_weather);
        
        setForecast({
            currentDay, currentDayDetails, upcomingDays
        });
        setIsLoading(false);
    };

    const submitRequest = async location => {
        setIsLoading(true);
        setIsError(false);

        const response = await getWoeid(location);
        if (!response?.woeid) {
            return;
        }
        const data = await getForecast(response.woeid);
        if (!data) {
            return;
        }

        gatherForecastData(data);
    };

    return {
        isError,
        isLoading,
        forecast,
        submitRequest,
    };
};
export default useForecast;
