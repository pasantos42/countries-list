import './style.scss'

const btn = document.querySelector('button');
const input = document.querySelector('input');
const grid = document.querySelector('.countries-grid');
const cards = document.querySelectorAll('a')
const resultsnbr = 15;

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
    const response = await fetch (`https://restcountries.com/v3.1/region/${input}`);
    if (!response.ok) {
      throw new Error(response.status);
    }
    const data = await response.json();
    for (let i = 0; i <= resultsnbr; i++)
    {
      const card = document.createElement('a');
      const flag = document.createElement('img');
      const name = document.createElement('p');
      const capital = document.createElement('p');
      
      card.classList.add('card');
      flag.setAttribute('src', data[i].flags.svg);
      name.innerText = data[i].name.common;
      capital.innerText = data[i].capital[0];

      grid.insertAdjacentElement('beforeend', card);
      card.insertAdjacentElement('beforeend', flag);
      card.insertAdjacentElement('beforeend', name);
      card.insertAdjacentElement('beforeend', capital);

      card.setAttribute('href', '#');
      card.setAttribute('id', `card${i}`);

      card.addEventListener('click', function(event) {
        if (card.classList.contains('active')) {
          card.classList.remove('active');
          setTimeout(() => {
            card.removeAttribute('href', `#card${i - 3}`);
            card.setAttribute('href', '#');
          }, 500);
        } else {
          card.classList.add('active')
          setTimeout(() => {
            card.removeAttribute('href', '#');
            card.setAttribute('href', `#card${i - 3}`);
          }, 500);
        }
      })
    }
    
  } catch (error) {
    const log = document.createElement('p');
    log.innerText = 'Unable to fetch Unable to fetch countries';
    ul.insertAdjacentElement('afterend', log);
  }
}