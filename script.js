const form = document.getElementById("form");
const searchTxt = document.getElementById("form-input");
const showMore = document.getElementById("show-more-btn");
const searchResults = document.querySelector(".search-results");
const resultPlaceholder = document.querySelectorAll(".result-placeholder");

let page = 1;
searchTxt.value = "";

const accesskey = `AAD-254WD8rVSXA79Z3ghp1CECwOyYAw0q5g4oGEX7E`;

const createHtml = (results) => {
  results.forEach((mov) => {
    searchResults.innerHTML += `
    <a href="${mov.urls.full}" target="_blank">
    <div class="search-result">
      <img
        class="image-result"
        src="${mov.urls.small}"
        alt=""
    />
    <span>${mov.alt_description}</span>
  </div>
  </a>`;
  });
};

const getImg = async () => {
  const url = `https://api.unsplash.com//search/photos/?query=${searchTxt.value}&page=${page}&client_id=${accesskey}`;
  const fecth = await fetch(url);
  const json = await fecth.json();
  const results = json.results;

  createHtml(results);
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  searchResults.innerHTML = "";
  getImg();
  resultPlaceholder.forEach((mov) => (mov.style.display = "none"));
  showMore.style.display = "block";
  page++;
});

showMore.addEventListener("click", getImg);
