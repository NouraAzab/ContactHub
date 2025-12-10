//todo "done"   :   remove the scroll in the form
//todo          :   add contact   =>  add    in md : 768px   [responsie]
//todo          :   random color    =>  contactCard  head-of-contact
//todo "done"   :  scroll for sidebar emergency - Fav [0 : md   responsie]
//todo VIP   : Not fav yet    ,  Not emer yet  ,   Not Contacts yet  if the arr empty ^^

// --------------------
//todo style : specific color for friends | family      [group]
//todo   rondom color for div of img of contact

//--------------------------
/*
vip todo
todo :   check what happen when choose [Select a group] ???? why still danger color?
todo also for notes ... why when nothing do  ...still danger


*/

/*
    ? : zero or one
    + : one or more
    * : zero or more


*/



// =========================================================================================
//!========================== start global variables :
// inputs:
var contactImgInput = document.getElementById("ContactImg");
var contactFullNameInput = document.getElementById("fullName");
var contactphoneNumberInput = document.getElementById("phoneNumber");
var contactemailAddressInput = document.getElementById("emailAddress");
var contactaddressInput = document.getElementById("address");
var contactgroupInput = document.getElementById("group");
var contactnotesInput = document.getElementById("notes");
var contactfavInput = document.getElementById("fav");
var contactemergInput = document.getElementById("emerg");
// --------------------
var userImg = document.getElementById("userImg");
var userIconElement = document.getElementById("userIcon"); 
var contactList = JSON.parse(localStorage.getItem("contactListData")) || [];// for the first time for the agenda ^_^


//test:
// console.log(contactImgInput , contactFullNameInput , contactphoneNumberInput , contactemailAddressInput , contactaddressInput, contactgroupInput, contactnotesInput , contactfavInput , contactemergInput);

//!========================== end global variables :
//!========================== start functions :

function addContactInfo(){
    if(validateInputs(contactFullNameInput) && 
    validateInputs(contactphoneNumberInput) &&
    validateInputs(contactemailAddressInput) &&
    validateInputs(contactaddressInput) &&
    validateInputs(contactgroupInput) &&
    validateInputs(contactnotesInput) ){

        console.log("validate name");
        var Contact = {
        //  will check [contactImgInput.files[0] === undefined] there is img enserted or no
        //undefined   is a falsy value
        //todo   js VIP  add |   remove for the icon 
        // ImgURL : !(contactImgInput.files[0])   ? (`${userIconElement.classList.remove("d-none")}`)  : (`/images/${contactImgInput.files[0].name}`),
        // ImgURL : contactImgInput.files[0] === undefined   ? (`${userIconElement.classList.remove("d-none")}`)  : (`/images/${contactImgInput.files[0].name}`),
        // ImgURL : contactImgInput.files[0] === undefined   ? (`${userImg.classList.add("d-none")}`)  : (`/images/${contactImgInput.files[0].name}`),
        ImgURL : "",
        fullName:contactFullNameInput.value , 
        phoneNumber :contactphoneNumberInput.value ,
        emailAddress  :contactemailAddressInput.value   ,
        address  : contactaddressInput.value  ,
        group : contactgroupInput.value  ,
        notes : contactnotesInput.value  ,
        fav :  contactfavInput.value ,
        emerg : contactemergInput.value  ,
        

    };
    // -----------------------
    // give [imgURL] value
    if(contactImgInput.files[0] === undefined){
        //محدش دخل صورة للمستخدم
        userIconElement.classList.remove("d-none");
        userImg.classList.add("d-none");

    }
    else{
        //enter userImg
        userIconElement.classList.add("d-none");
        userImg.classList.remove("d-none");
        Contact.ImgURL = `/images/${contactImgInput.files[0].name}`; // after all checks here .. i'm sure files[0] !== undefined ^^ 

    }

    // -----------------------
    contactList.push(Contact);
    localStorage.setItem("contactListData" , JSON.stringify(contactList));

    console.log(contactList);
    }


}













//!========================== end functions :
//!========================== start validation :
// Generic validation Function   =>  T | F
function validateInputs(inputElement){
    var inputsRegex = {
        //must make the  name of each regex =  each inputElement.id  in the form ^^
        // --------------------

        //\u0600 : uni cod eof arabic letters ^^
        // fullName   : /^[A-Z][a-zA-Z0-9_ ]{2,24}$/,
        //last soluthion .. because .. there is no an arabic capital letter  ^^
        // خدي بالك من المسافات عربي وانجليزي
        // fullName   : /^[A-Z][a-zA-Z0-9_ ]{2,50}$|^[\u0600-\u06ff ]{3,51}$/,    //same regex
        fullName   : /^([A-Z][a-zA-Z0-9_ ]{2,50}|[\u0600-\u06ff ]{3,51})$/,      //same regex
        phoneNumber : /^(\+2)?01(0|1|2|5)[0-9]{8}$/,//01023587977

        // emailAddress : /^[a-zA-Z0-9_.-]+@(gmail|yahoo)\.com$/,//noRa_a.z-ab135@gmail.com
        emailAddress : /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,//it's more generic [for all domains] ^^

        address : /^.{4,60}$/,
        group : /^(Select a group|Family|Friends|Work|School|Other)$/,
        notes : /^.{0,150}$/,// must mention the length ^^

    }
    var regexName = inputElement.id
    var msgElement = document.getElementById(`${regexName}Msg`);//fullNameMsg
    // ----------------------
    if(inputsRegex[ regexName ].test( inputElement.value )){

        // console.log("valid");
        //valid
        inputElement.classList.remove("is-invalid");//remove [danger wrong check ] due to overriding on [is-valid] class from "bootstrap" 
        inputElement.classList.add("is-valid");//add [green right check]

        msgElement.classList.add("d-none");//hide the validation txt

        return true;
        
    }
    else{
        // console.log("vot valid");
        // not valid
        inputElement.classList.remove("is-valid");//Not must [is-invalid] has  speciificity heigher^^
        inputElement.classList.add("is-invalid");

        msgElement.classList.remove("d-none");//show the validation txt

        return false;

    }




}
//!========================== end validation :



