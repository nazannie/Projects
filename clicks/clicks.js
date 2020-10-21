function counterHandler() {
    let clicksCount = 0;
    return function(clicked) {
      if (clicked) {
        clicksCount++;
      }
      return clicksCount;
    };
  }
  
  function inputHandler() {
    let inputValue = "";
    return function(val) {
      if (val) {
        inputValue = val;
      }
      return inputValue;
    };
  }
  
  const clicksCounter = counterHandler();
  const inputVal = inputHandler();
  
  function counterClickHandler() {
    document.querySelector("#counter").textContent = clicksCounter(true);
    calculateSumHandler();
  }
  
  function inputKeyDownHandler(event) {
    if (event.keyCode === 69) {
      event.preventDefault();
    }
  }
  
  function inputChangeHandler(event) {
    inputVal(event.target.value);
  }
  
  function calculateSumHandler() {
    document.querySelector("#sum").textContent = +inputVal() + clicksCounter();
  }
  
  document
    .querySelector("#clickCounter")
    .addEventListener("click", counterClickHandler);
  
  document
    .querySelector("#input")
    .addEventListener("keydown", inputKeyDownHandler);
  
  document.querySelector("#input").addEventListener("change", inputChangeHandler);
  
  document.querySelector("#calc").addEventListener("click", calculateSumHandler);
  