import { Link } from "react-router-dom";

// utils/connectApi.ts
interface ConnectData {
  name: string;
  phone: string;
  propertyType?: string; // опционально
}

export const connectApi = async (data: ConnectData): Promise<void> => {
  console.log('Отправляем заявку:', data);

  try {
    const response = await fetch('http://localhost:4000/lead/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name.trim(),
        phone: data.phone.trim(),
        link: '/',
        // ← Если propertyType передан — используем его, иначе — "продажа"
        propertyType: data.propertyType || 'продажа',
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Ошибка сервера: ${response.status} — ${errorText}`);
    }

    console.log('Заявка успешно отправлена!');
  } catch (error) {
    console.error('Ошибка при отправке заявки:', error);
    throw error;
  }
};