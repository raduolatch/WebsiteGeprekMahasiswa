const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000/api').replace(/\/$/, '');

async function request(path, options) {
  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });
  } catch {
    throw new Error('Tidak dapat terhubung ke server. Pastikan backend sedang berjalan.');
  }

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Permintaan gagal (${response.status}).`);
  }

  if (response.status === 204) return null;
  return response.json();
}

export async function fetchMenu() {
  const result = await request('/menu');
  const menu = Array.isArray(result) ? result : result?.data;
  if (!Array.isArray(menu)) {
    throw new Error('Format daftar menu dari server tidak valid.');
  }
  return menu;
}

export function createOrder(order) {
  return request('/orders', {
    method: 'POST',
    body: JSON.stringify(order),
  });
}
