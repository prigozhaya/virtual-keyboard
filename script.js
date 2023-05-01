const keyboard = {
  keysEn: [
    [ "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace", "Delete"],
    ["Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]"],
    ["capsLock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "Enter"],
    [ "shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "▲", "/", "?", "shift", ],
    ["ctrl", "alt", " ", "◄", "▼", "►"],
  ],
  keysRu: [
    [ "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace", "Delete" ],
    ["Tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "[", "]"],
    [ "capsLock", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", ";", "Enter" ],
    [ "shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ",", "▲", ".", "/", "?", "shift" ],
    ["ctrl", "alt", " ", "◄", "▼", "►"],
  ],

  currentLanguage: localStorage.getItem("lang") ? localStorage.getItem("lang")
    : "en",
  inputField: null,
  selectedKey: null,
  capsLock: false,

  renderTextarea: function () {
    const keyboardTextarea = document.createElement("div");

    this.inputField = document.createElement("textarea");
    this.inputField.setAttribute("id", "input-field");
    this.inputField.addEventListener("keydown", this.handleKeyDown);
    this.inputField.addEventListener("keyup", this.handleKeyUp);

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
          keyElement.addEventListener("click", this.handleKeyPress);
          rowContainer.appendChild(keyElement);
          if (key === " ") {
            keyElement.classList.add("space");
          }
          switch (key) {
            case '▲':
              keyElement.setAttribute("data-key", 'ArrowUp');
              keyElement.setAttribute("id", 'ArrowUp');
              break;
            case '◄':
              keyElement.setAttribute("data-key", 'ArrowLeft');
              keyElement.setAttribute("id", 'ArrowLeft');
              break;
            case '▼':
              keyElement.setAttribute("data-key", 'ArrowDown');
              keyElement.setAttribute("id", 'ArrowDown');
              break;
            case '►':
              keyElement.setAttribute("data-key", 'ArrowRight');
              keyElement.setAttribute("id", 'ArrowRight');
              break;

          }

        });
        keyboardContainer.appendChild(rowContainer);
      });

      const changeLang = document.createElement("div");
      changeLang.innerHTML = "<p>to change language - 'Shift' + 'Tab' </p>";
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
          keyElement.addEventListener("click", this.handleKeyPress);
          rowContainer.appendChild(keyElement);
          if (key === " ") {
            keyElement.classList.add("space");
          }
        });
        keyboardContainer.appendChild(rowContainer);
      });

      const changeLang = document.createElement("div");
      changeLang.innerHTML = "<p>для смены языка - 'Shift' + 'Tab' </p>";
      keyboardContainer.appendChild(changeLang);
    }

    return keyboardContainer;
  },

  handleKeyPress: function (event) {
    const keyValue = event.target.getAttribute("data-key");
    switch (keyValue) {
      case 'Tab':
        keyboard.inputField.value +='   ';
        break;
      case 'Delete':
    const select = document.getElementById("input-field");

        console.log(select.selectionStrart);
        keyboard.inputField.value =keyboard.inputField.value.slice(0, -1);
        break;
      case 'Enter':
        keyboard.inputField.value +=`
`;
        break;
      default:
        keyboard.inputField.value += keyValue;
        break;
    }
    console.log(keyValue)

    keyboard.inputField.focus();
  },

  handleKeyDown: function (event) {
    const keyValue = event.key;
    const keyElement = document.getElementById(`${keyValue}`);
    console.log(event.key)
    console.log(keyElement)

    switch (keyValue) {
      case 'Tab':
        keyboard.inputField.value +='   ';
        break;
      case 'ArrowUp':
        keyboard.inputField.value +="▲";
        break;
      case 'ArrowLeft':
        keyboard.inputField.value +="◄";
        break;
      case 'ArrowDown':
        keyboard.inputField.value +="◄";
        break;
      case 'ArrowRight':
        keyboard.inputField.value +="►";
        break;
    }

    if (keyElement) {
      keyElement.classList.add("active");
      keyboard.selectedKey = keyElement; // она здесь вообще нужна?
    }


  },
  handleKeyUp: function (event) {
    const keyValue = event.key;
    const keyElement = document.getElementById(`${keyValue}`);
    if (keyElement) {
      keyElement.classList.remove("active");
      keyboard.selectedKey = null;
    }
  },

  toggleLanguage: function () {
    this.currentLanguage = this.currentLanguage === "en" ? "ru" : "en";
    console.log(this.currentLanguage);
  },
};



const app = document.getElementById("app");
app.appendChild(keyboard.renderTextarea());
app.appendChild(keyboard.render());

//переключение языка---------------------------------------------------------
function runOnKeys(func, ...codes) {
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

runOnKeys(
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
window.onkeydown = evt => {
  if (evt.key == 'Tab' || evt.key == 'ArrowUp'|| evt.key == 'ArrowLeft') {
      evt.preventDefault();
  }
}