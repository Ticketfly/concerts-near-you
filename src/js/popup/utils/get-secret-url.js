import { TICKETMASTER_API_KEY } from "secrets";

export default function getSecretURL(keyword, geolocation, radius=50, apikey=TICKETMASTER_API_KEY) {
  const latlong = geolocation ? `${geolocation.latitude},${geolocation.longitude}` : null;
  
  if (radius === "-1") {
    radius = 10000;
  }
  
  const params = Object.entries({
    keyword,
    latlong,
    apikey,
    radius
  }).filter(([, value]) => value)
    .reduce((prev, [key, value], ci, { length: l }) => `${prev}${key}=${value}${ci < l - 1 ? '&' : ''}`,'?');

  return `https://app.ticketmaster.com/discovery/v2/events.json${params}`;
}
