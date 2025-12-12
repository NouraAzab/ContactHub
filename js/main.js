//todo*         "done"   :   remove the scroll in the form
//todo  style           :   add contact   =>  add    in md : 768px   [responsie]
//todo  style           :   random color    =>  contactCard  head-of-contact
//todo*         "done"   :  scroll for sidebar emergency - Fav [0 : md   responsie]
//todo style            : Not fav yet    ,  Not emer yet  ,   Not Contacts yet  if the arr empty ^^

// --------------------
//todo style : specific color for friends | family      [group]
//todo   rondom color for div of img of contact

//--------------------------
/*
vip todo
todo :   check what happen when choose [Select a group] ???? why still danger color?
todo also for notes ... why when nothing do  ...still danger
------
todo* must : why when i change the img of the user .. donot change at the same time?
todo VIP  :check the phone must be unique to addContact ^^
todo*      : fill alt of the imgs 
todo*      : when i press saveContact btn  -> close    it depends ^_^
todo must : when click enter [type = submit] for btn   save Contact

--------------------
Yalla bena now :)
todo* must : d-non if i donnot add email     loc     ...
todo* style : when hover    fav tab   ... yellow
todo* : group -> bages in desplay
todo* : fav   - emer -> above the img
todo style : make the page scrollable behind the modal
todo : fav   - emer -> push in sidebar :)
todo must : change the msg of the regex 
todo : display summury ^^ easy ISA
todo : search
todo : edit + update
todo : delete

todo : when toggle fav & emer  in card footer  =>   add &  remove from sidebar        Ya hallaaaa :)
-----/////


todo* : why when i add wrong img  +  emergency badge   ->    emergency style :(     search why Div solve the problem ^^   


--------------------
improvments in future :)
todo : tab + enter = checked for check input [fav + emergency]



? understand more more about   diff between      [onclick &  onchange]
? todo* : why when i add wrong img  +  emergency badge   ->    emergency style :(     search why Div solve the problem ^^   
? search why :    `\images/${contactImgInput.files[0].name}`     =>    [\]  before images  in the url is a fatel error why ?
? search why why don't work ^^     favBadge    =>    function toggleFav()
? ask ?search why "helllll" don't repeat ^^
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


// --------------------
var contactList = JSON.parse(localStorage.getItem("contactListData")) || [];// for the first time for the agenda ^_^
displayAllContacts();// incase i don't enter the Modal to add ^^
// --------------------
//todo VIP :  must must       be after displayAllContacts ^^  to avoid null
var favToggleIcon = document.getElementById("favToggleIcon");
var emerToggleIcon = document.getElementById("emerToggleIcon");
// console.log(favToggleIcon , emerToggleIcon);

// --------------------
var favContentList = JSON.parse(localStorage.getItem("favContentListData"));//for need it out displayFavContacts() only [but in the method , must be empty]
displayFavContacts();


//test:
// console.log(contactImgInput , contactFullNameInput , contactphoneNumberInput , contactemailAddressInput , contactaddressInput, contactgroupInput, contactnotesInput , contactfavInput , contactemergInput);

//!========================== end global variables :

//!========================== start addEventListener :
// favToggleIcon.addEventListener("change" , function(){ //? todo ask ?search why "helllll" don't repeat ^^
//    // console.log("helllll");
//     addFavContacts();


// });
// // favToggleIcon.addEventListener("change" , function(){
// //     toggleFav(index);
// // })
//!========================== end addEventListener :


//!========================== start functions :

function setUserImg() {

    if (contactImgInput.files[0] === undefined) {
        //محدش دخل صورة للمستخدم
        userIconElement.classList.remove("d-none");
        userImg.classList.add("d-none");
        return "";

    }
    else {
        //enter Img
        userIconElement.classList.add("d-none");
        userImg.classList.remove("d-none");

        //change the img in two places   .. so i made a function ^_^
        //1st place: [modal]  ..   onchange = ""
        userImg.setAttribute("src", `images/${contactImgInput.files[0].name}`);// after all checks here .. i'm sure files[0] !== undefined ^^ 

        //2nd place: to set img in the object contact   for  =>  [contact cards]
        return `images/${contactImgInput.files[0].name}`;
    }
}
//!=================================================
function toggleFav(index) {
    // favToggleIcon.checked = !favToggleIcon.checked //toggle it
    contactList[index].fav = !contactList[index].fav;//toggle it

    // ? search why why don't work ^^ answer : must must render the page again with displayAllContacts() to make the badge appear 
    // var favBadge = document.getElementById("favBadge");
    // console.log(favBadge);
    // if(contactList[index].fav ){
    //     // favBadge.classList.remove("d-none");   //wrong
    //     // favBadge.classList.add("d-flex");   //wrong
    //     favBadge.classList.replace("d-none" , "d-flex");//replace [in the same place ] : it's the right solution ... due to the place of d-flex[before justify content etc]
    //     console.log("yes");

    // }else{
    //     // favBadge.classList.remove("d-flex");  //wrong
    //     // favBadge.classList.add("d-none");  //wrong
    //     favBadge.classList.replace("d-flex" , "d-none");

    //     console.log("no");

    // }
    displayAllContacts();//must do this step   because [contact] object Info is updated with [fav]
    displayFavContacts();//must do this step   because [contact] object Info is updated with [fav]


    // console.log(favToggleIcon.checked);
    // console.log(index , contactList[index].fav);
}
//!=================================================
function toggleEmer(index) {
    // emerToggleIcon.checked = !emerToggleIcon.checked 
    contactList[index].emerg = !contactList[index].emerg;//toggle it

    displayAllContacts();//must do this step   
    displayEmergencyContacts();//must do this step

}
//!=================================================

function addContactInfo() {
    //only [phoneNumber & FullName] are required to make a contact ^^
    if (validateInputs(contactFullNameInput) &&
        validateInputs(contactphoneNumberInput)) {
        // validateInputs(contactemailAddressInput) &&
        // validateInputs(contactaddressInput) &&
        // validateInputs(contactgroupInput) &&
        // validateInputs(contactnotesInput) ){
        // -------------------
        var Contact = {
            //  will check [contactImgInput.files[0] === undefined] there is img enserted or no
            //undefined   is a falsy value
            //todo* "done"  js VIP  add |   remove for the icon 
            // ImgURL : !(contactImgInput.files[0])   ? (`${userIconElement.classList.remove("d-none")}`)  : (`/images/${contactImgInput.files[0].name}`),
            // ImgURL : contactImgInput.files[0] === undefined   ? (`${userIconElement.classList.remove("d-none")}`)  : (`/images/${contactImgInput.files[0].name}`),
            // ImgURL : contactImgInput.files[0] === undefined   ? (`${userImg.classList.add("d-none")}`)  : (`/images/${contactImgInput.files[0].name}`),
            ImgURL: setUserImg(),
            fullName: contactFullNameInput.value,
            phoneNumber: contactphoneNumberInput.value,
            emailAddress: contactemailAddressInput.value,
            address: contactaddressInput.value,
            group: contactgroupInput.value,
            notes: contactnotesInput.value,
            // fav: (contactfavInput.checked || favToggleIcon.checked) ? 1 : 0,
            fav: (contactfavInput.checked || favToggleIcon.checked),
            // emerg: (contactemergInput.checked || emerToggleIcon.checked) ? 1 : 0,
            emerg: (contactemergInput.checked || emerToggleIcon.checked),


        };

        // -----------------------
        contactList.push(Contact);
        localStorage.setItem("contactListData", JSON.stringify(contactList));
        displayAllContacts();

        console.log(contactList);
    }


}

//!=================================================
function displayAllContacts() {
    var cartona = "";
    for (var i = 0; i < contactList.length; ++i) {
        cartona += `
        <div class="col">


                                    <div class="card ">
                                        <div class="card-body ">


                                            <div class="head-of-contact d-flex align-items-center  mb-4">
                                                <!--todo ask     d-flex justify-content-center align-items-center     is wrong  why? -->

                                                <!-- img of the contact -->
                                                <div
                                                    id="contactImgDiv"
                                                    class="img rounded-2  text-center shadow mb-2 position-relative me-3 mt-2 ">


                                                    <!-- todo* "done" js : take firstChar of [first + last name] in the arr of fullName -->
                                                    <!-- todo* "done" js     img |  h4         one of them -->

                                                    ${contactList[i].ImgURL === "" ?
                `<div class = "user-img"><h4  class=" h5 fw-bold text-white pt-2">${contactList[i].fullName[0] + contactList[i].fullName.split(" ").slice(-1)[0][0]}</h4></div >`
                : `<div class = "user-img"><img  src="${contactList[i].ImgURL}" alt="${contactList[i].fullName.split(" ")[0]}" class="w-100 rounded-2"></div >`}
                                                    
                                                    



                                                    <!-- todo   js : if i clicked -->
                                                    <!-- fav & emer   badges on the img  -->
                                                    <span
                                                        id = "favBadge"
                                                        class="  fav ${contactList[i].fav ? `d-flex` : `d-none`} justify-content-center align-items-center bg-warning rounded-circle  position-absolute top-0 start-100 translate-middle border-white border">
                                                        <i class="fa-solid fa-star text-white"></i>
                                                    </span>
                                                    <span
                                                        class="emergency ${contactList[i].emerg ? `d-flex` : `d-none`} justify-content-center align-items-center bg-danger rounded-circle position-absolute end-0 start-100 translate-middle   border-white border"><i
                                                            class="fa-solid fa-heart-crack text-white"></i>
                                                    </span>

                                                </div>

                                                <!-- full name  +  phone -->
                                                <!-- todo js -->
                                                <div>
                                                    <h4 style="font-size: 18px;" class=" fw-bold ">${contactList[i].fullName}
                                                    </h4>


                                                    <div class="d-flex align-items-center">
                                                        <i class="fas fa-phone icon-decore phone me-2"></i>
                                                        <span class="text-secondary">${contactList[i].phoneNumber}</span>
                                                    </div>

                                                </div>







                                            </div>


                                            <div class="${contactList[i].emailAddress.trim() === "" ? `d-none` : `d-flex`} align-items-center mt-2 ">
                                                <i class="fas fa-envelope icon-decore phone me-2 email"></i>
                                                <span class="text-secondary ">${contactList[i].emailAddress}</span>
                                            </div>


                                            <div class="${contactList[i].address.trim() === "" ? `d-none` : `d-flex`} align-items-center mt-2">
                                                <i class="fas fa-location-dot icon-decore phone me-2 loc"></i>
                                                <span class="text-secondary">${contactList[i].address}</span>
                                            </div>

                                            <div class="badges mt-4">
                                                <span class="badge be-green me-2 ${contactList[i].group === "Select a group" ? `d-none` : `d-inline`}">${contactList[i].group}</span>
                                                <span class="badge bg-danger bg-opacity-10 text-danger ${contactList[i].emerg ? `d-inline` : `d-none`}">Emergency</span>

                                            </div>
                                        </div>


                                        <div class=" card-footer d-flex justify-content-between align-items-center">

                                            <div class="d-flex py-2">
                                                <!-- todo js  tel:   &  mailto: -->
                                                <a href="tel:${contactList[i].phoneNumber}"
                                                    class=" text-decoration-none icon-decore be-green me-2"><i
                                                        class="fa-solid fa-phone"></i></a>
                                                <a href="mailto:${contactList[i].emailAddress}"
                                                    class="text-decoration-none icon-decore be-purple "><i
                                                        class="fa-solid fa-envelope"></i></a>

                                            </div>


                                            <div>
                                                <!-- todo*  [the better part :)))))))) toggling ]  vip:   remove [fa-regular]   add [fas  , text-warning ] -->

                                               <!-- ${contactList[i].fav ? `<i onclick = "toggleFav()" id="favToggleIcon" class="fas fa-star text-warning"></i>` : `<i onclick = "toggleFav()" id="favToggleIcon" class="ms-2 text-secondary fa-regular fa-star"></i>`} -->
                                                <!-- <i onclick = "toggleFav()" id = "favToggleIcon" class="ms-2 text-secondary fa-regular fa-star"></i>-->
                                                <!-- <i onclick = "toggleFav()" id="favToggleIcon" class="fas fa-star text-warning"></i> -->
                                                <!-- solution: [label + hidden input]    -->

                                                <label >
                                                    <input onchange="toggleFav(${i})" type="checkbox" id="favToggleIcon"  hidden>
                                               ${contactList[i].fav ? `<i class="fas fa-star text-warning"></i>` : `<i class="ms-2 text-secondary fa-regular fa-star"></i>`} 
                                                </label>

                                                <!----------------------------------------------------->

                                                <!--${contactList[i].emerg ? `<i onclick = "toggleEmer()" id="emerToggleIcon" class="fas fa-heart-broken text-danger"></i>` : `<i onclick = "toggleEmer()" id="emerToggleIcon" class="ms-2 text-secondary fa-regular fa-heart"></i>`}-->
                                                <!--<i onclick = "toggleEmer()" id = "emerToggleIcon" class="ms-2 text-secondary fa-regular fa-heart"></i>-->
                                                <!-- <i onclick = "toggleEmer()" id="emerToggleIcon" class="fas fa-heart-broken text-danger"></i> -->
                                                <!-- solution: [label + hidden input]  -->

                                                <label >
                                                    <input onchange = "toggleEmer(${i})" type="checkbox" id="emerToggleIcon"  hidden>
                                                ${contactList[i].emerg ? `<i  class="fas fa-heart-broken text-danger"></i>` : `<i  class="ms-2 text-secondary fa-regular fa-heart"></i>`}
                                                </label>



                                                <i class="ms-2 text-secondary fa-solid fa-pen"></i>
                                                <i class="ms-2 text-secondary fas fa-trash"></i>


                                            </div>

                                        </div>
                                    </div>
                                </div>
        
        
        
        `;

    }

    document.getElementById("rowData").innerHTML = cartona;
}
//!=================================================

//!==========start sidebar
function displayFavContacts() {
    favContentList = [];//must be empty ... due to pushing each time and looping from the first contact  ^^
    var cartona = "";
    for (var i = 0; i < contactList.length; ++i) {
        if (contactList[i].fav) {
            favContentList.push(contactList[i]);
            cartona += `
            <div class="col  ">
                                            <div class="favSlide p-2 rounded-2 d-flex justify-content-between align-items-center "
                                                style="background-color: #F8FAFC;">

                                                <div class="d-flex align-items-center ">
                                                    <div style="background-color: #FF8000;"
                                                        class="img-contact text-center mysidebar-icon-decore shadow-sm me-2">

                                                        <!-- todo* js : take firstChar of [first + last name] in the arr of fullName -->
                                                        <!-- todo* js     img |  h4         one of them -->

                                                        ${contactList[i].ImgURL === "" ?
                    `<h4  class=" h5 fw-bold text-white pt-2">${contactList[i].fullName[0] + contactList[i].fullName.split(" ").slice(-1)[0][0]}</h4>`
                    : `<div class = "user-img"><img  src="${contactList[i].ImgURL}" alt="${contactList[i].fullName.split(" ")[0]}" class="w-100 rounded-2"></div >`}

                                                    </div>

                                                    <div>
                                                        <h4 style="font-size: 14px;" class="mb-1">${contactList[i].fullName}</h4>
                                                        <span  class="text-secondary d-block small">${contactList[i].phoneNumber}</span>


                                                    </div>
                                                </div>

                                                <a href="tel:${contactList[i].phoneNumber}" class="text-decoration-none">
                                                    <span
                                                        class="fas fa-phone icon-decore be-green ">
                                                    </span>
                                                    
                                                </a>

                                            </div>
                                        </div>

            
            
            `;


        }
    }
    document.getElementById("rowFavData").innerHTML = cartona;
    localStorage.setItem("favContentListData", JSON.stringify(favContentList));//update localStorage ^^
    // console.log(favContentList);

}


//!=================================================









//!==========end sidebar
//!========================== end functions :
//!========================== start validation :
// Generic validation Function   =>  T | F
function validateInputs(inputElement) {
    var inputsRegex = {
        //must make the  name of each regex =  each inputElement.id  in the form ^^
        // --------------------

        //\u0600 : uni cod eof arabic letters ^^
        // fullName   : /^[A-Z][a-zA-Z0-9_ ]{2,24}$/,
        //last soluthion .. because .. there is no an arabic capital letter  ^^
        // خدي بالك من المسافات عربي وانجليزي
        // fullName   : /^[A-Z][a-zA-Z0-9_ ]{2,50}$|^[\u0600-\u06ff ]{3,51}$/,    //same regex
        fullName: /^([A-Z][a-zA-Z0-9_ ]{2,50}|[\u0600-\u06ff ]{3,51})$/,      //same regex
        phoneNumber: /^(\+2)?01(0|1|2|5)[0-9]{8}$/,//01023587977

        // emailAddress : /^[a-zA-Z0-9_.-]+@(gmail|yahoo)\.com$/,//noRa_a.z-ab135@gmail.com
        emailAddress: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,//it's more generic [for all domains] ^^

        address: /^.{4,60}$/,
        group: /^(Select a group|Family|Friends|Work|School|Other)$/,
        notes: /^.{0,150}$/,// must mention the length ^^

    }
    var regexName = inputElement.id
    var msgElement = document.getElementById(`${regexName}Msg`);//fullNameMsg
    // ----------------------
    if (inputsRegex[regexName].test(inputElement.value)) {

        // console.log("valid");
        //valid
        inputElement.classList.remove("is-invalid");//remove [danger wrong check ] due to overriding on [is-valid] class from "bootstrap" 
        inputElement.classList.add("is-valid");//add [green right check]

        msgElement.classList.add("d-none");//hide the validation txt

        return true;

    }
    else {
        // console.log("vot valid");
        // not valid
        inputElement.classList.remove("is-valid");//Not must [is-invalid] has  speciificity heigher^^
        inputElement.classList.add("is-invalid");

        msgElement.classList.remove("d-none");//show the validation txt

        return false;

    }




}
//!========================== end validation :


// var test = document.getElementById("favv");
// function t(){
//     test.classList.toggle("checked")
//     console.log(test.checked);
// }

//  test.toggleAttribute("btn-primary")

