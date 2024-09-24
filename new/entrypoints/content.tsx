import ReactDOM from "react-dom/client";
import "../entrypoints/popup/content.css";
import App from "./popup/App";

export default defineContentScript({
  matches: ["*://*/*"],
  cssInjectionMode: "ui",
  main(ctx) {
    const initializeUi = (targetDiv: Element) => {
      const customDiv = document.createElement("div");
      customDiv.id = "custom-react-container";
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href =
        "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css";
      document.head.appendChild(link);
      customDiv.style.position = "absolute";
      customDiv.style.bottom = "15px";
      customDiv.style.right = "15px";
      customDiv.style.zIndex = "100000";
      customDiv.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.1)";
      customDiv.style.borderRadius = "100%";
      targetDiv.appendChild(customDiv);

      const root = ReactDOM.createRoot(customDiv);
      root.render(<App />);
    };

    const findAndMountUi = () => {
      const targetDiv = document.querySelector(
        ".msg-form__msg-content-container--scrollable.scrollable.relative"
      );

      if (targetDiv && !document.querySelector("#custom-react-container")) {
        initializeUi(targetDiv);
      }
    };

    findAndMountUi();

    const observer = new MutationObserver(findAndMountUi);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  },
});
