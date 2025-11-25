export const getPathSegments = (url: string = window.location.href) => {
  // Берём только pathname (без домена, параметров и хэша)
  const pathname = new URL(url, window.location.origin).pathname;

  // Разбиваем путь на сегменты и убираем пустые
  const parts = pathname.split('/').filter(Boolean);

  // Берём последние две части (если их меньше — вернёт то, что есть)
  const type = parts[parts.length - 2] || '';
  const id = parts[parts.length - 1] || '';

  return { type, id: id ? Number(id) || id : null };
};