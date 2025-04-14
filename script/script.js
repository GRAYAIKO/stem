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
        container.classList.add('ngu'); // Thêm class 'ngu' nếu chưa nhập
        return;
    }

    try {
        const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric&lang=vi`);
        if (!response.ok) throw new Error('Không tìm thấy thành phố!');

        const data = await response.json();

        const temperature = Math.round(data.main.temp);

        document.getElementById('cityName').textContent = data.name;
        document.getElementById('temperature').textContent = `${temperature}°C`;
        document.getElementById('description').textContent = data.weather[0].description;
        document.getElementById('windSpeed').textContent = `Gió: ${data.wind.speed} m/s`;
        document.getElementById('humidity').textContent = `Độ ẩm: ${data.main.humidity}%`;
        document.getElementById('cloudiness').textContent = `Mây: ${data.clouds.all}%`;

        error.style.display = 'none';
        weatherInfo.style.display = 'block';
        container.classList.remove('ngu'); // Loại bỏ class 'ngu' nếu có

        container.classList.add('update');
        setTimeout(() => container.classList.remove('update'), 0);

        // Thay đổi màu nền theo nhiệt độ
        updateBackgroundColor(temperature);

    } catch (err) {
        error.style.display = 'block';
        container.classList.add('ngu'); // Thêm class 'ngu' nếu có lỗi
        error.textContent = err.message;
        weatherInfo.style.display = 'none';
        cityInput.value = '';
        cityInput.focus();
    }
}

function updateBackgroundColor(temperature) {
    const body = document.body;
    body.style.transition = 'background-color 0.5s ease'; // Thêm transition

    if (temperature >= 30) {
        body.style.background = 'linear-gradient(45deg, #FFA07A, #FFD700)'; // Cam, vàng
    } else if (temperature <= 16) {
        body.style.background = 'linear-gradient(45deg, #ADD8E6, #87CEEB)'; // Xanh nhạt (chủ đề mùa đông)
    } else if (temperature < 30){
        body.style.background = 'linear-gradient(45deg, #0a0a0a, #3a4452)'; // Màu tối
    }
}

document.getElementById('cityInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        getWeather();
    }
});