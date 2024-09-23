import ReactDOM from "react-dom/client";
import InputButton from "./popup/InputButton";
import "../entrypoints/popup/content.css";

export default defineContentScript({
  matches: ["*://*/*"],
  cssInjectionMode: "ui", // Adjust this as needed for your specific URL
  main(ctx) {
    const initializeUi = (targetDiv: Element) => {
      // Create a new div inside the targetDiv to mount your React app
      const customDiv = document.createElement("div");
      customDiv.id = "custom-react-container"; // Ensure this ID is unique
      const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css';
document.head.appendChild(link);

      
      // Apply inline styles to position the custom div
      customDiv.style.position = "absolute";
      customDiv.style.bottom = "35px";
      customDiv.style.right = "30px";
      customDiv.style.zIndex = "100000"; // Ensure it's above other elements if necessary

      // Optionally, you can set width, height, and other styles as needed
      // customDiv.style.width = "10px"; // Adjust based on your needs
      // customDiv.style.height = "10px";
      // customDiv.style.backgroundColor = "white"; // Optional styling for visibility
      // customDiv.style.padding = "10px";
      // customDiv.style.borderRadius = "100%";

      customDiv.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.1)"; // Optional shadow for better UI

      // Append the new div inside the target contenteditable div
      targetDiv.appendChild(customDiv);
      const p = document.createElement("p");
      p.classList.add("text-lg", "text-red-500", "font-bold", "p-8");
      p.textContent = "Hello from shadow root with TailwindCSS applied";
      targetDiv.append(p);

      // Create a React root inside the newly appended div and render the App component
      const root = ReactDOM.createRoot(customDiv as HTMLElement);
      root.render(<InputButton />);

      return root;
    };

    const findAndMountUi = () => {
      const targetDiv = document.querySelector(
        '.msg-form__msg-content-container--scrollable.scrollable.relative'
      );
      

      if (targetDiv && !document.querySelector("#custom-react-container")) {
        initializeUi(targetDiv);
      }
    };

    findAndMountUi();

    // MutationObserver to handle dynamic changes
    const observer = new MutationObserver(findAndMountUi);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Fallback to try mounting after a delay
    setTimeout(findAndMountUi, 3000);
  },
});
