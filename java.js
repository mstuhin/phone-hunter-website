const searchButton = () => {
    const inputFild = document.getElementById("search-box").value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputFild}`;
    fetch(url)
        .then(res => res.json())
        .then((data) =>)
};