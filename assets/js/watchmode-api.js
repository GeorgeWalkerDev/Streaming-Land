const apiKey = 'MB4gzmhVNVA8n71On3jvaaUYRHlKvZHTZr41yw4A'

//search `https://api.watchmode.com/v1/search/?apiKey=${apiKey}&search_field=name&search_value=${searchValue}`
//source `https://api.watchmode.com/v1/title/${title_id}/sources/?apiKey=${apiKey}`

// const searchButton = document.querySelector('.search');
// searchButton.addEventListener('click', searchTitle);

// let titleResults
const titles = document.querySelector('.posts');

// function searchTitle() {
//   titles.textContent = '';
//   let searchTitle = document.querySelector('input').value.replace(' ', '%20');
//   console.log(searchTitle)
//   fetch(`https://api.watchmode.com/v1/search/?apiKey=${apiKey}&search_field=name&search_value=${searchTitle}`)
//   .then(res => res.json())
//   .then(data => {
//     if(data.title_results.length === 0) {
//       const h2 = document.createElement('h2');
//       h2.textContent = 'No results found, please try another search term.';
//       titles.append(h2);
//     }
//     console.log(data)
//     titleResults = data.title_results
//     data.title_results.forEach(title => {
//       const h2 = document.createElement('h2');
//       h2.classList.add(title.name.split(' ').join(''))
//       h2.style.cursor = 'pointer';
//       h2.textContent = title.name;
//       titles.append(h2);
//       h2.addEventListener('click', getStreamingServices);
//     })
//   })
//   .catch(err => console.log(`err: ${err}`))
// }


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

const article = document.createElement('article');
const header = document.createElement('header')
const titleHeader = document.createElement('h2');
const headerLink = document.createElement('a');
headerLink.textContent = 'Sed magna';
headerLink.href = '#';
const imageLink = document.createElement('a');
imageLink.classList.add('image', 'fit');
imageLink.href = '#';
const titleImage = document.createElement('img');
titleImage.src = 'images/pic02.jpg';
const titleDescrip = document.createElement('p');
titleDescrip.textContent = 'Donec eget ex magna. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque venenatis dolor imperdiet dolor mattis sagittis magna etiam.';
titles.append(article)
article.append(header);
header.append(titleHeader);
titleHeader.append(headerLink);
article.append(imageLink);
imageLink.append(titleImage);
article.append(titleDescrip)