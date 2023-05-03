import {keysEn,keysRu,keysEnCaps,keysRuCaps} from "./keys.js";

class Keyboard {

  constructor(keysEn,keysRu,keysEnCaps,keysRuCaps){
    [this.keysEn, this.keysRu, this.keysEnCaps, this.keysRuCaps] = [keysEn,keysRu,keysEnCaps,keysRuCaps]
  }

  currentLanguage = localStorage.getItem("lang") ? localStorage.getItem("lang") : "en";
  inputField = null;
  capsLock = false;

  renderTextarea() {
    const keyboardTextarea = document.createElement("div");
    this.inputField = document.createElement("textarea");
    this.inputField.setAttribute("id", "input-field");
    this.inputField.addEventListener("keydown", this.keyDown);
    this.inputField.addEventListener("keyup", this.keyUp);

    keyboardTextarea.appendChild(this.inputField);
    return keyboardTextarea;
  }

  render() {
    const keyboardContainer = document.createElement("div");
    keyboardContainer.classList.add("keyboard-container");
    let keys=[[]];
    if(this.currentLanguage === "en"){
       keys= this.capsLock===false? this.keysEn:this.keysEnCaps;
    }else{
      keys= this.capsLock===false? this.keysRu:this.keysRuCaps;
    }
     
      keys.forEach((row) => {
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
              if (!document.getElementById("CapsLock").classList.contains("active")) {
                keyboard.capsLock = keyboard.capsLock === false ? true : false;
                keyboardContainer.remove();
                app.appendChild(keyboard.render());
                if(keyboard.capsLock===true){
                    document.getElementById("Shift").classList.add("active");
                }else{
                    document.getElementById("Shift").classList.remove("active");
                }
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
      changeLang.innerHTML = this.currentLanguage === "en"?
      ` <p>to change language - 'Shift' + 'Tab' <br> to hold shift, double-click on it</p>`
      :"<p>для смены языка - 'Shift' + 'Tab' <br> Для зажатия Shift нажмите на него два раза</p>";
      keyboardContainer.appendChild(changeLang);
    
    return keyboardContainer;
  }

  keyPress(event) {
    const keyValue = event.target.getAttribute("data-key");
    const select = document.getElementById("input-field");
    switch (keyValue) {
      case "Tab":
        keyboard.inputField.value += "   ";
        break;
      case "Delete":
        let strArrDel = keyboard.inputField.value.split("");
        let currsorDel=select.selectionStart;

        if (select.selectionStart === select.selectionEnd) {
          strArrDel.splice(select.selectionStart, 1);
          keyboard.inputField.value = strArrDel.join("");
          select.selectionStart=currsorDel;
          select.selectionEnd=currsorDel;
        }else{
          strArrDel.splice(
          select.selectionStart,
          select.selectionEnd - select.selectionStart
        );
        keyboard.inputField.value = strArrDel.join("");
        select.selectionStart=currsorDel;
        select.selectionEnd=currsorDel;
        }

        break;
      case "Backspace":
        let strArr = keyboard.inputField.value.split("");
        let currsor=select.selectionStart;

        if (select.selectionStart === select.selectionEnd) {
          if(select.selectionStart!==0){
            strArr.splice(select.selectionStart - 1, 1);
            keyboard.inputField.value = strArr.join("");
            select.selectionStart=currsor!==0? currsor-1:currsor;
            select.selectionEnd=currsor!==0? currsor-1:currsor;
          }
        }else{
          strArr.splice(
          select.selectionStart,
          select.selectionEnd - select.selectionStart
        );
        keyboard.inputField.value = strArr.join("");
        select.selectionStart=currsor;
        select.selectionEnd=currsor;
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
          switch (keyValue) {
            case "1":
              keyboard.inputField.value += "!";
              break;
            case "2":
              keyboard.inputField.value += "@";
              break;
            case "3":
              keyboard.inputField.value += "#";
              break;
            case "4":
              keyboard.inputField.value += "$";
              break;
            case "5":
              keyboard.inputField.value += "%";
              break;
            case "6":
              keyboard.inputField.value += "^";
              break;
            case "7":
              keyboard.inputField.value += "&";
              break;
            case "8":
              keyboard.inputField.value += "*";
              break;
            case "9":
              keyboard.inputField.value += "(";
              break;
            case "0":
              keyboard.inputField.value += ")";
              break;
            default:
              keyboard.inputField.value += keyValue.toUpperCase();
            }
        }
        break;
    }

    keyboard.inputField.focus();
  }

  keyDown(event) {
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
  }

  keyUp(event) {
    const keyValue = event.key;
    const keyElement = document.getElementById(`${keyValue}`);
    if (keyElement) {
      keyElement.classList.remove("active");
    }
  }

  toggleLanguage() {
    this.currentLanguage = this.currentLanguage === "en" ? "ru" : "en";
    this.capsLock=false;
  }
};
export const keyboard = new Keyboard(keysEn,keysRu,keysEnCaps,keysRuCaps)
