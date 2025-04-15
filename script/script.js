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

        // Thêm class winter cho các detail-card nếu nhiệt độ <= 16
        const detailCards = document.querySelectorAll('.detail-card');
        detailCards.forEach(card => {
            if (temperature <= 16) {
                card.classList.add('winter');
            } else {
                card.classList.remove('winter');
            }
        });

        // Thêm class winter cho cityName nếu nhiệt độ <= 16
        const cityName = document.getElementById('cityName');
        if (temperature <= 16) {
            cityName.classList.add('winter');
        } else {
            cityName.classList.remove('winter');
        }

        // Thêm class winter cho temperature và description nếu nhiệt độ <= 16
        const temperatureElement = document.getElementById('temperature');
        const descriptionElement = document.getElementById('description');
        if (temperature <= 16) {
            temperatureElement.classList.add('winter');
            descriptionElement.classList.add('winter');
        } else {
            temperatureElement.classList.remove('winter');
            descriptionElement.classList.remove('winter');
        }

        // Thêm class winter cho search-box nếu nhiệt độ <= 16
        const searchBox = document.querySelector('.search-box');
        if (temperature <= 16) {
            searchBox.classList.add('winter');
        } else {
            searchBox.classList.remove('winter');
        }

        // Thêm class sunny cho các detail-card nếu trời nắng
        detailCards.forEach(card => {
            if (temperature >=30 ) {
                card.classList.add('sunny');
            } else {
                card.classList.remove('sunny');
            }
        });

        // Thêm class sunny cho cityName nếu trời nắng
        if (temperature >=30) {
            cityName.classList.add('sunny');
        } else {
            cityName.classList.remove('sunny');
        }

        // Thêm class sunny cho temperature và description nếu trời nắng
        if (temperature >=30) {
            temperatureElement.classList.add('sunny');
            descriptionElement.classList.add('sunny');
        } else {
            temperatureElement.classList.remove('sunny');
            descriptionElement.classList.remove('sunny');
        }

        // Thêm class sunny cho search-box nếu trời nắng
        if (temperature >=30) {
            searchBox.classList.add('sunny');
        } else {
            searchBox.classList.remove('sunny');
        }

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
        body.style.color = '#fff'; // Màu chữ trắng
    } else if (temperature <= 16) {
        body.style.background = 'linear-gradient(45deg, #ADD8E6, #87CEEB)'; // Xanh nhạt (chủ đề mùa đông)
        body.style.color = '#000'; // Đổi màu chữ thành đen
    } else if (temperature < 30){
        body.style.background = 'linear-gradient(45deg, #0a0a0a, #3a4452)'; // Màu tối
        body.style.color = '#fff'; // Màu chữ trắng
    }
}

document.getElementById('cityInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        getWeather();
    }
});