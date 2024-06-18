// Footer component: You're free to change the details in the footer

const Footer = (): JSX.Element => (
  <footer>
    &copy; {new Date().getFullYear()}{" "}
    <a href="https://prodesquare.com">ProDeSquare</a> / All rights reserved -
    Static webpage generated with{" "}
    <a
      href="https://github.com/ProDeSquare/InstantDomainPage"
      target="_blank"
      rel="noreferrer"
    >
      Instant Domain Page
    </a>
  </footer>
);

export default Footer;
