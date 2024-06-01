import app from "@/data/app";

const Form = (): JSX.Element => {
  return (
    <form action={app.form_submit_api_url} method="POST">
      <input type="hidden" value={app.domain} name="domain" />

      <div>
        <label htmlFor="name">Your Name</label>

        <input
          type="text"
          placeholder={`e.g. ${app.seller_name}`}
          id="name"
          name="name"
          required
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
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
