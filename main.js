import './style.scss'

const btn = document.querySelector('button');
const input = document.querySelector('input');
const grid = document.querySelector('.countries-grid');
const log = document.createElement('p');
const resultsnbr = 15;

grid.insertAdjacentElement('beforebegin', log);
log.classList.add('log');

btn.addEventListener('click', function(event) {
  console.log("Object: ", event.target);
  fetchCountry(input.value);
});

input.addEventListener('keydown', function(event) {
  if (event.keyCode == 13) {
    console.log("Object: ", event.target);
    console.log("Input: " + input.value);
    fetchCountry(input.value);
  }
});

async function fetchCountry(input)
{
  try {
    grid.innerHTML = '';
    const response = await fetch (`https://restcountries.com/v3.1/region/${input}`);
    if (!response.ok) {
      throw new Error(response.status);
    }
    const data = await response.json();
    log.innerText = '';
    console.log(data[1]);
    for (let i = 0; i <= resultsnbr; i++)
    {
      const card = document.createElement('a');
      const flag = document.createElement('img');
      const details = document.createElement('div');
      const name = document.createElement('p');
      const capital = document.createElement('p');
      const area = document.createElement('p');
      const continents = document.createElement('p');
      const currencies = document.createElement('p');
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
      if (data[i].independent == true) {
        dependancy.innerText = 'independent';
      } else {
        dependancy.innerText = 'dependent';
      }

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

      setTimeout(() => {  
        card.classList.remove('card--invisible');
      }, i * 100);

      card.setAttribute('href', '#');
      card.setAttribute('id', `card${i}`);

      card.addEventListener('click', function() {
        if (card.classList.contains('card--active')) {
          capital.innerText = data[i].capital[0];
          card.insertAdjacentElement('beforeend', capital);
          capital.classList.add('card__info--secondary');
          card.classList.remove('card--active');
          details.remove();
          setTimeout(() => {
            card.removeAttribute('href', `#card${i - 3}`);
            card.setAttribute('href', '#');
          }, 500);
        } else {
          card.classList.add('card--active');
          capital.classList.remove('card__info--secondary');
          card.insertAdjacentElement('beforeend', details);
          capital.innerText = `Capital: ${data[i].capital[0]}`;
          details.insertAdjacentElement('afterbegin', capital);
          setTimeout(() => {
            card.removeAttribute('href', '#');
            card.setAttribute('href', `#card${i - 3}`);
          }, 500);
        }
      })
    }
  } catch (error) {
    log.innerText = 'unable to fetch countries';
  }
}