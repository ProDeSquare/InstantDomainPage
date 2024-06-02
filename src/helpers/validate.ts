const requestHasEmptyFields = (req: Record<string, string>): boolean => {
  for (const key in req) {
    if (req[key] === "") {
      return true;
    }
  }

  return false;
};

const alreadyRequested = (email: string): boolean => {
  return (
    JSON.parse(localStorage.getItem("history") || "[]") as Array<string>
  ).includes(email);
};

const validationCheck = (req: Record<string, string>): boolean => {
  if (requestHasEmptyFields(req)) return false;
  if (alreadyRequested(req.email)) return false;

  return true;
};

export default validationCheck;
