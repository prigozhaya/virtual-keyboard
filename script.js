import{keyboard} from "./keyboard.js";

const app = document.getElementById("app");
app.appendChild(keyboard.renderTextarea());
app.appendChild(keyboard.render());

//switch lang---------------------------------------------------------
function switchLang(func, ...codes) {
  let pressed = new Set();

  document.addEventListener("keydown", function (event) {
    pressed.add(event.code);
    for (let code of codes) {
      if (!pressed.has(code)) {
        return;
      }
    }

    pressed.clear();

    func();
  });

  document.addEventListener("keyup", function (event) {
    pressed.delete(event.code);
  });
}

switchLang(
  () => {
    keyboard.toggleLanguage();
    const keyboardContainer = document.querySelector(".keyboard-container");
    keyboardContainer.remove();
    app.appendChild(keyboard.render());
    setLocalStorage();
    keyboard.inputField.focus();
    let strArr = keyboard.inputField.value.split("");
    strArr.splice(document.getElementById("input-field").selectionStart - 3, 3);
    keyboard.inputField.value = strArr.join("");
  },
  "ShiftLeft",
  "Tab"
);

//save lang-------------------------------------------------------------------------------------------------------------------------
function setLocalStorage() {
  localStorage.setItem("lang", keyboard.currentLanguage);
}

window.addEventListener("beforeunload", setLocalStorage);

function getLocalStorage() {
  keyboard.currentLanguage = localStorage.getItem("lang");
}

window.addEventListener("load", getLocalStorage);

//off default keys---------------------------------------------------------
window.onkeydown = (evt) => {
  if (
    evt.key == "Tab" ||
    evt.key == "ArrowUp" ||
    evt.key == "ArrowLeft" ||
    evt.key == "Alt"
  ) {
    evt.preventDefault();
  }
};
