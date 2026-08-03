import css from "./Footer.module.css";

function Footer() {
    return (
        <footer className={css.footer}>
  <div className={css.content}>
    <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
    <div className={css.wrap}>
      <p>Developer: Liv</p>
      <p>
        Contact us:
        <a href="mailto:ivshynalarysa@gmail.com">ivshynalarysa@gmail.com</a>
      </p>
    </div>
  </div>
</footer>
    )
}


export default Footer;

