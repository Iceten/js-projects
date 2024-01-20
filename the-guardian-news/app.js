const searchInput = document.querySelector(".news-input");
const newsForm = document.querySelector("form");
const newsCtn = document.querySelector(".news-container");
const guardianKey = "bcc710c6-f0af-4205-84f7-b506cbbee017";

const guardianAPI =
  "https://content.guardianapis.com/search?page=2&q=debate&api-key=test";

//Events
//Search a news
newsForm.addEventListener("submit", (e) => {
  e.preventDefault();
  getNews(e);
});
// searchInput.addEventListener("keypress", (e) => {
//   if (e.key === "Enter") {
//     e.preventDefault();
//     getNews(e);
//   }
// });

async function getNews(e) {
  console.log(e);
  console.log(searchInput.value);

  const searchWord = searchInput.value;
  const response = await fetch(
    `https://content.guardianapis.com/search?q=${searchWord}&api-key=${guardianKey}`
  );

  const responseData = await response.json();
  const results = responseData.response.results;

  newsCtn.innerHTML = "";
  results.forEach((news) => {
    newsCtn.innerHTML += `
    <div class="news">
    <p>${news.sectionName}</p>
    <p>${news.webPublicationDate.slice(0, 10)}</p>
    <a href="${news.webUrl} target="_blank">${news.webUrl}</a>
    </div>`;
  });
  console.log(responseData.response.results);
}
