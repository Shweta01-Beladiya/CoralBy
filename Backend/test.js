import axios from "axios";
import fs from 'fs';

// 🔐 Set your API key (replace with your actual API key)
const API_KEY = '92944ac9-842b-46e1-b527-766ddaa48d20';

// 📦 Parcel details
const fromPostcode = '2000';
const toPostcode = '3000';
const length = 22;
const width = 16;
const height = 7.7;
const weight = 1.5;
const serviceCode = 'AUS_PARCEL_REGULAR';

// 🌐 Build the API URL with query parameters
const queryParams = new URLSearchParams({
    from_postcode: fromPostcode,
    to_postcode: toPostcode,
    length: length,
    width: width,
    height: height,
    weight: weight,
    service_code: serviceCode,
}).toString();

const url = `https://digitalapi.auspost.com.au/postage/parcel/domestic/calculate.json?${queryParams}`;

// 📬 Make the GET request
axios.get(url, {
    headers: {
        'AUTH-KEY': API_KEY
    }
})
    .then(response => {

        console.log('Postage Calculation Result:', response.data.postage_result);
    })
    .catch(error => {
        if (error.response) {
            console.error('❌ API Error:', error.response.status, error.response.data);
        } else {
            console.error('❌ Request Error:', error.message);
        }
    });
