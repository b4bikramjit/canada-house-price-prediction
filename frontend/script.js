

function adjustSidebar() {
    const sidebar = document.querySelector(".sidebar");

    if (window.innerWidth >= 1025) {
        sidebar.classList.remove("collapsed");   // OPEN on desktop
    } else {
        sidebar.classList.add("collapsed");      // COLLAPSED on mobile/tablet
    }
}

// Run on load
adjustSidebar();

// Run on window resize
window.addEventListener("resize", adjustSidebar);


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
   console.log("Predict button clicked");

    const loader = document.getElementById("load");
    const resultsBox = document.querySelector(".results");

    // Hide previous results
    resultsBox.classList.remove("show");

    // Show loader
    loader.style.display = "flex";
    const startTime = Date.now();

    // Build payload
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

    try {

        const res = await fetch("http://localhost:8000/api/predict", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(payload)
        });

        const data = await res.json();

        const price = Math.round(data.predicted_price);
        const low = Math.round(price * 0.80);
        const high = Math.round(price * 1.20);

        // Fill results
        document.getElementById("price_main").textContent = `$${price.toLocaleString()}`;
        document.getElementById("range_low").textContent = `$${low.toLocaleString()}`;
        document.getElementById("range_high").textContent = `$${high.toLocaleString()}`;

    } catch (error) {
        console.error("Prediction error:", error);
    }

    const minDuration = 700; // milliseconds
    const elapsed = Date.now() - startTime;
    const remaining = Math.max(0, minDuration - elapsed);

    setTimeout(() => {
    loader.style.display = "none";  
    resultsBox.classList.add("show");

    // Wait for results animation to expand height
    setTimeout(() => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth"
        });
    }, 350); // matches your .results transition duration

}, remaining);
});

  
