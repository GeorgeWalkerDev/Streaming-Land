const apiKey = 'MB4gzmhVNVA8n71On3jvaaUYRHlKvZHTZr41yw4A'

//search `https://api.watchmode.com/v1/search/?apiKey=${apiKey}&search_field=name&search_value=${searchValue}`
//source `https://api.watchmode.com/v1/title/${title_id}/sources/?apiKey=${apiKey}`
// autocomplete search `https://api.watchmode.com/v1/autocomplete-search/?apiKey=${apiKey}&search_value=${searchValue}&search_type=1`

const searchForm = document.querySelector('#searchForm');
searchForm.addEventListener('submit', searchTitle);

let titleResults
const titles = document.querySelector('.posts');

function searchTitle(event) {
  event.preventDefault();
  titles.textContent = '';
  let searchTitle = document.querySelector('#title').value.replace(' ', '%20');
  fetch(`https://api.watchmode.com/v1/autocomplete-search/?apiKey=${apiKey}&search_value=${searchTitle}&search_type=1`)
  .then(res => res.json())
  .then(data => {
    console.log(data.results)
    if(data.results.length === 0) {
      const h2 = document.createElement('h2');
      h2.textContent = 'No results found, please try another search term.';
      titles.append(h2);
    }
    renderSearch(data.results);
  })
  .catch(err => console.log(`err: ${err}`))
}


// function getStreamingServices(e) {
//   const titleInfo = titleResults.filter(title => title.name === e.target.textContent)
//   titles.textContent = ''
//   fetch(`https://api.watchmode.com/v1/title/${titleInfo[0].id}/sources/?apiKey=${apiKey}`)
//   .then(res => res.json())
//   .then(data => {
//     if(data.length === 0) {
//       const h2 = document.createElement('h2');
//       h2.textContent = 'No streaming services available.';
//       titles.append(h2);
//     }
//     const dataUniq = [...new Map(data.map(v => [v.name, v])).values()]
//     dataUniq.forEach(service => {
//       const h2 = document.createElement('h2');
//       const url = document.createElement('h3')
//       h2.textContent = service.name;
//       url.textContent = service.web_url
//       titles.append(h2);
//       titles.append(url);
//     })
//   })
//   .catch(err => console.log(`err: ${err}`))
// }


function renderSearch(titleResults) {
  titleResults.forEach(title => {
      const article = document.createElement('article');
      const header = document.createElement('header');
      const titleHeader = document.createElement('h2');
      const headerLink = document.createElement('a');
      headerLink.textContent = title.name;
      headerLink.href = '#';
      const imageLink = document.createElement('a');
      imageLink.classList.add('image', 'fit');
      imageLink.href = '#';
      const titleImage = document.createElement('img');
      titleImage.src = title.image_url ? title.image_url : '';
      titles.append(article);
      article.append(header);
      header.append(titleHeader);
      titleHeader.append(headerLink);
      article.append(imageLink);
      imageLink.append(titleImage);
  })
}
