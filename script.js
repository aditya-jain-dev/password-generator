const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");

const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");

const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector("#btn");

const allCheckBox = document.querySelectorAll("input[type=checkbox]");

const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/'; // length -> 30

let password = "";
let passwordLength = 10;
// check how many checkboxes are checked
let checkCount = 1;

handleSlider();

// set strength circle color -> grey
setIndicator('#ccc');

/* 
functions to create :-
1. copyContent() -> to copy the content
2. handleSlider() -> set the value of password length with the help of slider
3. generatePassword() -> event listener to generate password when we click on button
4. setIndicator() -> change the color and shadow (red, green, grey) of circle according to the quality of password string
5. getRandInteger(min, max) -> generate a random interger value for generating password
6. getRandomUppercase() -> generate a random password string of uppercase
7. getRandomLowercase() -> generate a random password string of lowercase
8. getRandomNumber() -> generate a random password string of number
9. getRandomSymbol() -> generate a random password string of symbol
10. calcStrength() -> check whether the password strength is weak, moderate or strong & on the belaf of password strength we change the color of strength circle
*/


function handleSlider(){
    inputSlider.value = passwordLength;
    lengthDisplay.textContent = passwordLength;
    // console.log(passwordLength);

    const min = inputSlider.min;
    const max = inputSlider.max;
    // console.log(min)
    // console.log(max)

    // formula to generate background size
    inputSlider.style.backgroundSize = ((passwordLength - min) * 100 / (max - min) + "% 100%");
}

function setIndicator(color){
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`
}

function getRandInteger(min, max){
    // Math.random() -> it generate value between 0 -> 1 where 0 is inclusive and 1 is exclusive
    // * (max-min) -> Number between 0 - 20 with decimal value
    // Math.floor() -> it roundoff the value
    // + min -> get value between min to max
    return Math.floor(Math.random() * (max - min)) + min;
}

// number 0 -> 9
function generateRandomNumber(){
    return getRandInteger(0,9);
}

// String.fromCharCode() -> convert the ascii value into char

// lowercase a -> z
function generateLowerCase(){
    // a -> 97 z->122 to get z we have to +1 in max
    return String.fromCharCode(getRandInteger(97,123));
}

// uppercase A -> Z
function generateUpperCase(){
    // A -> 65 Z -> 91 to get z we have to +1 in max
    return String.fromCharCode(getRandInteger(65,91));
}

// symbol
function generateSymbols(){
    const randNum = getRandInteger(0,symbols.length);
    return symbols.charAt(randNum);
}

// calculate the strength and change the color
function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNumber = false;
    let hasSymbol = false;

    // .checked -> to check whether the box is checked or not by the user

    if (uppercaseCheck.checked) {
        hasUpper = true;
    }
    if (lowercaseCheck.checked) {
        hasLower = true;
    }
    if (numbersCheck.checked) {
        hasNumber = true;
    }
    if (symbolsCheck.checked) {
        hasSymbol = true;
    }

    if (hasUpper && hasLower && hasNumber && hasSymbol && passwordLength >= 8) {
        setIndicator("#0f0");
    }
    else if ((hasUpper && hasLower) && (hasNumber || hasSymbol) && passwordLength >= 6) {
        setIndicator("#ff0");
    }
    else{
        setIndicator("#f00")
    }
}

/* 
await navigator.clipboard.writeText(passwordDisplay.value) is a statement that uses the Clipboard API to write the generated password to the clipboard.

The writeText() method of the Clipboard interface writes the provided text to the clipboard. It returns a Promise that resolves when the text has been successfully written to the clipboard.

By using the await keyword before the navigator.clipboard.writeText(passwordDisplay.value) statement, the code waits until the Promise resolves before moving on to the next line of code. This ensures that the password is successfully written to the clipboard before any further actions are taken.
*/

// Navigator.clipboard -> Returns a Clipboard object that provides read and write access to the system clipboard.
// writeText() -> write on clipboard and return promises
// after resolve we display the copied text on button

async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        // copy msg have some timer after that i will get hide
        copyMsg.innerText = 'copied';
    } catch (error) {
        copyMsg.innerText = 'failed';
    }

    // to make the copy content visible
    copyMsg.classList.add('active');

    // remove after 2 seconds
    setTimeout(() => {
        copyMsg.classList.remove('active');
    }, 2000);
}

// count the checkbox
function handleCheckBoxChange(){
    checkCount = 0;
    allCheckBox.forEach((checkbox) => {
        if (checkbox.checked) {
            checkCount++;
        }
    });

    //special condition -> if password length < checkbox checked
    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }
}

// shuffle Password
function shufflePassword(array){
    // algo -> fisher yates method (recieves array)

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        // swapping
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    // convert into string
    let str = "";
    array.forEach((ch) => {
        str += ch;
    });

    return str;
}

 
// eventListener -> slider, copyBtn, generatePassword

// we put a event listener on every checkbox to track how many check box are check 
allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener('change', () =>{ 
        handleCheckBoxChange();
    });
})

// display the slider value and set the password length
inputSlider.addEventListener('input', (val) => {
    passwordLength = val.target.value;
    handleSlider();
})

// copy the diplayPassword content when click on button
copyBtn.addEventListener('click', () => {
    if (passwordDisplay.value) {
        copyContent();
    }
})

// main function -> generate password
generateBtn.addEventListener('click', () => {
    // none of the checkbox arre selected
    if(checkCount == 0){
        return;
    }

    // special condition
    if (passwordLength < checkCount) {
        passwordLength = checkCount; 
        handleSlider();
    }
    
    // let's start the jouney to find new password
    console.log("Starting the Jouney...");
    
    // remove old password
    password = "";

    // let's put the stuff mentioned by checkboxes 

    // we doesnot need that because we have password length -> 10 the its difficult to call teh functions 

    // if (uppercaseCheck.checked) {
    //     password += generateUpperCase();
    // }
    // if (lowercaseCheck.checked) {
    //     password += generateLowerCase();
    // }
    // if (numbersCheck.checked) {
    //     password += generateRandomNumber();
    // }
    // if (symbolsCheck.checked) {
    //     password += generateSymbols();
    // }

    // to solve this -> we make array of fucntions
    let funcArray = [];

    if (uppercaseCheck.checked) {
        funcArray.push(generateUpperCase);
    }
    if (lowercaseCheck.checked) {
        funcArray.push(generateLowerCase);
    }
    if (numbersCheck.checked) {
        funcArray.push(generateRandomNumber);
    }
    if (symbolsCheck.checked) {
        funcArray.push(generateSymbols);
    }

    // compusory addition -> means those who are checkboxes checked we have to insert atleast once
    for (let i = 0; i < funcArray.length; i++) {
        password += funcArray[i]();
    }
    console.log("Compulsory addition done...");

    // remaining addition -> those who are left insert now
    for (let i = 0; i < passwordLength - funcArray.length; i++) {
        let randIndex = getRandInteger(0, funcArray.length);
        password += funcArray[randIndex]();
    }
    console.log("Remaining addition done...");

    // shuffle the password
    let passArr = Array.from(password);
    password = shufflePassword(passArr);
    console.log("Password shuffle done...");

    // show in UI
    passwordDisplay.value = password;
    console.log("Password display done...");

    // calculate strength
    calcStrength();
    console.log("Calculate Strength done...");

})