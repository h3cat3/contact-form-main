const allInput = document.querySelectorAll('input[type="text"');
const email = document.getElementById('email');

const queryType =document.getElementById('query');

const textMessage = document.getElementById('message');

const consentBox =document.getElementById('consent-container')
const consentInput =document.getElementById('consent');


const dialogBox = document.getElementById('modal-box')

//check if email is valid
function isValidEmail(e) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(e);
}
//create span for error message
function createSpan(input,message){
    const span = document.createElement('span');
    span.innerText = message;
    span.classList.add('error');
    span.ariaLive= 'polite';
    input.after(span);
}
//remove ald error span if present
function removeSpan(input) {
    if (input.nextElementSibling?.classList.contains('error')) {
      input.nextElementSibling.remove();
    }
}

//checks if the first and last name and email filds are empty
function isEmpty(el, message = "This field is required") {
    removeSpan(el);
    if (!el.value || el.value.trim() === ""){
        createSpan(el,message);
        return true;
    }
    return false;
}
// checks if the query type is selected
function isNotChecked(name, message) {
removeSpan(name);
    const select = document.querySelector('input[name="query-type"]:checked')
    if(!select) {
        createSpan(name,message);
        return true;
    }
    return false;
}
//checks if the consent is ticked
function notGotConsent(name,box, message) {
    removeSpan(box);
    if(!name.checked){
        createSpan(box,message);
        return true;
    }

    return false;
}
//checkes if the email is filled and valid
function isNotEmail(email, message){
    removeSpan(email);  
    if(!isValidEmail(email.value) && !isEmpty(email)){
        createSpan(email,message);
        return true;
    }
    return false;

}
function isComplete() {
   let allValid = true
    //check all text inputs
    allInput.forEach(input => {isEmpty(input,"This field is required")?allValid=false:null})
    isEmpty(textMessage,"This field is required")?allValid=false:null;
    isNotChecked(queryType,"Please select a query type")?allValid=false:null;
    notGotConsent(consentInput,consentBox,"To submit this form, please consent to being contacted")?allValid=false:null;
    isNotEmail(email,"Please enter a valid email address")?allValid=false:null;
    return allValid;
}

//oppen the modal
document.getElementById('myform').addEventListener('submit', ev => {
    ev.preventDefault();
    if(isComplete()){
        dialogBox.showModal();
    };
})
window.addEventListener('click', (event) => {
    if (event.target === dialogBox) {
        dialogBox.close();
    }
});