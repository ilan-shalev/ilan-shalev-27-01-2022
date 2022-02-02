import { Weekdays } from "../Helpers";
export const apiBase = "https://dataservice.accuweather.com";
// export const apiKey = "k3F6eAPd5vt0FvcHh9VmCIpBRIAZUACd";
export const apiKey = "0c3nyFXbgAbucRwNT1hd1OYDdnyngFkv";

//input: search input value , output :array of matching cities with keys
export async function locationAutoComplete(input) {
  if (input === null || input === undefined || input === "") input = "tel-aviv";
  const cities = [];
  const resp = await fetch(
    `${apiBase}/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${input}`
  );
  if (!resp.ok)
    throw Error(`could not fetch autocomplete data for input: ${input}`);
  const respData = await resp.json();
  for (const result of respData) {
    if (result.Type === "City") {
      cities.push({ key: result.Key, label: `${result.Country.ID} - ${result.LocalizedName} - ${result.AdministrativeArea.LocalizedName}` });
    }
  }
  return cities;
}

export async function getCurrentWeather(cityKey) {
  if (cityKey === null || cityKey === undefined || cityKey === "")
    throw new Error("invalid city Key: " + cityKey);
  const resp = await fetch(
    `${apiBase}/currentconditions/v1/${cityKey}?apikey=${apiKey}`
  );
  if (!resp.ok)
    throw Error(
      `could not fetch current Weather data for city Key: ${cityKey}`
    );
  return (await resp.json())[0];
}

export async function fetchNext5DaysForecast(cityKey) {
  if (cityKey === null || cityKey === undefined || cityKey === "")
    throw new Error("invalid city Key !!!");
  const resp = await fetch(
    `${apiBase}/forecasts/v1/daily/5day/${cityKey}?apikey=${apiKey}`
  );
  if (!resp.ok)
    throw Error(
      `could not fetch next 5 days Weather data for city Key: ${cityKey}`
    );
  const body = (await resp.json()).DailyForecasts;

  return body.map((forecast) => {
    return {
      day: Weekdays[new Date(forecast.Date).getDay()],
      temperature: `${
        (Number(forecast.Temperature.Maximum.Value) +
          Number(forecast.Temperature.Minimum.Value)) /
        2
      }`,
      tempUnit: forecast.Temperature.Maximum.Unit,
    };
  });
}

// export async function locationAutoComplete(input) {
//   if (input === null || input === undefined || input === "") input = "tel-aviv";
//   const cities = [];
//   cities.push({ key: 215793, label: "tel-aviv port" });
//   return cities;
// }
