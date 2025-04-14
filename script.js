

        const apiKey = '23de87e7be7570d22175de1e92feb8bb';
        const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

        async function getWeather() {
            const city = document.getElementById('cityInput').value;
            const error = document.getElementById('error');
            const weatherInfo = document.getElementById('weatherInfo');

            if (!city) {
                error.style.display = 'block';
                error.textContent = 'Vui lòng nhập tên thành phố!';
                weatherInfo.style.display = 'none';
                return;
            }

            try {
                const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric&lang=vi`);
                if (!response.ok) throw new Error('Không tìm thấy thành phố!');

                const data = await response.json();

                document.getElementById('cityName').textContent = data.name;
                document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}°C`;
                document.getElementById('description').textContent = data.weather[0].description;
                document.getElementById('windSpeed').textContent = `Gió: ${data.wind.speed} m/s`;
                document.getElementById('humidity').textContent = `Độ ẩm: ${data.main.humidity}%`;
                document.getElementById('cloudiness').textContent = `Mây: ${data.clouds.all}%`;

                error.style.display = 'none';
                weatherInfo.style.display = 'block';
            } catch (err) {
                error.style.display = 'block';
                error.textContent = err.message;
                weatherInfo.style.display = 'none';
            }
        }

        document.getElementById('cityInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') getWeather();
        });