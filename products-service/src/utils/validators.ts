import validate from "validate.js/validate";

// Types
type IGeneric = {
  [index in string | number | any]: string | number | boolean | any;
};

/**
 * Validate values against constraints
 * @param values
 * @param constraints
 * @return {Promise<any>}
 */
export const validateAgainstConstraints = (
  values: IGeneric,
  constraints: IGeneric
) => {
  return new Promise<void>((resolve, reject) => {
    const validation = validate(values, constraints);

    if (typeof validation === "undefined") {
      resolve();
    } else {
      reject({ statusCode: 400, data: validation });
    }
  });
};
