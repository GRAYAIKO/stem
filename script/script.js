const apiKey = '23de87e7be7570d22175de1e92feb8bb';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

async function getWeather() {
    const city = document.getElementById('cityInput').value;
    const error = document.getElementById('error');
    const weatherInfo = document.getElementById('weatherInfo');
    const container = document.querySelector('.container');
    const cityInput = document.getElementById('cityInput');

    // Reset container class
    container.classList.remove('ngu');

    if (!city) {
        error.style.display = 'block';
        error.textContent = 'Vui lòng nhập tên thành phố!';
        weatherInfo.style.display = 'none';
        container.classList.add('ngu');
        return;
    }

    try {
        const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric&lang=vi`);
        if (!response.ok) throw new Error('Không tìm thấy thành phố!');

        const data = await response.json();

        const temperature = Math.round(data.main.temp);
        const weatherDescription = data.weather[0].description.toLowerCase();

        document.getElementById('cityName').textContent = data.name;
        document.getElementById('temperature').textContent = `${temperature}°C`;
        document.getElementById('description').textContent = weatherDescription;
        document.getElementById('windSpeed').textContent = `Gió: ${data.wind.speed} m/s`;
        document.getElementById('humidity').textContent = `Độ ẩm: ${data.main.humidity}%`;
        document.getElementById('cloudiness').textContent = `Mây: ${data.clouds.all}%`;

        error.style.display = 'none';
        weatherInfo.style.display = 'block';
        container.classList.remove('ngu');

        container.classList.add('update');
        setTimeout(() => container.classList.remove('update'), 0);

        // Cập nhật hiệu ứng thời tiết
        updateWeatherEffects(temperature, weatherDescription);

    } catch (err) {
        error.style.display = 'block';
        container.classList.add('ngu');
        error.textContent = err.message;
        weatherInfo.style.display = 'none';
        cityInput.value = '';
        cityInput.focus();
    }
}

function updateWeatherEffects(temperature, weatherDescription) {
    const body = document.body;
    const rainContainer = document.getElementById('rain-container');
    const snowContainer = document.getElementById('snow-container');
    const sunContainer = document.getElementById('sun-container');
    const leafContainer = document.getElementById('leaf-container');

    // Clear existing effects
    rainContainer.innerHTML = '';
    snowContainer.innerHTML = '';
    sunContainer.innerHTML = '';
    leafContainer.innerHTML = '';

    body.style.transition = 'background-color 0.5s ease';

    // Thay đổi màu nền dựa trên nhiệt độ
    if (temperature >= 30) {
        body.style.background = 'linear-gradient(45deg, #FFA07A, #FFD700)'; // Cam, vàng
    } else if (temperature <= 10) {
        body.style.background = 'linear-gradient(45deg, #ADD8E6, #87CEEB)'; // Xanh nhạt
    } else if (temperature < 30){
        body.style.background = 'linear-gradient(45deg, #0a0a0a, #3a4452)'; // Mặc định
    }

    // Thêm hiệu ứng mưa
    if (weatherDescription.includes('rain')) {
        createRain(rainContainer);
    }

    // Thêm hiệu ứng tuyết
    if (weatherDescription.includes('snow')) {
        createSnow(snowContainer);
    }

    // Thêm hiệu ứng mặt trời
    if (weatherDescription.includes('clear') && !weatherDescription.includes('cloud')) {
        body.style.background = 'linear-gradient(45deg, #87CEEB, #FFFFFF)'; // Bầu trời quang đãng
        createSun(sunContainer);
    } else if (weatherDescription.includes('cloud')) {
        body.style.background = 'linear-gradient(45deg, #B0C4DE, #FFFFFF)'; // Trời nhiều mây
    }

     // Thêm hiệu ứng lá rơi (mùa thu) - Bạn có thể thêm điều kiện theo mùa nếu muốn
     createLeaves(leafContainer);
}

function createRain(container) {
    for (let i = 0; i < 100; i++) {
        const drop = document.createElement('div');
        drop.classList.add('rain-drop');
        drop.style.left = `${Math.random() * 100}%`;
        drop.style.animationDelay = `${Math.random() * 2}s`;
        container.appendChild(drop);
    }
}

function createSnow(container) {
    for (let i = 0; i < 50; i++) {
        const flake = document.createElement('div');
        flake.classList.add('snow-flake');
        flake.style.left = `${Math.random() * 100}%`;
        flake.style.animationDelay = `${Math.random() * 4}s`;
        container.appendChild(flake);
    }
}

function createSun(container) {
    const sun = document.createElement('div');
    sun.classList.add('sun');
    container.appendChild(sun);
}

function createLeaves(container) {
    for (let i = 0; i < 30; i++) {
        const leaf = document.createElement('div');
        leaf.classList.add('leaf');
        leaf.style.left = `${Math.random() * 100}%`;
        leaf.style.animationDelay = `${Math.random() * 5}s`;
        container.appendChild(leaf);
    }
}

document.getElementById('cityInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        getWeather();
    }
});