import axios from 'axios';

async function fetchIPData(ip: string) {
    const options = {
        url: `https://${process.env.VITE_IPLOCATOR_API_HOST}/ip-info`,
        headers: {
            'x-rapidapi-key': process.env.VITE_IPLOCATOR_API_KEY,
            'x-rapidapi-host': process.env.VITE_IPLOCATOR_API_HOST,
            'Content-Type': 'application/json'
        },
        data: {
            ip: ip,
            'reverse-lookup': 'checked'
        }
    };

    try {
        const response = await axios.post(options.url, options.data, { headers: options.headers });
        console.log(response.data);
        return response.data.city;
    } catch (error) {
        console.error(error);
    }
}

export default fetchIPData;