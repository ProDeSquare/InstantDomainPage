const Form = (): JSX.Element => {
  return (
    <form action="#">
      <div>
        <label htmlFor="name">Your Name</label>

        <input type="text" placeholder="e.g. John Doe" id="name" required />
      </div>

      <div>
        <label htmlFor="email">Your Email</label>

        <input
          type="email"
          placeholder="e.g. john@example.com"
          id="email"
          required
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
