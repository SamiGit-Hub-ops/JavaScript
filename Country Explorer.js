
const loaderElem = document.getElementById('loader');
const errorElem = document.getElementById('error');
const countryDetailsElem = document.getElementById('countryDetails');
const searchInputElem = document.getElementById('searchInput');
const searchBtnElem = document.getElementById('searchBtn');

searchBtnElem.addEventListener('click', async () => {

    const country = searchInputElem.value.trim();

    if(!country) return;

    await fetchCountry(country);
});


async function fetchCountry(name) {

    loaderElem.classList.remove('hidden');
    errorElem.classList.add('hidden');


    try {
    const response = await fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`);

    const data = await response.json();

    const country = data[0];

    if(!country) {
        throw new Error(`Invalid country name`);
    }

    const languages = country.languages ? Object.values(country.languages).join(', ') : 'N/A';

    countryDetailsElem.innerHTML = `
        <div class="p-4 border rounded shadow">
                <img src="${country.flags.svg}" alt="flag" class="w-50 mb-2" />
                <h2 class="text-xl font-bold">${country.name.common}</h2>
                <p><strong>Capital:</strong> ${country.capital}</p>
                <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                <p><strong>Languages:</strong> ${languages}</p>
                <div class="mb-4">
                    <h2 class="text-xl font-semibold mb-2">Local Times</h2>
                    <ul id="timezoneList" class="list-disc ml-6"></ul>
                </div>
            </div>
    ` ;


        updateTimezones(country.timezones);
        drawMap(country.latlng, country.name.common);


    } catch (err) {
        errorElem.classList.remove('hidden');
        errorElem.textContent = err.message || 'Failed to load country details';
    
    } finally {
        loaderElem.classList.add('hidden');
    }
}

function updateTimezones(timezones) {
    const timezoneListElem = document.getElementById('timezoneList');
    timezoneListElem.innerHTML = '';

    timezones.forEach((tz) => {
        const li = document.createElement('li');

        const localTime = getTimeUsingIntl(tz);

        li.textContent = `${tz} - ${localTime}` ;

        timezoneListElem.appendChild(li);
    });
    
}


function getTimeUsingIntl(tz) {

    try{
        const options = {
            timeZone : convertToIANA(tz),
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        }

        return Intl.DateTimeFormat('en-US', options).format(new Date());
    
    } catch(e) {
        console.warn(`Timezone ${tz} not supported`);
        return 'Unsupported Timezone';
    }
    
}

function convertToIANA(utcString) {
    // Basic support for known UTC formats
    if (utcString === "UTC") return "Etc/UTC";

    const match = utcString.match(/^UTC([+-]\d{2}):(\d{2})$/);
    if (match) {
        const [, hour, min] = match;
        // Convert UTC offset to Etc/GMT format (note: reverse sign for IANA)
        const offset = parseInt(hour, 10);
        const sign = offset < 0 ? "+" : "-";
        return `Etc/GMT${sign}${Math.abs(offset)}`; // IANA flips signs
    }

    return "Etc/UTC"; // fallback
}



let map;

function drawMap(latlng, name) {
    const [lat, lng] = latlng;

    if (!map) {
        map = L.map("map").setView([lat, lng], 5);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
            map
        );
    } else {
        map.setView([lat, lng], 5);
    }

    L.marker([lat, lng]).addTo(map).bindPopup(name).openPopup();
    
}
