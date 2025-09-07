const form = document.getElementById('booking-form');
const thankYouMessage = document.getElementById('thank-you-message');
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxUc_tP0mxkL0F-JwWR3w4fh9JcjEkMFHkNG6XTfdgEwGwKHdXxlD2NaSRyQ-IuSInZsA/exec';

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = '送信中...';

    fetch(SCRIPT_URL, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(result => {
        if (result.status === 'success') {
            form.style.display = 'none';
            thankYouMessage.style.display = 'block';
        } else {
            throw new Error(result.message || '送信に失敗しました。');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('エラーが発生しました: ' + error.message);
        submitButton.disabled = false;
        submitButton.textContent = '送信';
    });
});