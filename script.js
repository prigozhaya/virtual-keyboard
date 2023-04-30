const keyboard = {
    keys: [
      ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace'],
      ['tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']','delete'],
      ['capsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';','enter'],
      ['shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '▲', ',', '.', '/', 'shift'],
      ['ctrl', 'alt', ' ', 'alt', 'ctrl', '◄', '▼', '►']
    ],
    inputField: null,
    selectedKey: null,
    capsLock: false,

    render: function() {
      const keyboardContainer = document.createElement('div');
      keyboardContainer.classList.add('keyboard-container');
      this.inputField = document.createElement('textarea');
      this.inputField.setAttribute('id', 'input-field');
      this.inputField.addEventListener('keydown', this.handleKeyDown);
      this.inputField.addEventListener('keyup', this.handleKeyUp);

      keyboardContainer.appendChild(this.inputField);
      
      this.keys.forEach((row) => {
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
    }
  };
  
  const app = document.getElementById('app');
  app.appendChild(keyboard.render());