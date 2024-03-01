 const loadPhone =async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json()
    const phone = data.data;
    // console.log(phone)
    displayPhones(phone)
 }

const displayPhones = (phones) =>{

    const phoneContainer = document.getElementById('phone-container')

    phoneContainer.textContent = ''
    // display show all button if there are more then 12 phones.
    const showAllContainer = document.getElementById('show-all-container')
    if(phones.length > 12){
        showAllContainer.classList.remove('hidden')
    }
    else{
        showAllContainer.classList.add('hidden')
    }
    phones = phones.slice(0,12)
    // console.log(phones.length)
     phones.forEach(phone => {
        console.log(phone)
        // create a div element.
        const phoneCard = document.createElement('div')
        phoneCard.classList= `card bg-gray-100 p-4 shadow-xl`
        // set innerHTML 
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-end">
            <button onclick="show_modal_details.showModal()" class="btn btn-primary">Buy Now</button>
            </div>
        </div>
        `
        // appendChild 
        phoneContainer.appendChild(phoneCard)
     })
     toggleLoadingSpinner(false)
}

// handle search button 

    const handleSearch = () =>{
        toggleLoadingSpinner(true)
         const searchField = document.getElementById('search-field')
         const searchText = searchField.value;
         console.log(searchText)
         loadPhone(searchText)
    }

//  recap search button 
const handleSearch2 = () => {
    toggleLoadingSpinner(true)
    const searchField = document.getElementById('search-field2')
    const searchText = searchField.value;
    // console.log(searchText)
    loadPhone(searchText)
}

// toggle loading spinner 
const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner  = document.getElementById('loading-spinner')
   if(isLoading){
    loadingSpinner.classList.remove('hidden')
   }else{
    loadingSpinner.classList.add('hidden')
   }
}


 