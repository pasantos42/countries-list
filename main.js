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
      const name = document.createElement('p');
      const capital = document.createElement('p');
      const area = document.createElement('p');
      const continents = document.createElement('p');
      const currencies = document.createElement('p');
      const languages = document.createElement('p');
      const population = document.createElement('p');
      const subregion = document.createElement('p');
      
      flag.setAttribute('src', data[i].flags.svg);
      name.innerText = data[i].name.common;
      capital.innerText = data[i].capital[0];
      area.innerText = data[i].area;
      continents.innerText = data[i].continents;
      currencies.innerText = data[i].currencies;
      languages.innerText = data[i].languages;
      population.innerText = data[i].population;
      subregion.innerText = data[i].subregion;

      card.classList.add('card');
      name.classList.add('name');
      capital.classList.add('capital');

      grid.insertAdjacentElement('beforeend', card);
      card.insertAdjacentElement('beforeend', flag);
      card.insertAdjacentElement('beforeend', name);
      card.insertAdjacentElement('beforeend', capital);
      
      card.insertAdjacentElement('beforeend', area);
      card.insertAdjacentElement('beforeend', continents);
      card.insertAdjacentElement('beforeend', currencies);
      card.insertAdjacentElement('beforeend', languages);
      card.insertAdjacentElement('beforeend', population);
      card.insertAdjacentElement('beforeend', subregion);

      setTimeout(() => {  
        card.classList.add('visible');
      }, i * 100);

      card.setAttribute('href', '#');
      card.setAttribute('id', `card${i}`);

      card.addEventListener('click', function() {
        if (card.classList.contains('active')) {
          card.classList.remove('active');
          setTimeout(() => {
            card.removeAttribute('href', `#card${i - 3}`);
            card.setAttribute('href', '#');
          }, 500);
        } else {
          card.classList.add('active')
          capital.innerText = `CAPITAL: ${data[i].capital[0]}`;
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