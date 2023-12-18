document.getElementById("search_button").addEventListener("click", function() {
    const searchBox = document.getElementById("search_box");
    const countryName = searchBox.value;
    const url = `https://restcountries.com/v3.1/name/${countryName}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const country = data[0];
            const region = country.region;
            const regionUrl = `https://restcountries.com/v3.1/region/${region}`;

            return fetch(regionUrl)
                .then(regionResponse => regionResponse.json())
                .then(regionData => {
                    const countries = regionData.map(country => `
   						<div id="region_country_item">
        					<div id="region_country">
            					<img src="${country.flags.png}" alt="Flag">
            					<p>${country.name.common}</p>
        					</div>
   						 </div>`).join("");

                    const countryDetails = `
                        <h2>${country.name.common}</h2>
						<div id="info_container">
							<img src="${country.flags.png}" alt="Flag">
							<ul>
								<h3>Country Details</h3>
								<li>Area: ${country.area} km²</li>
								<li>Capital: ${country.capital}</li>
								<li>Currency: ${Object.values
									(country.currencies)[0].name} 
									(${Object.values(country.currencies)
										[0].symbol})</li>
								<li>Language: ${Object.values
									(country.languages)[0]}</li>
								<li>Population: ${country.population}</li>
							</ul>
						</div>`;

                    document.getElementById
                        ("country_details").innerHTML = countryDetails;
                    document.getElementById
                        ("region_countries").innerHTML = `
                            <h2>Countries in ${region}</h2>
                            <div id="region_countries_list">
								${countries}</div>`;
                });
        })
        .catch(error => {
            console.log(error);
            alert("Please Enter a Valid Country!");
        });
});
