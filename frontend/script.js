
document.getElementById("sidebarToggle").addEventListener("click", function () {
    document.querySelector(".sidebar").classList.toggle("collapsed");
});






/// Load cities.json
let cityData = {};

// Load city_freq.json
fetch("city_freq.json")
  .then(res => res.json())
  .then(data => {
    cityData = data;
  });

// Update city dropdown when province changes
document.getElementById("province").addEventListener("change", function () {

    const province = this.value;
    const citySelect = document.getElementById("city");

    // Clear previous options
    citySelect.innerHTML = "";

    // If province not found
    if (!cityData[province]) {
        citySelect.innerHTML = `<option>No cities available</option>`;
        return;
    }

    // Extract city names (keys of nested dict)
    const cities = Object.keys(cityData[province]);

    // Populate dropdown
    cities.forEach(city => {
        const option = document.createElement("option");
        option.value = city;
        option.textContent = city;
        citySelect.appendChild(option);
    });

});

function hideResults() {
    document.querySelector(".results").classList.remove("show");
};


const inputs = document.querySelectorAll(
    "#bedrooms, #bathrooms, #sqft, #province, #city, #property_type, #garage, #pool, #garden, #balcony"
  );
  
  inputs.forEach(input => {
      input.addEventListener("change", hideResults);
  });


  function enforceLimit(id) {
    const input = document.getElementById(id);
    let value = Number(input.value);

    if (value > 10) input.value = 10;
    if (value < 0) input.value = 0;
}
  function updateSqftValue(value) {
    document.getElementById("sqft_value").textContent = value;
}

document.getElementById("predict_btn").addEventListener("click", async () => {

    const payload = {
      Bedrooms: Number(document.getElementById("bedrooms").value),
      Bathrooms: Number(document.getElementById("bathrooms").value),
      SquareFootage: Number(document.getElementById("sqft").value),
      Province: document.getElementById("province").value,
      City: document.getElementById("city").value,
      PropertyType: document.getElementById("property_type").value,
      Garage: document.getElementById("garage").checked ? 1 : 0,
      Pool: document.getElementById("pool").checked ? 1 : 0,
      Garden: document.getElementById("garden").checked ? 1 : 0,
      Balcony: document.getElementById("balcony").checked ? 1 : 0
    };
  
    console.log("Sending payload:", payload);
  
    const res = await fetch("http://localhost:8000/api/predict", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(payload)
    });
  
    const data = await res.json();
  
    const price = Math.round(data.predicted_price);
    const low = Math.round(price * 0.80);
    const high = Math.round(price * 1.20);

    document.querySelector(".results").classList.add("show");

    setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth"
        });
      }, 150);

  
    
    document.getElementById("price_main").textContent = `$${price.toLocaleString()}`;
    document.getElementById("range_low").textContent = `$${low.toLocaleString()}`;
    document.getElementById("range_high").textContent = `$${high.toLocaleString()}`;
  });
  