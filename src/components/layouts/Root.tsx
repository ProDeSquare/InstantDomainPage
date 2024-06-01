import Footer from "@/components/sections/Footer";

const Root = (): JSX.Element => (
  <div id="app-container">
    <main>
      <section className="app-title-wrapper">
        <div className="app-title-container">
          <div>
            <a href="https://prodesquare.com">
              <img src="/prodesquare-logo.svg" alt="Site Logo" />
            </a>
          </div>

          <div className="app-title">
            <h1>Domain For Sale!</h1>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
              tenetur ex magni et libero reprehenderit fuga omnis deserunt nobis
              inventore neque consectetur molestiae dolores dolorem rerum earum
              illo, quidem ullam.
            </p>

            <button onClick={() => window.open("mailto:hamza@prodesquare.com")}>
              Contact Me
            </button>
          </div>

          <div className="footer-container">
            <Footer />
          </div>
        </div>
      </section>

      <section className="app-content-container">
        <div>
          <h2>Interested?</h2>

          <p>How about adding your details, I'll be soon in touch with you.</p>

          <form action="#">
            <div>
              <label htmlFor="name">Your Name</label>

              <input
                type="text"
                placeholder="e.g. John Doe"
                id="name"
                required
              />
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
        </div>

        <div className="mobile-footer-container">
          <Footer />
        </div>
      </section>
    </main>
  </div>
);

export default Root;
