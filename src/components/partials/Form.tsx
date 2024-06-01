import app from "@/data/app";

const Form = (): JSX.Element => {
  return (
    <form action="#">
      <div>
        <label htmlFor="name">Your Name</label>

        <input
          type="text"
          placeholder={`e.g. ${app.seller_name}`}
          id="name"
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
          required
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
