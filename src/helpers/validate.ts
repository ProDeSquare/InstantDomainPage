import app from "@/data/app";

const requestHasEmptyFields = (req: Record<string, string>): boolean => {
  for (const key in req) {
    if (req[key] === "") {
      return true;
    }
  }

  return false;
};

const requestHasInvalidData = (req: Record<string, string>): boolean => {
  const emailRegex: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (req.name.length < 3 || !emailRegex.test(req.email)) return true;

  return false;
};

const alreadyRequested = (email: string): boolean => {
  return (
    JSON.parse(localStorage.getItem("history") || "[]") as Array<string>
  ).includes(email);
};

const emailFromSameDomain = (email: string): boolean => {
  return email.split("@")[1] === app.domain;
};

const validationCheck = (req: Record<string, string>): boolean => {
  if (requestHasEmptyFields(req)) return false;
  if (alreadyRequested(req.email)) return false;
  if (emailFromSameDomain(req.email)) return false;
  if (requestHasInvalidData(req)) return false;

  return true;
};

export default validationCheck;
