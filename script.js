const btn = document.getElementById("get-weather-btn");

btn.addEventListener("click", () => {
  const select = document.getElementById("city-select");
  if (!select.value) {
    enterCity();
    return;
  }
  clearWarning();
  showWeather(select.value);
});

function clearWarning() {
  const existingMsg = document.getElementById("city-warning");
  if (existingMsg) existingMsg.remove();
}

function enterCity() {
  clearWarning();
  const display = document.querySelector(".display");
  const msg = document.createElement("p");
  msg.id = "city-warning";
  msg.textContent = "****Choose a drop down City !****";
  msg.style.textAlign = "center";
  msg.style.marginTop = "25px";
  msg.style.color = "red";
  msg.style.fontWeight = "bold";
  msg.style.fontSize = "35px";
  display.prepend(msg);
}

async function showWeather(city) {
  try {
    const data = await getWeather(city);

    // 1. WEATHER IMAGE/ICON
    const icon = document.getElementById("weather-icon");
    if (data.weather?.[0]?.icon) {
      icon.src = data.weather[0].icon;
      icon.alt = data.weather[0].description || "Weather icon";
      icon.style.display = "inline";
    } else {
      icon.removeAttribute("src");
      icon.style.display = "none";
    }

    // 2. MAIN TEMPERATURE
    document.getElementById("main-temperature").textContent =
      data.main?.temp != null ? `${data.main.temp} ℃` : "N/A";

    // 3. FEELS LIKE WEATHER
    document.getElementById("feels-like").textContent =
      data.main?.feels_like != null ? `Feels Like: ${data.main.feels_like} ℃` : "N/A";

    // 4. HUMIDITY
    document.getElementById("humidity").textContent =
      data.main?.humidity != null ? `Humidity: ${data.main.humidity}%` : "N/A";

    // 5. WIND SPEED
    document.getElementById("wind").textContent =
      data.wind?.speed != null ? `Wind: ${data.wind.speed} m/s` : "N/A";

    // 6. WIND GUST
    document.getElementById("wind-gust").textContent =
      data.wind?.gust != null ? `Gust: ${data.wind.gust} m/s` : "N/A";

    // 7. WEATHER TYPE/DESCRIPTION
    document.getElementById("weather-main").textContent =
      data.weather?.[0]?.main ?? "N/A";

    // 8. LOCATION CITY
    document.getElementById("location").textContent = data.name ?? "N/A";

    // ADD HORIZONTAL LINE ONCE
    const content = document.querySelector(".content-info");
    if (content && !content.querySelector(".weather-divider")) {
      const hr = document.createElement("hr");
      hr.className = "weather-divider";
      hr.style.border = "2px solid #ccc";
      hr.style.width = "100%";
      hr.style.margin = "10px 0";
      content.insertBefore(hr, content.children[2] || null);
    }
  } catch (err) {
    const ids = [
      "main-temperature",
      "feels-like",
      "humidity",
      "wind",
      "wind-gust",
      "weather-main",
      "location",
    ];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.textContent = "N/A";
    });
    console.error("Something went wrong, please try again later:", err);
  }
}

async function getWeather(city) {
  try {
    const response = await fetch(
      `https://weather-proxy.freecodecamp.rocks/api/city/${encodeURIComponent(city)}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();
    if (data.error) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    console.error(error);
    alert("Something went wrong, please try again later");
    throw error; // Re-throw so showWeather's catch block handles the fallback UI
  }
}
