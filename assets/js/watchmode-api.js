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



function renderSearch(titleResults) {

  titleResults.forEach(title => {
      const article = document.createElement('article');
      const header = document.createElement('header');
      const titleHeader = document.createElement('h2');
      const headerLink = document.createElement('a');
      headerLink.textContent = title.name;
      headerLink.dataset.name = title.name;
      headerLink.href = '#main';
      headerLink.addEventListener('click', getStreamingServices)
      const imageLink = document.createElement('a');
      imageLink.classList.add('image', 'fit');
      imageLink.href = '#main';
      imageLink.dataset.name = title.name
      imageLink.addEventListener('click', getStreamingServices)
      const titleImage = document.createElement('img');
      titleImage.src = title.image_url ? title.image_url : '';
      titles.append(article);
      article.append(header);
      header.append(titleHeader);
      titleHeader.append(headerLink);
      article.append(imageLink);
      imageLink.append(titleImage);
  })

  function getStreamingServices(e) {
    const titleInfo = titleResults.filter(title => title.name === e.currentTarget.dataset.name)
    titles.textContent = '';
    console.log(titleInfo);
    fetch(`https://api.watchmode.com/v1/title/${titleInfo[0].id}/sources/?apiKey=${apiKey}`)
    .then(res => res.json())
    .then(data => {
      if(data.length === 0) {
        const h2 = document.createElement('h2');
        h2.textContent = 'No streaming services available.';
        titles.append(h2);
      }
      const dataUniq = [...new Map(data.map(v => [v.name, v])).values()]
      dataUniq.forEach(service => {
        const article = document.createElement('article');
        const header = document.createElement('header');
        const titleHeader = document.createElement('h2');
        const headerLink = document.createElement('a');
        headerLink.textContent = service.name;
        headerLink.href = service.web_url;
        titles.append(article);
        article.append(header);
        header.append(titleHeader);
        titleHeader.append(headerLink);      
      })
    })
    .catch(err => console.log(`err: ${err}`))
  }
}
