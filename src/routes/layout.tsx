import { component$, Slot, useStylesScoped$ } from "@builder.io/qwik";
import Header from "../components/header/header";
import styles from "./layout.css";

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <>
      <main>
        <Header />
        <section>
          <Slot />
        </section>
      </main>
      <footer>
        <a href="https://www.builder.io/" target="_blank">
          Made with ♡ by Builder.io
        </a>
      </footer>
    </>
  );
});
