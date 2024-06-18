import app from "@/data/app";

/**
 * Function to check if the request has empty fields.
 *
 * @function
 * @name requestHasEmptyFields
 * @kind variable
 * @param {Record<string} req
 * @param {any} string>
 * @returns {boolean}
 */
const requestHasEmptyFields = (req: Record<string, string>): boolean => {
  for (const key in req) {
    if (req[key] === "") {
      return true;
    }
  }

  return false;
};

/**
 * Function to check if the request has invalid data
 * Name must be atleast 3 characters
 * Email must be a valid email
 *
 * @function
 * @name requestHasInvalidData
 * @kind variable
 * @param {Record<string} req
 * @param {any} string>
 * @returns {boolean}
 */
const requestHasInvalidData = (req: Record<string, string>): boolean => {
  const emailRegex: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (req.name.length < 3 || !emailRegex.test(req.email)) return true;

  return false;
};

/**
 * Function to check if the request is a duplicate
 * It matches provided email with localstorage
 *
 * @function
 * @name alreadyRequested
 * @kind variable
 * @param {string} email
 * @returns {boolean}
 */
const alreadyRequested = (email: string): boolean => {
  return (
    JSON.parse(localStorage.getItem("history") || "[]") as Array<string>
  ).includes(email);
};

/**
 * Function to check if the email is from the domain being sold
 *
 * @function
 * @name emailFromSameDomain
 * @kind variable
 * @param {string} email
 * @returns {boolean}
 */
const emailFromSameDomain = (email: string): boolean => {
  return email.split("@")[1] === app.domain;
};

/**
 * Function that runs all the validations one by one
 *
 * @function
 * @name validationCheck
 * @kind variable
 * @param {Record<string} req
 * @param {any} string>
 * @returns {boolean}
 */
const validationCheck = (req: Record<string, string>): boolean => {
  if (requestHasEmptyFields(req)) return false;
  if (alreadyRequested(req.email)) return false;
  if (emailFromSameDomain(req.email)) return false;
  if (requestHasInvalidData(req)) return false;

  return true;
};

export default validationCheck;
