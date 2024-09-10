const finalPassword = document.querySelector("#displayPassword");
const copyBtn = document.querySelector(".copy-btn");
const copyMsg = document.querySelector(".copy-tooltip");
const passLengthDisplay = document.querySelector("#passLengthDisplay")
const slideroutput = document.querySelector("#sliderValue");
const uppercase = document.querySelector("#uppercaseCheck");
const lowercase = document.querySelector("#lowercaseCheck");
const numbers = document.querySelector("#numberCheck");
const symbols = document.querySelector("#symbolsCheck");
const strengthDisplay = document.querySelector("#strengthDisplay");
const generatepass = document.querySelector("#generateButton");
const symbol = "!@#$%^&*()_+{}><|}{/-+";
const allCheckbox = document.querySelectorAll("input[type=checkbox]");



let password = "";
let checkboxCnt = 0;
let passLength = 10;
showSlider();
setIndicator("#ccc");

function showSlider() {
    //passLength = slideroutput.value;
    slideroutput.value=passLength
    passLengthDisplay.innerText = passLength;
}


slideroutput.addEventListener('input', (e) => {
    passLength = e.target.value;
    showSlider();
});



function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getNumber() {
    return getRandom(0, 9);
}

function getuppercase() {
    return String.fromCharCode(getRandom(97, 123));
}

function getlowercase() {
    return String.fromCharCode(getRandom(65, 91));
}

function getsymbol() {
    let val = getRandom(0, symbol.length - 1);
    return symbol.charAt(val);

}

function setIndicator(color) {
    strengthDisplay.style.backgroundColor = color;
    strengthDisplay.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNumber = false;
    let hasSymbol = false;

    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numberCheck.checked) hasNumber = true;
    if (symbolsCheck.checked) hasSymbol = true;

    if (hasUpper && hasLower && (hasNumber || hasSymbol) && passLength >= 8) {
        setIndicator("#0f0");
    }
    else if ((hasUpper || hasLower) && (hasNumber || hasSymbol) && passLength >= 6) {
        setIndicator("#ff0");
    }
    else {
        setIndicator("#f00");
    }
}

async function copyContent() {
    
        
        if(password === ""){
            alert('First Generate Password to copy');
            throw 'Failed'; 
        }
        try {
        await navigator.clipboard.writeText(password);
        copyMsg.innerText = "Copied";
    } 
    catch (error) {
      copyMsg.innerText = "Failed to copy";
    }

    copyMsg.classList.add("active");
    setTimeout(() => {
      copyMsg.classList.remove("active");
    }, 2000);
}
  
copyBtn.addEventListener("click", () => {
    
    copyContent();
});





function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      // find out random j
      const j = Math.floor(Math.random() * (i + 1));
      // swap 2 numbers
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    let str = "";
    // array.forEach((el) => (str += el));
    str = array.join("");
    return str;
}



allCheckbox.forEach((checkbox) => {
    checkbox.addEventListener('change', countCheckedCb);
});




function countCheckedCb() {
    checkcount = 0;
    allCheckbox.forEach((checkbox) => {
        if (checkbox.checked) checkcount++;
    });
    if (passLength < checkcount) {
        passLengthDisplay.innerText = checkcount;
        showSlider();
    }
}

function generatebtn() {
    if (checkcount <= 0) {
        alert('At least one checkbox');
        return;
    }
    if (passLength < checkcount) {
        passLength = checkcount;
        showSlider();
    }
    password = "";
    let checkboxArray = [];
    if (uppercaseCheck.checked) checkboxArray.push(getuppercase);
    if (lowercaseCheck.checked) checkboxArray.push(getlowercase);
    if (numberCheck.checked) checkboxArray.push(getNumber);
    if (symbolsCheck.checked) checkboxArray.push(getsymbol);

    for (let i = 0; i < checkboxArray.length; i++) {
        password += checkboxArray[i]();
    }

    for (let i = 0; i < (passLength - checkboxArray.length); i++) {
        let valu = getRandom(0, checkboxArray.length)
        password += checkboxArray[valu]();
    }

    password = shuffleArray(Array.from(password));
    finalPassword.value = password;
    calcStrength()
}

generatepass.addEventListener('click', generatebtn);