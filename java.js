
// loadSelectedDataDetails div selector
const loadSelectedDataDetails = document.querySelector('#loadSelectedDataDetails');
// show more button selector
let showmore = document.querySelector('.showmore')
// search-results div selector
const searchResultsField = document.querySelector(".search-results");
// search input selector
const searchInput = document.querySelector('#search-input');
// declare search value for show more button
let searchValueForShowMoreBtn = '';
// searching function 
const searchPhone = (event) => {
    let buttonText = event.target.innerText;
    // searching input value
    let searchValue = searchInput.value;
    //seaching input value none while click search button
    searchInput.value = '';
    // search value for show more button
    if (searchValue) {
        searchValueForShowMoreBtn = ''
        searchValueForShowMoreBtn = searchValue
    } else {
        searchValueForShowMoreBtn += searchValue;
    }

    // initialize for search value while show more button click
    if (buttonText === 'Show More') {
        searchValue = searchValueForShowMoreBtn;
    }
    // API URL
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`;
    // fetch data
    fetch(url)
        .then(response => response.json())
        .then(responseData => searchResults(responseData.data))

    // search results function
    const searchResults = (phoneData) => {
        // Empty loadSelectedDataDetails div while multiple searching
        loadSelectedDataDetails.innerHTML = ''
        // Empty searchResultsField div while multiple searching
        searchResultsField.innerHTML = ''
        // if searching results found
        if (phoneData.length !== 0 && searchValue !== '') {
            // showing cards limit variable
            let cardslimit;
            if (buttonText === 'Search') {
                // for showing 20 cards
                cardslimit = 19;
            } else {
                // for showing all cards
                cardslimit = phoneData.length;
            }
            for (let index in phoneData) {
                // for limited searching result
                if (index <= cardslimit) {
                    const phone = phoneData[index];
                    // create a div element
                    const div = document.createElement('div');
                    // add class for created div element
                    div.classList.add("col-md-4")
                    // display phone card  
                    const phoneItem = `<div class="card text-center p-5 shadow">
                                        <img src="${phone.image}" class="card-img-top w-75 mx-auto" alt="">
                                        <div class="card-body">
                                            <h5 class="card-title">${phone.brand}</h5>
                                            <p class="card-text">
                                            ${phone.phone_name}
                                            </p>
                                            <a href="#" id ="loadDetails" class="btn btn-primary" onclick="selectedPhoneDetails('${phone.slug}')">Details</a>
                                        </div>
                                      </div>
                                      `
                    //assign div innerHTML 
                    div.innerHTML = phoneItem
                    // append div as a child of seach-result-field div
                    searchResultsField.appendChild(div)
                }
            };
            // show more button hide/unhide
            if (phoneData.length > 20) {
                // hiding show more button
                if (buttonText === 'Show More') {
                    showmore.classList.remove('d-block')
                    showmore.classList.add('d-none')
                }
                // showing show more button
                else {
                    showmore.classList.remove('d-none')
                    showmore.classList.add('d-block')
                }
            }
        }
        // if search result not found
        else {
            let noResultFound = "No Result Found";
            let invalidInput = "Invalid Input";
            // create a div element
            const div = document.createElement('div');
            // display no result found div
            const notFoundDisplay = `
        <div class="text-center text-danger">
        <h1>${searchValue ? noResultFound : invalidInput}</h1>
        </div>
        `
            //assign div innerHTML 
            div.innerHTML = notFoundDisplay
            // append div as a child of seach-result-field div
            searchResultsField.appendChild(div)
            showmore.classList?.remove('d-block')
            showmore.classList.add('d-none')
        }
    }
}


const selectedPhoneDetails = (phone_slug) => {
    // API Phone detail url
    const url = `https://openapi.programming-hero.com/api/phone/${phone_slug}`;
    // fetch data
    fetch(url)
        .then(response => response.json())
        .then(responseData => DisplayDataDetails(responseData.data))

    // DisplayDataDetails function
    const DisplayDataDetails = (selectedPhone) => {
        // othersDetail variable initialize
        let othersDetail;
        // if 'others' property in the selectedPhone object
        if (selectedPhone?.others) {
            // others items
            othersDetail = `<li class="list-group-item">
        Bluetooth : 
        ${selectedPhone.others.Bluetooth}
      </li >
      <li class="list-group-item">
        GPS : 
        ${selectedPhone.others.GPS}
      </li >
      <li class="list-group-item">
        NFC : 
        ${selectedPhone.others.NFC}
      </li >
      <li class="list-group-item">
        Radio : 
        ${selectedPhone.others.Radio}
      </li >
      <li class="list-group-item">
        USB : 
        ${selectedPhone.others.USB}
      </li >
      <li class="list-group-item">
        WLAN : 
        ${selectedPhone.others.WLAN}
      </li >
      `
        }
        // phone details div
        const phoneItemDetails = `
 <div class="card mx-5 shadow px-2 py-3">
     <div class="row g-0">
         <div class="col-md-4 d-flex justify-content-center align-items-center pb-3">
             <img src="${selectedPhone.image}" class="card-img-top w-75 mx-auto pt-3" alt="">
         </div>
         <div class="col-md-8">
             <div class="card-body">
                 <h5 class="card-title">${selectedPhone.brand}</h5>
             </div>
             <ul class="list-group list-group-flush d-flex">
                 <li class="list-group-item">
                 Model Name : ${selectedPhone.name}
                 </li>
                 <li class="list-group-item">
                 Release Date : 
                 ${selectedPhone.releaseDate ? selectedPhone.releaseDate : 'No Release Date Found'}
                 </li>
                 <li class="list-group-item">
                 ChipSet : 
                 ${selectedPhone.mainFeatures.chipSet}
                 </li>
                 <li class="list-group-item">
                 Display Size : 
                 ${selectedPhone.mainFeatures.displaySize}
                 </li>
                 <li class="list-group-item">
                 Memory : 
                 ${selectedPhone.mainFeatures.memory}
                 </li>
                 <li class="list-group-item">
                 Storage : 
                 ${selectedPhone.mainFeatures.storage}
                 </li>
                 <li class="list-group-item">
                 Sensor : 
                 ${selectedPhone.mainFeatures.sensors.join(" | ")}
                 </li>
                 ${othersDetail ? othersDetail : ''}
             </ul >
         </div>
     </div>
 </div > `
        // assinging loadSelectedDataDetails innerHTML
        loadSelectedDataDetails.innerHTML = phoneItemDetails;
    }
}
