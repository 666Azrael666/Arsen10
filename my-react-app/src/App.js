import React, { useState } from 'react';

function App() {
  const [fileName, setFileName] = useState('');
  const [result, setResult] = useState('');

  // URL твого Apps Script вебдодатку
  const scriptUrl = 'https://script.google.com/macros/s/AKfycbxNjUWaWtZVxEljrKBl2jln7Bl2HHremqtYslzeVJStI_oMirwRZrFmpZ7KKw8Sv9K8yw/exec';

  const createFile = () => {
    if (!fileName.trim()) {
      alert('Введіть назву файлу');
      return;
    }

    // Формуємо URL з параметром
    const url = `${scriptUrl}?action=createCopy&fileName=${encodeURIComponent(fileName)}`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setResult(`Файл створено: <a href="${data.url}" target="_blank" rel="noopener noreferrer">${data.url}</a>`);
        } else {
          setResult('Сталася помилка: ' + data.message);
        }
      })
      .catch(err => setResult('Помилка: ' + err.message));
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Створення файлу на основі шаблону</h2>
      <input
        type="text"
        placeholder="Назва нового файлу"
        value={fileName}
        onChange={e => setFileName(e.target.value)}
        style={{ marginRight: 10 }}
      />
      <button onClick={createFile}>Створити</button>
      <div style={{ marginTop: 20 }} dangerouslySetInnerHTML={{ __html: result }} />
    </div>
  );
}

export default App;


