const loadPhone = async (searchText = '13', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json()
    const phones = data.data;
    // console.log(phones)
    displayPhones(phones, isShowAll)
}


const displayPhones = (phones, isShowAll) => {
    console.log(phones)
    const phoneContainer = document.getElementById('phone-container');
    // clear phone container cards before adding new cards.
    phoneContainer.textContent = '';

    // display show all button if there are more then 12 phones.
    const showAllContainer = document.getElementById('show-all-container')
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden')
    } else {
        showAllContainer.classList.add('hidden')
    }

    // console.log('is show all',isShowAll)

    // console.log(phones.length)
    // display only first 12 phones if not show all.
    if (!isShowAll) {
        phones = phones.slice(0, 12)
    }

    phones.forEach(phone => {
        // console.log(phone)
        // 2 create a div
        const phoneCard = document.createElement('div')
        phoneCard.classList = `card bg-gray-100 p-5 shadow-xl`
        // 3. set innerHTML
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-center">
            <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show details</button>
            </div>
        </div>
        `
        // 4. appendChild 
        phoneContainer.appendChild(phoneCard)

    });
    // toggle spinner remove
    toggleLoadingSpinner(false)
}



// handle search button.
const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true)
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value;
    // console.log(searchText)
    loadPhone(searchText, isShowAll)
}

//  recap handle search 
// const handleSearch2 =() =>{ 
//     toggleLoadingSpinner(true)
//     const searchField2 = document.getElementById('search-field2')
//     const searchText = searchField2.value;
//     // console.log(searchText)
//     loadPhone(searchText)
// }

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner')
    if (isLoading) {
        loadingSpinner.classList.remove('hidden')
    } else {
        loadingSpinner.classList.add('hidden')
    }
}

const handleShowDetail = async (id) => {
    // console.log('handle show detail',id)
    // load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json()
    const phone = data.data
    showPhoneDetails(phone)
}
const showPhoneDetails = (phone) => {
    console.log(phone)
    const showDetailsPhoneName = document.getElementById('show-details-phone-name')
    showDetailsPhoneName.innerText = phone.name;

    const showDetailsContainer = document.getElementById('show-details-container')
    showDetailsContainer.innerHTML = `
    <img src="${phone.image}" alt="">
    <p><span class="font-bold">Storage:</span>${phone?.mainFeatures?.storage}</p>
    <p><span class="font-bold">displaySize:</span>${phone?.mainFeatures?.displaySize}</p>
    <p><span class="font-bold">chipSet:</span>${phone?.mainFeatures?.chipSet}</p>
    <p><span class="font-bold">memory:</span>${phone?.mainFeatures?.memory}</p>
    <p><span class="font-bold">slug: </span>${phone?.slug}</p>
    <p><span class="font-bold">releaseDate: </span>${phone?.releaseDate}</p>
    <p><span class="font-bold">Brand: </span>${phone?.brand}</p>
    <p><span class="font-bold">Others: </span>${phone?.others?.GPS}</p>
    `
    // show the modal
    show_details_modal.showModal()
}

const handleShowAll = () => {
    handleSearch(true)
}

loadPhone()