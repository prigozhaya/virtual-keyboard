const keyboard = {
  keysEn: [
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        ['z', 'x', 'c', 'v', 'b', 'n', 'm']
      ],
      keysRu: [
        ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з'],
        ['ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э'],
        ['я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю']
      ],

    currentLanguage: localStorage.getItem("lang") ? localStorage.getItem("lang"):'en',
    inputField: null,
    selectedKey: null,
    capsLock: false,



    renderTextarea:function(){
  const keyboardTextarea = document.createElement('div');
     
      this.inputField = document.createElement('textarea');
      this.inputField.setAttribute('id', 'input-field');
      this.inputField.addEventListener('keydown', this.handleKeyDown);
      this.inputField.addEventListener('keyup', this.handleKeyUp);

      keyboardTextarea.appendChild(this.inputField);
      return keyboardTextarea ;

    },

    render: function() {
      const keyboardContainer = document.createElement('div');
      keyboardContainer.classList.add('keyboard-container');
if(this.currentLanguage==='en'){
        this.keysEn.forEach((row) => {
        const rowContainer = document.createElement('div');
        rowContainer.classList.add('row-container');
        row.forEach((key) => {
          const keyElement = document.createElement('button');
          keyElement.classList.add('key');
          keyElement.textContent = key;
          keyElement.setAttribute('data-key', key);
          keyElement.addEventListener('click', this.handleKeyPress);
          rowContainer.appendChild(keyElement);
        });
        keyboardContainer.appendChild(rowContainer);
      });

      const changeLang = document.createElement('div');
      changeLang.innerHTML= "<p>to change language - 'Shift' + 'Tab' </p>"
      keyboardContainer.appendChild(changeLang);

    }else{
      this.keysRu.forEach((row) => {
        const rowContainer = document.createElement('div');
        rowContainer.classList.add('row-container');
        row.forEach((key) => {
          const keyElement = document.createElement('button');
          keyElement.classList.add('key');
          keyElement.textContent = key;
          keyElement.setAttribute('data-key', key);
          keyElement.addEventListener('click', this.handleKeyPress);
          rowContainer.appendChild(keyElement);
        });
        keyboardContainer.appendChild(rowContainer);
      });

      const changeLang = document.createElement('div');
      changeLang.innerHTML= "<p>для смены языка - 'Shift' + 'Tab' </p>"
      keyboardContainer.appendChild(changeLang);
    }

      return keyboardContainer;
    },

    
    handleKeyPress: function(event) {
      const keyValue = event.target.getAttribute('data-key');
      keyboard.inputField.value += keyValue;
      keyboard.inputField.focus();
    },
    handleKeyDown: function(event) {
      const keyValue = event.key;
      const keyElement = document.querySelector(`button[data-key='${keyValue}']`);
      if (keyElement) {
        keyElement.classList.add('active');
        keyboard.selectedKey = keyElement;
      }
    },
    handleKeyUp: function(event) {
      const keyValue = event.key;
      const keyElement = document.querySelector(`button[data-key='${keyValue}']`);
      if (keyElement) {
        keyElement.classList.remove('active');
        keyboard.selectedKey = null;
      }
    },

    toggleLanguage: function() {

      this.currentLanguage= this.currentLanguage==='en'? 'ru':'en';
      console.log(this.currentLanguage)
    }
  };
  
  const app = document.getElementById('app');
  app.appendChild(keyboard.renderTextarea());
  app.appendChild(keyboard.render());


  
  function runOnKeys(func, ...codes) {
    let pressed = new Set();

    document.addEventListener('keydown', function(event) {
      pressed.add(event.code);
      for (let code of codes) {
        if (!pressed.has(code)) {
          return;
        }
      }

      pressed.clear();

      func();
    });

    document.addEventListener('keyup', function(event) {
      pressed.delete(event.code);
    });

  }

  runOnKeys(
    () => {
      keyboard.toggleLanguage();
      const keyboardContainer = document.querySelector('.keyboard-container');
      keyboardContainer.remove();
      app.appendChild(keyboard.render());
      setLocalStorage()
    keyboard.inputField.focus();

    },
    "ShiftLeft",
    "Tab"
  );


  function setLocalStorage() {
    localStorage.setItem("lang", keyboard.currentLanguage );

  }
  
  window.addEventListener("beforeunload", setLocalStorage);
  
  function getLocalStorage() {
    
    keyboard.currentLanguage = localStorage.getItem("lang");

  }
  
  window.addEventListener("load", getLocalStorage);
  