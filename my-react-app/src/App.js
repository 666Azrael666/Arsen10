import React, { useState } from 'react';

function App() {
  const [fileName, setFileName] = useState('');
  const [link, setLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Заміни на свій URL Google Apps Script
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/ТВОЙ_КОД/exec';

  const handleCreate = async () => {
    setLoading(true);
    setError(null);
    setLink('');
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userEmail: 'user@example.com', fileName }),
      });
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setLink(data.url);
      }
    } catch (err) {
      setError('Помилка мережі');
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Створення нового Excel файлу</h1>
      <input
        type="text"
        placeholder="Введіть назву файлу"
        value={fileName}
        onChange={e => setFileName(e.target.value)}
        style={{ padding: '0.5rem', width: '300px', marginRight: '1rem' }}
      />
      <button onClick={handleCreate} disabled={loading || !fileName}>
        {loading ? 'Створюємо...' : 'Створити файл'}
      </button>
      {error && <p style={{ color: 'red' }}>Помилка: {error}</p>}
      {link && (
        <p>
          Файл створено!{' '}
          <a href={link} target="_blank" rel="noopener noreferrer">
            Відкрити таблицю
          </a>
        </p>
      )}
    </div>
  );
}

export default App;
