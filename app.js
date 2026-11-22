  console.log('app.js is loaded');

//listing js alue

  const menuList = document.querySelector('#menu-list');
  const menuStatus = document.querySelector('#menu-status');
  const initialCards = document.querySelectorAll('#menu-list article');

  for (const card of initialCards) {
    console.log(card.querySelector('h3').textContent);
  }

if (menuList && menuStatus) {
  menuStatus.textContent = `Showing ${initialCards.length} of ${initialCards.length}`;

  const filterButtons = document.querySelectorAll('[data-filter]');
  let currentFilter = 'all';

  function applyFilter(filter) {
    currentFilter = filter;
    const allCards = document.querySelectorAll('#menu-list article');
    let visibleCount = 0;

    for (const card of allCards) {
      const diets = card.dataset.diet.split(' ');
      const matches = filter === 'all' || diets.includes(filter);
      card.hidden = !matches;

      if (matches) {
        visibleCount++;
      }
    }

    menuStatus.textContent = `Showing ${visibleCount} of ${allCards.length}`;


    
  }

for (const button of filterButtons) {
    button.addEventListener('click', () => {
      for (const other of filterButtons) {
        other.setAttribute('aria-pressed', String(other === button));
      }
      applyFilter(button.dataset.filter);
      localStorage.setItem('e3-filter', button.dataset.filter);
    });
  }

  const savedFilter = localStorage.getItem('e3-filter');
  if (savedFilter) {
    const savedButton = document.querySelector(`[data-filter="${savedFilter}"]`);
    if (savedButton) {
      savedButton.click();
    }
  }
}


//listing end


//contact lomakke ja jne

const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');

if (contactForm && formStatus) {
  contactForm.noValidate = true;
  contactForm.querySelector('#date').min = new Date().toISOString().split('T')[0];

const fields = contactForm.querySelectorAll('input, textarea');

function setFieldError(field, message) {
    document.querySelector(`#${field.id}-error`).textContent = message;
    if (message) {
      field.setAttribute('aria-invalid', 'true');
    } else {
      field.removeAttribute('aria-invalid');
    }
  }


  function getErrorMessage(field) {
    if (field.validity.valueMissing) return 'Tämä kenttä on pakollinen.';
    if (field.validity.patternMismatch) return 'Tarkista muoto (katso ohje yllä).';
    if (field.validity.rangeUnderflow) return 'Valitse tänään tai myöhempi päivä.';
    return '';
  }


  contactForm.addEventListener('input', (event) => {
    const field = event.target;
    if (field.hasAttribute('aria-invalid') && field.validity.valid) {
      setFieldError(field, '');
    }
  });



  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let firstInvalid = null;

    for (const field of fields) {
      const error = getErrorMessage(field);
      setFieldError(field, error);
      if (error && !firstInvalid) {
        firstInvalid = field;
      }
    }

    if (firstInvalid) {
      formStatus.textContent = '';
      firstInvalid.focus();
      return;
    }

    const name = contactForm.elements.name.value;
    formStatus.textContent = `Kiitos, ${name}! Huoltopyyntösi on valmis.`;
    contactForm.reset();
  });






}

