import { useState } from 'react';
import axios from 'axios';

const BASE_URL = 'https://www.metaweather.com/api/location';
const CROSS_DOMAIN = 'https://the-ultimate-api-challenge.herokuapp.com';
const REQUEST_URL = `${CROSS_DOMAIN}/${BASE_URL}`;

const useForecast = () => {
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [forecast, setForecast] = useState(null);

    // call the API
    const submitRequest = async location => {
        // 1. get woeid
        const { data } = await axios(`${REQUEST_URL}/search`, { params: { query: location } });
        // 2. get weather
        console.log({ data });

        if (!data || data.length === 0) {
            // set an Error
             setIsError("There is no such location");
             return;
        }
        
        const response = await axios(`${REQUEST_URL}/${data[0].woeid}`);
        console.log({response});
    };

    return {
        isError,
        isLoading,
        forecast,
        submitRequest,
    };
};
export default useForecast;
