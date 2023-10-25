import React, { useState } from 'react';

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const validateEmail = (email) => {
    // Проста перевірка формату електронної пошти
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    // Перевірка, що телефон складається лише з цифр і має довжину 12
    const phoneRegex = /^[0-9]{12}$/;
    return phoneRegex.test(phone);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Проведення валідації і встановлення помилок
    const newErrors = {
      name: formData.name ? '' : 'Це поле обов\'язкове',
      email: validateEmail(formData.email) ? '' : 'Некоректний формат електронної пошти',
      phone: validatePhone(formData.phone) ? '' : 'Телефон повинен містити лише 12 цифр'
    };

    setErrors(newErrors);

    // Якщо всі поля валідні, відправте дані або виконайте інші дії
    if (Object.values(newErrors).every((error) => !error)) {
      // Відправка даних або виконання інших дій
      console.log('Форма валідна. Дані можна відправляти.');
    }
  };

  return (
    <div>
      <h2>Форма</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Ім'я:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <span style={{ color: 'red' }}>{errors.name}</span>
        </div>
        <div>
          <label>Електронна пошта:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <span style={{ color: 'red' }}>{errors.email}</span>
        </div>
        <div>
          <label>Телефон:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
          <span style={{ color: 'red' }}>{errors.phone}</span>
        </div>
        <button type="submit">Відправити</button>
      </form>
    </div>
  );
};

export default Form;
