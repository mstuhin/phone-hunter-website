
// loadDataDetails 
const loadSelectedDataDetails = document.querySelector('#loadSelectedDataDetails');
let showmore = document.querySelector('.showmore')
const searchResultsField = document.querySelector(".search-results");
const searchInput = document.querySelector('#search-input');
let searchValueForShowMoreBtn = '';
// searching function 
const searchPhone = (event) => {
    let buttonText = event.target.innerText;

    let searchValue = searchInput.value;

    searchInput.value = '';

    if (searchValue) {
        searchValueForShowMoreBtn = ''
        searchValueForShowMoreBtn = searchValue
    } else {
        searchValueForShowMoreBtn += searchValue;
    }
    if (buttonText === 'Show More') {
        searchValue = searchValueForShowMoreBtn;
    }
    // API URL
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`;
    fetch(url)
        .then(response => response.json())
        .then(responseData => searchResults(responseData.data))

    const searchResults = (phoneData) => {
        loadSelectedDataDetails.innerHTML = ''

        searchResultsField.innerHTML = ''

        if (phoneData.length !== 0 && searchValue !== '') {

            let cardslimit;
            if (buttonText === 'Search') {

                cardslimit = 19;
            } else {

                cardslimit = phoneData.length;
            }
            for (let index in phoneData) {

                if (index <= cardslimit) {
                    const phone = phoneData[index];

                    const div = document.createElement('div');

                    div.classList.add("col-md-4")

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
                    div.innerHTML = phoneItem

                    searchResultsField.appendChild(div)
                }
            };

            if (phoneData.length > 20) {

                if (buttonText === 'Show More') {
                    showmore.classList.remove('d-block')
                    showmore.classList.add('d-none')
                }

                else {
                    showmore.classList.remove('d-none')
                    showmore.classList.add('d-block')
                }
            }
        }
        else {
            let noResultFound = "No Result Found";
            let invalidInput = "Invalid Input";

            const div = document.createElement('div');
            const notFoundDisplay = `
        <div class="text-center text-danger">
        <h1>${searchValue ? noResultFound : invalidInput}</h1>
        </div>
        `
            div.innerHTML = notFoundDisplay
            searchResultsField.appendChild(div)
            showmore.classList?.remove('d-block')
            showmore.classList.add('d-none')
        }
    }
}


const selectedPhoneDetails = (phone_slug) => {
    // API Phone  url
    const url = `https://openapi.programming-hero.com/api/phone/${phone_slug}`;

    fetch(url)
        .then(response => response.json())
        .then(responseData => DisplayDataDetails(responseData.data))

    // DisplayDataDetails 
    const DisplayDataDetails = (selectedPhone) => {

        let othersDetail;
        if (selectedPhone?.others) {

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
        // phone details 
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
        loadSelectedDataDetails.innerHTML = phoneItemDetails;
    }
}
