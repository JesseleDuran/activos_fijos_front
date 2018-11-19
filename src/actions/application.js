import config from "config";
import countryLocations from "utils/countryLocationValues";
import axios from "axios";
import * as constants from "../constants/actions";
import { fetchIntegrations } from "./integration";

export const selectCountry = countryName => dispatch => {
  const values = countryLocations[countryName];
  if (values)
    axios
      .get(config.API.RESOLVE_COUNTRY_URL, {
        params: values,
      })
      .then(res => {
        const url = res.data.services.replace("http:", "https:");
        const length = url.length;
        dispatch({
          type: constants.SELECT_COUNTRY,
          payload: {
            baseUrl: url.substring(0, length - 1),
            country: countryName,
          },
        });
        localStorage.setItem("country", countryName);
        dispatch(fetchIntegrations());
      });
};
