import { TICKETMASTER_API_KEY } from "secrets";

export default function getSecretURL(keyword, geolocation, radius=50, zipcode, apikey=TICKETMASTER_API_KEY) {
  const baseParams = {
    keyword,
    apikey,
    radius
  }

  if (radius === "-1") {
    radius = 10000;
  }

  if (zipcode) {
    baseParams.postalCode = zipcode
  } else if (geolocation) {
    baseParams.latlong = geolocation ? `${geolocation.latitude},${geolocation.longitude}` : null;
  }

  const params = Object.entries(baseParams).filter(([, value]) => value)
    .reduce((prev, [key, value], ci, { length: l }) => `${prev}${key}=${value}${ci < l - 1 ? '&' : ''}`,'?');

  return `https://app.ticketmaster.com/discovery/v2/events.json${params}`;
}
