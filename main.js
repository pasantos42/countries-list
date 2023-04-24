import './style.scss'

let maxResults = 15;
let transitionTime = 100;

const btn = document.querySelector('button');
const input = document.querySelector('input');
const grid = document.querySelector('.countries-grid');
const log = document.createElement('p');
log.classList.add('log');

btn.addEventListener('click', function(event) {
  console.log("Object: ", event.target);
  fetchCountry(input.value);
});

input.addEventListener('keydown', function(event) {
  if (event.keyCode == 13) {
    console.log(`Object: ${event.target}`);
    console.log(`Input: ${input.value}`);
    fetchCountry(input.value);
  }
});

async function fetchCountry(input)
{
  try {
    grid.innerHTML = ''; //clean previous search
    const response = await fetch (`https://restcountries.com/v3.1/region/${input}`);
    if (!response.ok) {
      throw new Error(response.status);
    }
    const data = await response.json();

    log.remove();
    for (let i = 0; i <= maxResults; i++)
    {
      const card = document.createElement('a');
      const flag = document.createElement('img');
      const details = document.createElement('div');
      const name = document.createElement('p');
      const capital = document.createElement('p');
      const area = document.createElement('p');
      const continents = document.createElement('p');
      const languages = document.createElement('p');
      const population = document.createElement('p');
      const subregion = document.createElement('p');
      const dependancy = document.createElement('p');
      const timezone = document.createElement('p');
      
      flag.setAttribute('src', data[i].flags.svg);
      name.innerText = data[i].name.common;
      capital.innerText = data[i].capital[0];
      area.innerText = `Area: ${data[i].area} km²`;
      continents.innerText = `Continent: ${data[i].continents}`;
      languages.innerText = `Languages: ${Object.values(data[i].languages).slice(0, 4).join(' | ')}`;
      population.innerText = `${data[i].population} inhabitants`;
      subregion.innerText = `Region: ${data[i].subregion}`;
      timezone.innerText = `Timezone: ${data[i].timezones[0]}`
      data[i].independent ? dependancy.innerText = 'independent' : dependancy.innerText = 'dependent';

      card.classList.add('card');
      card.classList.add('card--invisible');
      name.classList.add('card__info');
      name.classList.add('card__info--primary');
      capital.classList.add('card__info');
      capital.classList.add('card__info--secondary')
      flag.classList.add('card__flag');
      details.classList.add('card__details');

      grid.insertAdjacentElement('beforeend', card);
      card.insertAdjacentElement('beforeend', flag);
      card.insertAdjacentElement('beforeend', name);
      card.insertAdjacentElement('beforeend', capital);
      
      details.insertAdjacentElement('beforeend', area);
      details.insertAdjacentElement('beforeend', languages);
      details.insertAdjacentElement('beforeend', population);
      details.insertAdjacentElement('beforeend', continents);
      details.insertAdjacentElement('beforeend', subregion);
      details.insertAdjacentElement('beforeend', dependancy);
      details.insertAdjacentElement('beforeend', timezone);

      // card-display transition
      setTimeout(() => {  
        card.classList.remove('card--invisible');
      }, i * transitionTime);

      // for page travelling
      card.setAttribute('href', '#');
      card.setAttribute('id', `card${i}`);

      card.addEventListener('click', function() {
        if (card.classList.contains('card--active')) {

          // transfering 'capital' out of 'details'
          capital.innerText = data[i].capital[0];
          capital.classList.add('card__info--secondary');
          card.insertAdjacentElement('beforeend', capital);

          // reseting tag-display transition
          let tags = document.querySelectorAll('.card--active p');
          for (let j = 0; j < tags.length; j++) {
              tags[j].classList.remove('tag--visible');
          }

          card.classList.remove('card--active');
          details.remove();

          setTimeout(() => {
            card.removeAttribute('href', `#card${i - 3}`);
            card.setAttribute('href', '#');
          }, 500);

        } else {
          card.classList.add('card--active');

          // transfering 'capital' to 'details'
          capital.innerText = `Capital: ${data[i].capital[0]}`;
          capital.classList.remove('card__info--secondary');
          details.insertAdjacentElement('afterbegin', capital);
          card.insertAdjacentElement('beforeend', details);

          // tag-display transition
          let tags = document.querySelectorAll('.card--active p');
          for (let j = 0; j < tags.length; j++) {
            setTimeout(() => {
              tags[j].classList.add('tag--visible');
            }, j * transitionTime);
          }
      
          setTimeout(() => {
            card.removeAttribute('href', '#');
            card.setAttribute('href', `#card${i - 3}`);
          }, 500);
        }
      })
    }
  } catch (error) {
    grid.insertAdjacentElement('beforebegin', log);
    log.innerText = 'unable to fetch countries';
  }
}