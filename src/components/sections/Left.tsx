import app from "@/data/app";
import Logo from "@/components/partials/Logo";
import Footer from "@/components/sections/Footer";

const Left = (): JSX.Element => (
  <section className="app-title-wrapper">
    <div className="app-title-container">
      <Logo />

      <div className="app-title">
        <h1>Domain For Sale!</h1>

        <p>
          Discover the potential of <strong>{app.domain}</strong>, now available
          for sale! This premium domain offers endless possibilities for your
          online venture. Act quickly to secure this valuable asset and unlock
          new opportunities. Don't wait, inquire now to make{" "}
          <strong>{app.domain}</strong> yours and start building your digital
          empire!
        </p>

        <button onClick={() => window.open(`mailto:${app.seller_email}`)}>
          Contact Me
        </button>
      </div>

      <div className="footer-container">
        <Footer />
      </div>
    </div>
  </section>
);

export default Left;
