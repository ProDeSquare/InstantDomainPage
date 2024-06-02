import app from "@/data/app";
import { useState } from "preact/hooks";
import { ChangeEvent } from "preact/compat";

interface FormState {
  name: string;
  email: string;
}

const Form = (): JSX.Element => {
  const [data, setData] = useState<FormState>({ name: "", email: "" });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target as HTMLInputElement;
    setData({ ...data, [name]: value });
  };

  const submit = async (e: SubmitEvent): Promise<void> => {
    e.preventDefault();

    if (!data.name || !data.email) return;

    try {
      await fetch(app.form_submit_api_url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, domain: app.domain }),
      });

      setData({ name: "", email: "" });

      console.log("Form submitted successfully!");
    } catch {
      console.error("There was an error");
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
          required
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
          required
          onChange={handleChange}
          value={data.email}
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
