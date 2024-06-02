import app from "@/data/app";
import { useState } from "preact/hooks";
import { ChangeEvent } from "preact/compat";
import validationCheck from "@/helpers/validate";

interface FormState {
  name: string;
  email: string;
}

interface FormResponse {
  body: string;
  status: "success" | "failure";
}

const Form = (): JSX.Element => {
  const [data, setData] = useState<FormState>({ name: "", email: "" });
  const [response, setResponse] = useState<FormResponse>();

  const history: Array<string> = JSON.parse(
    localStorage.getItem("history") || "[]"
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target as HTMLInputElement;
    setData({ ...data, [name]: value });
  };

  const submit = async (e: SubmitEvent): Promise<void> => {
    e.preventDefault();

    if (!validationCheck({ ...data })) return;

    try {
      await fetch(app.form_submit_api_url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, domain: app.domain }),
      });

      history.push(data.email);
      setData({ name: "", email: "" });
      localStorage.setItem("history", JSON.stringify(history));

      setResponse({
        body: "Your submission was successfully received!",
        status: "success",
      });
    } catch {
      setResponse({
        body: "An error occurred while submitting your request. Please feel free to contact us directly via email for assistance.",
        status: "failure",
      });
    }
  };

  return (
    <form action={app.form_submit_api_url} method="POST" onSubmit={submit}>
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

      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
