import app from "@/data/app";
import { useState } from "preact/hooks";
import { ChangeEvent } from "preact/compat";
import validationCheck from "@/helpers/validate";

interface FormData {
  name: string;
  email: string;
}

interface FormResponse {
  body: string;
  status: "success" | "failure";
}

type FormState = "loading" | "submitted" | "failed";

const Form = (): JSX.Element => {
  const [data, setData] = useState<FormData>({ name: "", email: "" });
  const [response, setResponse] = useState<FormResponse>();
  const [state, setState] = useState<FormState>();

  const history: Array<string> = JSON.parse(
    localStorage.getItem("history") || "[]"
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target as HTMLInputElement;
    setData({ ...data, [name]: value });
  };

  const submit = async (e: SubmitEvent): Promise<void> => {
    e.preventDefault();

    setState("loading");
    if (!validationCheck({ ...data })) {
      setResponse({
        body: app.form.response.failure,
        status: "failure",
      });
      setState("failed");
      return;
    }

    try {
      await fetch(app.form.api_url, {
        method: app.form.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, domain: app.domain }),
      });

      history.push(data.email);
      setData({ name: "", email: "" });
      localStorage.setItem("history", JSON.stringify(history));

      setResponse({
        body: app.form.response.success,
        status: "success",
      });
      setState("submitted");
    } catch (err) {
      console.error(err);
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
          placeholder={`e.g. ${app.seller_name}`}
          id="name"
          name="name"
          onChange={handleChange}
          value={data.name}
        />
      </div>

      <div>
        <label htmlFor="email">Your Email</label>

        <input
          type="email"
          placeholder={`e.g. ${app.seller_name.split(" ")[0].toLowerCase()}@${
            app.domain
          }`}
          id="email"
          name="email"
          onChange={handleChange}
          value={data.email}
        />
      </div>

      {response && (
        <p className={`response-${response.status}`}>{response.body}</p>
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
