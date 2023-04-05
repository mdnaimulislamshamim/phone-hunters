const loadPhone = (search) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${search}`
    fetch(url)
    .then(res => res.json())
     .then(data => displayPhones(data.data));
    
}
const displayPhones = phones => {
    // console.log(phones)
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    phones = phones.slice(0, 20)
    const noSearch = document.getElementById('alert-search');
    if(phones.length === 0){
      noSearch.classList.remove('d-none')
    }
    else{
      noSearch.classList.add('d-none')
    }
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card p-4 rounded-4">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phone.brand}</h5>
          <h6>${phone.phone_name}</h6>
          <p class="card-text">${phone.slug}</p>
          <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
        </div>
      </div>
        `;
        phoneContainer.appendChild(phoneDiv);
    });

    toggleLoader(false);  
}

document.getElementById('search-btn').addEventListener('click', function (){
const searchFiled = document.getElementById('search-text')
const searchText = searchFiled.value;
loadPhone(searchText);
toggleLoader(true);
});

const toggleLoader = isLoading => {
  const loadSection = document.getElementById('loader');
  if(isLoading){
    loadSection.classList.remove('d-none')
  }
  else{
    loadSection.classList.add('d-none')
  }
}
const loadPhoneDetails = async id => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhoneDetails(data.data);
}
const displayPhoneDetails = phone =>{
  console.log(phone)
  const modalTitle = document.getElementById('exampleModalLabel');
  modalTitle.innerText = phone.brand;
  const phoneDitailsDiv = document.getElementById('phone-details');
  phoneDitailsDiv.innerHTML = `
  <img class="mb-5" src="${phone.image}" alt="">
  <p>chipSet : ${phone.mainFeatures.chipSet}</p>
  <p>displaySize : ${phone.mainFeatures.displaySize}</p>
  <p>memory : ${phone.mainFeatures.memory}</p>
  <p>storage : ${phone.mainFeatures.storage}</p>
  `;
}
loadPhone('samsung')