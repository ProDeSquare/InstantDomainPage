const requestHasEmptyFields = (req: Record<string, string>): boolean => {
  for (const key in req) {
    if (req[key] === "") {
      return true;
    }
  }

  return false;
};

const validationCheck = (req: Record<string, string>): boolean => {
  if (requestHasEmptyFields(req)) return false;

  return true;
};

export default validationCheck;
