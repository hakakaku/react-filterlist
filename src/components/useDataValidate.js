import Joi from "joi";
import { useState, useEffect } from "react";

function useDataValidate(data, joiSchema, errorList) {
  // Initialize state of errors.
  const [error, setError] = useState("");

  useEffect(() => {
    // Validate the input field using joi schema
    function validateProperty(obj) {
      // Initialize schema of Joi validation
      const schema = Joi.object(joiSchema);
      const { error } = schema.validate({ data: obj });

      // Set error message
      let errorMessage = "";
      if (error) {
        switch (error.details[0].type) {
          case "string.pattern.base":
            errorMessage = errorList.pattern;
            break;
          case "string.min":
            errorMessage = errorList.min;
            break;
          case "string.max":
            errorMessage = errorList.max;
            break;
          default:
            errorMessage = errorList.empty;
            break;
        }
      } else errorMessage = "";
      return errorMessage;
    }

    // Validate the input field in real-time.
    let currentError = "";
    const errorMessage = validateProperty(data);
    if (errorMessage) currentError = errorMessage;
    setError(currentError);
  }, [data, joiSchema, errorList]);

  return error;
}

export default useDataValidate;
