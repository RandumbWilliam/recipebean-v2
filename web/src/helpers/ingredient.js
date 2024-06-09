import parser from "ingredientparserjs";

function ensureArray(el) {
  if (el !== null && el !== undefined) {
    return Array.isArray(el) ? el : [el];
  } else {
    return el;
  }
}

export function ingredientParser(strIngredient) {
  let {
    name,
    measurement,
    convertedMeasurement,
    hasAlternativeIngredients,
    hasAddedMeasurements,
    additional,
  } = parser.parse(strIngredient);

  const arrayMeasurments =
    measurement &&
    ensureArray(measurement).map((meas) => ({
      quantity: ensureArray(meas.quantity),
      unit: meas.unit,
      unitPlural: meas.unitPlural,
      isRange: meas.isRange,
    }));

  return {
    name: ensureArray(name),
    measurement: arrayMeasurments,
    convertedMeasurement,
    hasAlternativeIngredients,
    hasAddedMeasurements,
    additional,
  };
}

function measurementLabel(measurement) {
  if (measurement.isRange) {
    return `${measurement.quantity[0]} - ${measurement.quantity[1]} ${measurement.unitPlural}`;
  } else {
    return `${measurement.quantity[0]} ${measurement.unitPlural}`;
  }
}

export function ingredientLabel(ingredientObj) {
  const {
    name,
    measurement,
    convertedMeasurement,
    hasAlternativeIngredients,
    hasAddedMeasurements,
    additional,
  } = ingredientObj;

  let nameString = hasAlternativeIngredients
    ? `${name.join(" or ")}`
    : `${name[0]}`;
  let measurementString = measurement
    ? hasAddedMeasurements
      ? measurement.map((meas) => measurementLabel(meas)).join(" plus ")
      : measurementLabel(measurement[0])
    : null;
  let convertedMeasurementString = convertedMeasurement
    ? `(${measurementLabel(convertedMeasurement)})`
    : null;
  let additionalString = additional ? `(${additional})` : "";

  const parts = [
    measurementString,
    convertedMeasurementString,
    nameString,
    additionalString,
  ].filter(Boolean);

  return parts.join(" ");
}
