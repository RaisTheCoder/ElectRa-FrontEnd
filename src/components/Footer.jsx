import {
  faDiscord,
  faInstagram,
  faTelegram,
  faWhatsapp,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router";

const Footer = () => {
  const socials = [
    { icon: faInstagram, to: "https://instagram.com/rai-ko007" },
    { icon: faWhatsapp, to: "/" },
    { icon: faTelegram, to: "/" },
    { icon: faXTwitter, to: "/" },
    { icon: faDiscord, to: "/" },
  ];

  return (
    <footer className="bg-surface text-fg border-t border-border">
      <div className="container mx-auto px-6 py-12 grid gap-12 md:grid-cols-3">
        <section className="flex flex-col gap-5">
          <h3 className="text-2xl font-bold flex items-center">
            <img src="/e.png" className="h-10 w-10" />
            lectRa
          </h3>

          <p className="text-muted text-sm leading-relaxed">
            ElectRa is a modern electronics marketplace concept built to
            demonstrate clean UI, structured architecture, and scalable design
            systems.
          </p>

          <div className="text-sm text-muted space-y-1">
            <p>
              Phone:{" "}
              <Link className="hover:text-fg transition" to="tel:+12345678910">
                +12345678910
              </Link>
            </p>
            <p>
              Email:{" "}
              <Link
                className="hover:text-fg transition"
                to="mailto:support@electra.com"
              >
                support@electra.com
              </Link>
            </p>
          </div>
        </section>

        <section className="flex flex-col gap-5">
          <div>
            <h3 className="text-xl font-semibold">Stay in the loop</h3>
            <p className="text-muted text-sm">
              Get updates, deals, and new products.
            </p>
          </div>

          <div className="flex gap-2">
            <input
              className="flex-1 bg-surface border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-primary"
              placeholder="Enter your email..."
            />

            <button className="w-11 h-11 rounded-lg bg-primary hover:bg-primary-hover text-white flex items-center justify-center transition">
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>

          <div className="flex gap-3 pt-2">
            {socials.map((s, i) => (
              <Link
                key={i}
                to={s.to}
                className="w-10 h-10 rounded-full bg-surface hover:bg-border flex items-center justify-center transition"
              >
                <FontAwesomeIcon icon={s.icon} />
              </Link>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-5">
          <h3 className="text-xl font-semibold">Navigate</h3>

          <div className="grid grid-cols-2 gap-2 text-sm text-muted">
            <Link className="hover:text-fg transition" to="/">
              Home
            </Link>
            <Link className="hover:text-fg transition" to="/products">
              Products
            </Link>
            <Link className="hover:text-fg transition" to="/categories">
              Categories
            </Link>
            <Link className="hover:text-fg transition" to="/about">
              About
            </Link>
          </div>
        </section>
      </div>

      <div className="border-t border-border">
        <div className="container mx-auto px-6 py-4 text-xs text-muted flex justify-between">
          <p>© {new Date().getFullYear()} ElectRa. All rights reserved.</p>
          <p className="hidden md:block">
            Built with passion by Rais F. (
            <a
              href="https://rai-ko.vercel.app"
              target="_blank"
              className="text-primary"
            >
              Aka. ScorAXE/Raiko
            </a>
            )
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
