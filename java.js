
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

