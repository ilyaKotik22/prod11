// src/hooks/useDebounce.ts
import { useEffect, useState } from 'react';

/**
 * Задерживает обновление значения на `delay` миллисекунд
 * @param value — значение, которое нужно дебаунсить
 * @param delay — задержка в мс (по умолчанию 400)
 */
export function useDebounce<T>(value: T, delay: number = 400): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}