import app from "@/data/app";
import { useState } from "preact/hooks";
import { ChangeEvent } from "preact/compat";
import validationCheck from "@/helpers/validate";

// form fields data-types
interface FormData {
  name: string;
  email: string;
}

// form response data-types
interface FormResponse {
  body: string;
  status: "success" | "failure";
}

// all possible form states
type FormState = "loading" | "submitted" | "failed";

const Form = (): JSX.Element => {
  const [data, setData] = useState<FormData>({ name: "", email: "" });
  const [response, setResponse] = useState<FormResponse>();
  const [state, setState] = useState<FormState>();

  // getting the form submission history from the localstorage.
  // Set it to an empty array if history is undefined.
  const history: Array<string> = JSON.parse(
    localStorage.getItem("history") || "[]"
  );

  // Updating state as the input element is changed
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target as HTMLInputElement;
    setData({ ...data, [name]: value });
  };

  // submit function
  const submit = async (e: SubmitEvent): Promise<void> => {
    // preventing the default behavior so that page doesn't refresh
    e.preventDefault();

    // setting form state to loading
    setState("loading");

    // validating data, if data is invalid,
    // set form state to failed and return.
    if (!validationCheck({ ...data })) {
      setResponse({
        body: app.form.response.failure,
        status: "failure",
      });
      setState("failed");
      return;
    }

    // Given data was valid, making a fetch request,
    try {
      await fetch(app.form.api_url, {
        method: app.form.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, domain: app.domain }),
      });

      // storing user email in the localstorage
      history.push(data.email);
      setData({ name: "", email: "" });
      localStorage.setItem("history", JSON.stringify(history));

      // setting a successful response
      setResponse({
        body: app.form.response.success,
        status: "success",
      });
      setState("submitted");
    } catch (err) {
      // log the error to the console
      console.error(err);

      // setting a failed response
      setResponse({
        body: app.form.response.failure,
        status: "failure",
      });
      setState("failed");
    }
  };

  return (
    <form action={app.form.api_url} method={app.form.method} onSubmit={submit}>
      <input type="hidden" value={app.domain} name="domain" />

      <div>
        <label htmlFor="name">Your Name</label>

        <input
          type="text"
          placeholder={`e.g. ${app.seller.name}`}
          id="name"
          name="name"
          onChange={handleChange}
          value={data.name}
          required
        />
      </div>

      <div>
        <label htmlFor="email">Your Email</label>

        <input
          type="email"
          placeholder={`e.g. ${app.seller.name.split(" ")[0].toLowerCase()}@${
            app.domain
          }`}
          id="email"
          name="email"
          onChange={handleChange}
          value={data.email}
          required
        />
      </div>

      {response && (
        <dl className={`response-${response.status}`}>
          <dt>{response.status}</dt>
          <dd>{response.body}</dd>
        </dl>
      )}

      <button
        type="submit"
        disabled={state === "loading" || state === "submitted"}
      >
        {state === "loading" && "Submitting..."}
        {state === "submitted" && "Submitted..."}
        {state === "failed" && "Submit Again"}
        {state !== "loading" &&
          state !== "submitted" &&
          state !== "failed" &&
          "Submit"}
      </button>
    </form>
  );
};

export default Form;
