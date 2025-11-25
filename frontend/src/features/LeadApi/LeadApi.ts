// utils/sendLead.ts
interface LeadData {
  name: string;
  phone: string;
  link: string;
  propertyType: string;
  propertyId: number | string;
}

export const sendLead = async (data: LeadData): Promise<void> => {
  console.log('Отправляем лид на сервер:', data); // ← ЭТО ДОЛЖНО ПОЯВИТЬСЯ В КОНСОЛИ!

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/lead`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // ← можно сразу data, не распаковывая
    });

    // ВАЖНО: читаем текст ошибки, если что-то не так
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Сервер ответил ошибкой:', response.status, errorText);
      throw new Error(`Ошибка ${response.status}: ${errorText || 'Неизвестная ошибка'}`);
    }

    console.log('Лид успешно отправлен на бэкенд!');
  } catch (error: any) {
    console.error('Запрос вообще не ушёл (CORS, сеть и т.д.):', error);
    throw error;
  }
};