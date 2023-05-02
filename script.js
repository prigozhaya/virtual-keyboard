const keyboard = {

  keysEn: [
    [ "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace", "Delete"],
    ["Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]"],
    ["CapsLock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "Enter"],
    ["Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "▲", "/", "?"],
    ["Ctrl", "Alt", " ", "◄", "▼", "►"],
  ],
  keysRu: [
    [ "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace", "Delete" ],
    ["Tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "[", "]"],
    [ "CapsLock", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", ";", "Enter" ],
    [ "Shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ",", "▲", ".", "/", "?" ],
    ["Ctrl", "Alt", " ", "◄", "▼", "►"],
  ],

  currentLanguage: localStorage.getItem("lang") ? localStorage.getItem("lang") : "en",
  inputField: null,
  capsLock: false,

  renderTextarea: function () {
    const keyboardTextarea = document.createElement("div");
    this.inputField = document.createElement("textarea");
    this.inputField.setAttribute("id", "input-field");
    this.inputField.addEventListener("keydown", this.keyDown);
    this.inputField.addEventListener("keyup", this.keyUp);

    keyboardTextarea.appendChild(this.inputField);
    return keyboardTextarea;
  },

  render: function () {
    const keyboardContainer = document.createElement("div");
    keyboardContainer.classList.add("keyboard-container");
    if (this.currentLanguage === "en") {
      this.keysEn.forEach((row) => {
        const rowContainer = document.createElement("div");
        rowContainer.classList.add("row-container");
        row.forEach((key) => {
          const keyElement = document.createElement("button");
          keyElement.classList.add("key");
          keyElement.textContent = key;
          keyElement.setAttribute("data-key", key);
          keyElement.setAttribute("id", `${key}`);
          keyElement.addEventListener("click", this.keyPress);
          rowContainer.appendChild(keyElement);
          if (key === " ") {
            keyElement.classList.add("space");
          }
          if (key === "Shift") {
            keyElement.addEventListener("dblclick", function (event) {
              if (
                !document
                  .getElementById("CapsLock")
                  .classList.contains("active")
              ) {
                keyboard.capsLock = keyboard.capsLock === false ? true : false;
                keyElement.classList.toggle("active");
              }
            });
          }
          switch (key) {
            case "▲":
              keyElement.setAttribute("data-key", "ArrowUp");
              keyElement.setAttribute("id", "ArrowUp");
              break;
            case "◄":
              keyElement.setAttribute("data-key", "ArrowLeft");
              keyElement.setAttribute("id", "ArrowLeft");
              break;
            case "▼":
              keyElement.setAttribute("data-key", "ArrowDown");
              keyElement.setAttribute("id", "ArrowDown");
              break;
            case "►":
              keyElement.setAttribute("data-key", "ArrowRight");
              keyElement.setAttribute("id", "ArrowRight");
              break;
            case "Ctrl":
              keyElement.setAttribute("data-key", "Control");
              keyElement.setAttribute("id", "Control");
              break;
          }
        });
        keyboardContainer.appendChild(rowContainer);
      });

      const changeLang = document.createElement("div");
      changeLang.innerHTML = ` <p>to change language - 'Shift' + 'Tab' <br> to hold shift, double-click on it</p>`;
      keyboardContainer.appendChild(changeLang);
      
    } else {
      this.keysRu.forEach((row) => {
        const rowContainer = document.createElement("div");
        rowContainer.classList.add("row-container");
        row.forEach((key) => {
          const keyElement = document.createElement("button");
          keyElement.classList.add("key");
          keyElement.textContent = key;
          keyElement.setAttribute("data-key", key);
          keyElement.setAttribute("id", `${key}`);
          keyElement.addEventListener("click", this.keyPress);
          rowContainer.appendChild(keyElement);
          if (key === " ") {
            keyElement.classList.add("space");
          }
          if (key === "Shift") {
            keyElement.addEventListener("dblclick", function (event) {
              if (
                !document
                  .getElementById("CapsLock")
                  .classList.contains("active")
              ) {
                keyboard.capsLock = keyboard.capsLock === false ? true : false;
                keyElement.classList.toggle("active");
              }
            });
          }
          switch (key) {
            case "▲":
              keyElement.setAttribute("data-key", "ArrowUp");
              keyElement.setAttribute("id", "ArrowUp");
              break;
            case "◄":
              keyElement.setAttribute("data-key", "ArrowLeft");
              keyElement.setAttribute("id", "ArrowLeft");
              break;
            case "▼":
              keyElement.setAttribute("data-key", "ArrowDown");
              keyElement.setAttribute("id", "ArrowDown");
              break;
            case "►":
              keyElement.setAttribute("data-key", "ArrowRight");
              keyElement.setAttribute("id", "ArrowRight");
              break;
            case "Ctrl":
              keyElement.setAttribute("data-key", "Control");
              keyElement.setAttribute("id", "Control");
              break;
          }
        });
        keyboardContainer.appendChild(rowContainer);
      });

      const changeLang = document.createElement("div");
      changeLang.innerHTML = "<p>для смены языка - 'Shift' + 'Tab' <br> Для зажатия Shift нажмите на него два раза</p>";
      keyboardContainer.appendChild(changeLang);
    }

    return keyboardContainer;
  },

  keyPress: function (event) {
    const keyValue = event.target.getAttribute("data-key");
    const select = document.getElementById("input-field");
    switch (keyValue) {
      case "Tab":
        keyboard.inputField.value += "   ";
        break;
      case "Delete":
        let strArrDel = keyboard.inputField.value.split("");
        strArrDel.splice(
          select.selectionStart,
          select.selectionEnd - select.selectionStart
        );
        keyboard.inputField.value = strArrDel.join("");
        if (select.selectionStart === select.selectionEnd) {
          strArrDel.splice(select.selectionStart, 1);
          keyboard.inputField.value = strArrDel.join("");
        }
        break;
      case "Backspace":
        let strArr = keyboard.inputField.value.split("");
        strArr.splice(
          select.selectionStart,
          select.selectionEnd - select.selectionStart
        );
        keyboard.inputField.value = strArr.join("");
        if (select.selectionStart === select.selectionEnd) {
          strArr.splice(select.selectionStart - 1, 1);
          keyboard.inputField.value = strArr.join("");
        }
        break;
      case "Enter":
        keyboard.inputField.value += `
`;
        break;
      case "CapsLock":
        if (!document.getElementById("Shift").classList.contains("active")) {
          keyboard.inputField.value += "";
          keyboard.capsLock = keyboard.capsLock === false ? true : false;
          document.getElementById("CapsLock").classList.toggle("active");
        }

        break;
      case "Shift":
        keyboard.inputField.value += "";
        break;
      case "Alt":
        keyboard.inputField.value += "";
        break;
      case "Control":
        keyboard.inputField.value += "";
        break;
      case "Tab":
        keyboard.inputField.value += "   ";
        break;
      case "ArrowUp":
        keyboard.inputField.value += "▲";
        break;
      case "ArrowLeft":
        keyboard.inputField.value += "◄";
        break;
      case "ArrowDown":
        keyboard.inputField.value += "◄";
        break;
      case "ArrowRight":
        keyboard.inputField.value += "►";
        break;
      default:
        if (keyboard.capsLock === false) {
          keyboard.inputField.value += keyValue;
        } else {
          keyboard.inputField.value += keyValue.toUpperCase();
        }
        break;
    }

    keyboard.inputField.focus();
  },

  keyDown: function (event) {
    const keyValue = event.key;
    const keyElement = document.getElementById(`${keyValue}`);

    switch (keyValue) {
      case "Tab":
        keyboard.inputField.value += "   ";
        break;
      case "ArrowUp":
        keyboard.inputField.value += "▲";
        break;
      case "ArrowLeft":
        keyboard.inputField.value += "◄";
        break;
      case "ArrowDown":
        keyboard.inputField.value += "◄";
        break;
      case "ArrowRight":
        keyboard.inputField.value += "►";
        break;
    }

    if (keyElement) {
      keyElement.classList.add("active");
    }
  },

  keyUp: function (event) {
    const keyValue = event.key;
    const keyElement = document.getElementById(`${keyValue}`);
    if (keyElement) {
      keyElement.classList.remove("active");
    }
  },

  toggleLanguage: function () {
    this.currentLanguage = this.currentLanguage === "en" ? "ru" : "en";
  },
};

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
