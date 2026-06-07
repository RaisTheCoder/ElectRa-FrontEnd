import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faDatabase,
  faServer,
  faCartShopping,
  faFilter,
  faCode,
} from "@fortawesome/free-solid-svg-icons";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { faReact, faTailwindCss } from "@fortawesome/free-brands-svg-icons";

const About = () => {
  const navi = useNavigate();

  return (
    <section className="min-h-screen bg-surface text-fg flex flex-col gap-15 py-15 px-5 lg:container mx-auto">
      <Helmet>
        <title>About - ElectRa</title>
      </Helmet>

      <header className="text-center flex flex-col gap-4">
        <h1 className="text-4xl md:text-5xl font-bold">ElectRa</h1>
        <p className="text-muted max-w-2xl mx-auto">
          A modern electronics store concept built to demonstrate full-stack
          development skills, clean UI design, and real-world e-commerce logic.
        </p>

        <button
          onClick={() => navi("/products")}
          className="self-center mt-4 px-5 py-2 rounded-lg bg-primary text-white hover:opacity-90 transition"
        >
          Explore Products
        </button>
      </header>

      <section className="grid md:grid-cols-2 gap-10 items-center">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">What is ElectRa?</h2>
          <p className="text-muted leading-relaxed">
            ElectRa is a simulated e-commerce platform focused on electronics.
            It includes product browsing, filtering, cart management, reviews,
            and user authentication. The goal is to replicate a real-world
            online store experience with modern UI and scalable architecture.
          </p>

          <p className="text-muted leading-relaxed">
            It’s not just a UI project, it includes real API integration, state
            management, and dynamic data handling. I tried my best :3 enjoy.
          </p>
        </div>

        <div className="bg-surface-2 border border-border rounded-xl p-6 flex flex-col gap-4">
          <h3 className="text-xl font-semibold">Core Features</h3>

          <div className="flex flex-col gap-3 text-sm text-muted">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faCartShopping} />
              Shopping cart with quantity management
            </div>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faFilter} />
              Advanced product filtering & search
            </div>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faBolt} />
              Fast product browsing experience
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-center">Tech Stack</h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
          <div className="bg-surface-2 border border-border rounded-xl p-4 text-center">
            <FontAwesomeIcon icon={faReact} className="text-primary text-xl" />
            <p className="mt-2">React + Vite</p>
          </div>

          <div className="bg-surface-2 border border-border rounded-xl p-4 text-center">
            <FontAwesomeIcon
              icon={faTailwindCss}
              className="text-primary text-xl"
            />
            <p className="mt-2">Tailwind CSS</p>
          </div>

          <div className="bg-surface-2 border border-border rounded-xl p-4 text-center">
            <FontAwesomeIcon icon={faServer} className="text-primary text-xl" />
            <p className="mt-2">ASP .NET Core API</p>
          </div>

          <div className="bg-surface-2 border border-border rounded-xl p-4 text-center">
            <FontAwesomeIcon
              icon={faDatabase}
              className="text-primary text-xl"
            />
            <p className="mt-2">MSSQL</p>
          </div>

          <div className="bg-surface-2 border border-border rounded-xl p-4 text-center">
            <FontAwesomeIcon icon={faCode} className="text-primary text-xl" />
            <p className="mt-2">MS VSCode + JetBrains Rider</p>
          </div>
        </div>
      </section>

      <section className="bg-surface-2 border border-border rounded-xl p-8 flex flex-col gap-4 text-center">
        <h2 className="text-2xl font-bold">Why this project exists</h2>
        <p className="text-muted max-w-3xl mx-auto">
          ElectRa was built to simulate a real e-commerce platform, focusing on
          real-world features like authentication, product management, cart
          logic, filtering systems, and responsive UI design. It was merely a
          project I've scrapped, later used as an idea where I was required to
          create a final project at the Full-Stack course provided by{" "}
          <a
            className="text-purple-400 hover:underline"
            href="https://ellinmmc.az"
            target="_blank"
          >
            EllinMMC
          </a>
        </p>
      </section>
    </section>
  );
};

export default About;
