document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('start-test');
    const downloadValue = document.getElementById('download-value');
    const uploadValue = document.getElementById('upload-value');
    const pingValue = document.getElementById('ping-value');
    const gaugeFill = document.querySelector('.gauge-fill');
    const gaugeCover = document.querySelector('.gauge-cover');
    const serverLocation = document.querySelector('.server-location');
    
    let testInProgress = false;
    let downloadSpeed = 0;
    let uploadSpeed = 0;
    let ping = 0;
    
    // Имитация определения местоположения сервера
    setTimeout(() => {
        serverLocation.textContent = "Сервер: Москва, Россия";
    }, 1500);
    
    startButton.addEventListener('click', function() {
        if (testInProgress) return;
        
        testInProgress = true;
        startButton.disabled = true;
        startButton.textContent = "Тестирование...";
        
        // Сброс значений
        downloadValue.textContent = "—";
        uploadValue.textContent = "—";
        pingValue.textContent = "—";
        gaugeFill.style.transform = 'rotate(0.5turn)';
        gaugeCover.textContent = '0 Мбит/с';
        
        // Тестирование ping
        ping = Math.floor(Math.random() * 30) + 5; // Имитация ping 5-35 мс
        pingValue.textContent = ping;
        
        // Тестирование скорости загрузки
        simulateDownloadTest();
    });
    
    function simulateDownloadTest() {
        let progress = 0;
        const duration = 10000; // 10 секунд для теста
        const interval = 50; // Обновление каждые 50 мс
        const steps = duration / interval;
        let step = 0;
        
        downloadSpeed = Math.floor(Math.random() * 900) + 100; // Имитация скорости 100-1000 Мбит/с
        
        const downloadInterval = setInterval(() => {
            step++;
            progress = easeOutQuad(step / steps);
            
            // Обновление шкалы
            const rotation = 0.5 - (progress * 0.5);
            gaugeFill.style.transform = `rotate(${rotation}turn)`;
            gaugeCover.textContent = `${Math.floor(downloadSpeed * progress)} Мбит/с`;
            
            if (step >= steps) {
                clearInterval(downloadInterval);
                downloadValue.textContent = downloadSpeed;
                setTimeout(simulateUploadTest, 500);
            }
        }, interval);
    }
    
    function simulateUploadTest() {
        let progress = 0;
        const duration = 10000; // 10 секунд для теста
        const interval = 50; // Обновление каждые 50 мс
        const steps = duration / interval;
        let step = 0;
        
        uploadSpeed = Math.floor(downloadSpeed * (Math.random() * 0.3 + 0.5)); // 50-80% от download speed
        
        const uploadInterval = setInterval(() => {
            step++;
            progress = easeOutQuad(step / steps);
            
            // Обновление шкалы
            const rotation = 0.5 - (progress * 0.5);
            gaugeFill.style.transform = `rotate(${rotation}turn)`;
            gaugeCover.textContent = `${Math.floor(uploadSpeed * progress)} Мбит/с`;
            
            if (step >= steps) {
                clearInterval(uploadInterval);
                uploadValue.textContent = uploadSpeed;
                finishTest();
            }
        }, interval);
    }
    
    function finishTest() {
        testInProgress = false;
        startButton.disabled = false;
        startButton.textContent = "Начать заново";
    }
    
    // Функция для плавной анимации
    function easeOutQuad(t) {
        return t * (2 - t);
    }
});
// Добавьте этот код в конец файла
document.addEventListener('DOMContentLoaded', function() {
    const aboutBtn = document.getElementById('about-me');
    const modal = document.getElementById('about-modal');
    const closeBtn = document.querySelector('.close-modal');

    aboutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        modal.style.display = 'block';
    });

    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
});