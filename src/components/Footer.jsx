import React from "react";

function Footer() {
  return (
    <div className="footer h-10 w-full absolute bottom-0 flex items-center bg-black/80 justify-center">
      <p className="flex items-center">
        Desenvolvido por{" "}
        <a className="font-bold" href="https://www.arthurpr.tech/">
          arthurpr
        </a>
      </p>
    </div>
  );
}

export default Footer;
