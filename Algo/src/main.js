import { fizzBuzz } from "./fizzBuzz";
import "./style.css";

const form = document.createElement("form");

const numberInput = document.createElement("input");
numberInput.setAttribute("type", "number");
numberInput.setAttribute("name", "n");
numberInput.setAttribute("min", 0);

const submitBtn = document.createElement("input");
submitBtn.setAttribute("type", "submit");
submitBtn.setAttribute("value", "Send");

form.append(numberInput, submitBtn);

const display = document.createElement("div");

form.addEventListener("submit", (event) => {
  const data = new FormData(form);

  event.preventDefault();

  display.childNodes.forEach((node) => node.remove());

  numberInput.value = 0;

  const nodes = fizzBuzz(data.get("n")).map((value) => {
    const el = document.createElement("p");
    el.appendChild(document.createTextNode(value));
    return el;
  });

  display.append(...nodes);
});

document.querySelector("#app").append(form, display);
