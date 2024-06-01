import app from "@/data/app";
import Form from "@/components/partials/Form";
import Footer from "@/components/sections/Footer";

const Right = (): JSX.Element => (
  <section className="app-content-container">
    <div>
      <h2>Interested?</h2>

      <p>
        Make <strong>{app.domain}</strong> yours today. Fill in the form, and
        we'll reach out to you with more details.
      </p>

      <Form />
    </div>

    <div className="mobile-footer-container">
      <Footer />
    </div>
  </section>
);

export default Right;
