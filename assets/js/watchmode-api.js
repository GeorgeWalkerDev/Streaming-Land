const apiKey = 'MB4gzmhVNVA8n71On3jvaaUYRHlKvZHTZr41yw4A'

//search `https://api.watchmode.com/v1/search/?apiKey=${apiKey}&search_field=name&search_value=${searchValue}`
//source `https://api.watchmode.com/v1/title/${title_id}/sources/?apiKey=${apiKey}`
// autocomplete search `https://api.watchmode.com/v1/autocomplete-search/?apiKey=${apiKey}&search_value=${searchValue}&search_type=1`
// person search `https://api.watchmode.com/v1/person/${titleInfo[0].id}?apiKey=${apiKey}`


// Get search form and create event listener to search for title
const searchForm = document.querySelector('#searchForm');
searchForm.addEventListener('submit', searchTitle);

// Get titles section from DOM
const titles = document.querySelector('.posts');

//Store data
let currentData

//Function to fetch titles or actors based on search form input value
function searchTitle(event) {
  event.preventDefault();
  const searchTitle = document.querySelector('#title').value.replace(' ', '%20');
  fetch(`https://api.watchmode.com/v1/autocomplete-search/?apiKey=${apiKey}&search_value=${searchTitle}&search_type=1`)
  .then(res => res.json())
  .then(data => {
    currentData = data.results
    if(data.results.length === 0) {
      const h2 = document.createElement('h2');
      h2.textContent = 'No results found, please try another search term.';
      titles.append(h2);
    }
    renderSearch(data.results);
  })
  .catch(err => console.log(`err: ${err}`))
}

// Function to render the search results into the DOM and fetch streaming services based on clicked title
function renderSearch(titleResults) {
  // Empty content
  titles.textContent = '';
  //Render all title results to DOM
  titleResults.forEach(title => {
    renderPost(title)
  })
}

//Get actor films
function fetchActor(current, e) {
  const actorInfo = current.filter(title => title.name === e.currentTarget.dataset.name)
  fetch(`https://api.watchmode.com/v1/person/${actorInfo[0].id}?apiKey=${apiKey}`)
    .then(res => res.json())
    .then(data => {
      titles.textContent = '';
      currentData = [];
      data.known_for.forEach((id) => {
        fetch(`https://api.watchmode.com/v1/title/${id}/details/?apiKey=${apiKey}&append_to_response=sources`)
          .then(res => res.json())
          .then(data => {
            currentData.push(data);
            renderPost(data);
          })
          .catch(err => console.log(`err: ${err}`))
      })
    })
    .catch(err => `err: ${err}`)
}

//Get sources
function fetchSources(current, e) {
  //Filter the titleResults object to match the clicked title
  const titleInfo = current.filter(title => title.name === e.currentTarget.dataset.name || title.title === e.currentTarget.dataset.name)
  titles.textContent = '';
  fetch(`https://api.watchmode.com/v1/title/${titleInfo[0].id}/sources/?apiKey=${apiKey}`)
  .then(res => res.json())
  .then(data => {
    if(data.length === 0) {
      const h2 = document.createElement('h2');
      h2.textContent = 'No streaming services available.';
      titles.append(h2);
    }
    //Remove duplicates from fetched data
    const dataUniq = [...new Map(data.map(v => [v.name, v])).values()];
    // Render each unique data to DOM
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

// Fetch the streaming services or actor films based on clicked title and render to DOM
function getStreamingServices(e) {
  if (e.currentTarget.dataset.type === 'Actor') {
    fetchActor(currentData, e);
  } else {
    fetchSources(currentData, e)
  }
}

//Render post
function renderPost(title) {
  const article = document.createElement('article');
  const header = document.createElement('header');
  const titleHeader = document.createElement('h2');
  const headerLink = document.createElement('a');
  headerLink.textContent = 'name' in title ? title.name : title.title;
  headerLink.dataset.name = 'name' in title ? title.name : title.title;
  headerLink.dataset.type = title.type;
  headerLink.href = '#main';
  //Add event listener to header link to fetch and render streaming services to DOM
  headerLink.addEventListener('click', getStreamingServices)
  const imageLink = document.createElement('a');
  imageLink.classList.add('image', 'fit');
  imageLink.href = '#main';
  imageLink.dataset.name = 'name' in title ? title.name : title.title;
  imageLink.dataset.type = title.type;
  //Add event listener to image link to fetch and render streaming services to DOM
  imageLink.addEventListener('click', getStreamingServices);
  const titleImage = document.createElement('img');
  titleImage.src = title.image_url ? title.image_url : '';
  //Append all created items
  titles.append(article);
  article.append(header);
  header.append(titleHeader);
  titleHeader.append(headerLink);
  article.append(imageLink);
  imageLink.append(titleImage);
}