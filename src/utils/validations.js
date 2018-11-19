export const isRequired = value => (!value ? "Required" : undefined);

export const isEmail = value => {
  const emailRegex = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
  return !emailRegex.test(value) ? "Invalid" : undefined;
};

export const isMin = min => value =>
  value.length < min ? "its too short" : undefined;

export const isValidUrl = (
  url, // TODO know if \+ is unnecesary or not!
) =>
  url.match(
    /^(?:http(s)?:\/\/)?[\w.-]+(?:.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/gi,
  );

export const isValidAddress = address => {
  const isValid =
    address && address.text && address.isValid === false
      ? "Invalid"
      : undefined;
  return isValid;
};
