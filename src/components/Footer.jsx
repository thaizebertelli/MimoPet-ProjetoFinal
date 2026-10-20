import "../assets/styles/Footer.css";

export function Footer() {
  return (
    <footer className="footer-principal">
      <div className="container-footer">
        <div className="brand-footer">
          <strong className="logo-footer">MimoPet</strong>
          <p className="tagline-footer">Pequenos mimos, muito amor.</p>
        </div>
        <p className="copyright-footer">
          © 2026 MimoPet • Feito para quem ama pets.
        </p>
      </div>
    </footer>
  );
}