'use client';

import { useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';

export default function SettingsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminHeader setSidebarOpen={setSidebarOpen} />
        
        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Настройки</h1>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Сохранить изменения
            </button>
          </div>

          {/* Вкладки настроек */}
          <div className="bg-white rounded-lg shadow mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab('general')}
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === 'general'
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Общие
                </button>
                <button
                  onClick={() => setActiveTab('users')}
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === 'users'
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Пользователи
                </button>
                <button
                  onClick={() => setActiveTab('appearance')}
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === 'appearance'
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Внешний вид
                </button>
                <button
                  onClick={() => setActiveTab('security')}
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === 'security'
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Безопасность
                </button>
                <button
                  onClick={() => setActiveTab('advanced')}
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === 'advanced'
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Дополнительно
                </button>
              </nav>
            </div>
          </div>

          {/* Содержимое вкладок */}
          <div className="bg-white shadow rounded-lg overflow-hidden p-6">
            {activeTab === 'general' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-6">Общие настройки</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Название сайта
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      defaultValue="Lucky Train"
                      aria-label="Название сайта"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Описание сайта
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      defaultValue="Образовательная платформа для трейдеров с элементами метавселенной"
                      aria-label="Описание сайта"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      URL сайта
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      defaultValue="https://lucky-train.example.com"
                      aria-label="URL сайта"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Часовой пояс
                    </label>
                    <select 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      aria-label="Часовой пояс"
                    >
                      <option value="UTC+3">Москва (UTC+3)</option>
                      <option value="UTC+0">Лондон (UTC+0)</option>
                      <option value="UTC-5">Нью-Йорк (UTC-5)</option>
                      <option value="UTC-8">Лос-Анджелес (UTC-8)</option>
                      <option value="UTC+8">Пекин (UTC+8)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Язык по умолчанию
                    </label>
                    <select 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      aria-label="Язык по умолчанию"
                    >
                      <option value="ru">Русский</option>
                      <option value="en">English</option>
                      <option value="es">Español</option>
                      <option value="de">Deutsch</option>
                      <option value="fr">Français</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="maintenance-mode"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      defaultChecked={false}
                    />
                    <label htmlFor="maintenance-mode" className="ml-2 block text-sm text-gray-900">
                      Включить режим обслуживания
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-6">Настройки пользователей</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Регистрация пользователей
                    </label>
                    <select 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      aria-label="Регистрация пользователей"
                    >
                      <option value="open">Открытая регистрация</option>
                      <option value="approval">Требуется одобрение администратора</option>
                      <option value="invite">Только по приглашениям</option>
                      <option value="closed">Регистрация отключена</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Роль по умолчанию
                    </label>
                    <select 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      aria-label="Роль по умолчанию"
                    >
                      <option value="user">Пользователь</option>
                      <option value="subscriber">Подписчик</option>
                      <option value="contributor">Участник</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="email-verification"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      defaultChecked={true}
                    />
                    <label htmlFor="email-verification" className="ml-2 block text-sm text-gray-900">
                      Требовать подтверждение email при регистрации
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="admin-notification"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      defaultChecked={true}
                    />
                    <label htmlFor="admin-notification" className="ml-2 block text-sm text-gray-900">
                      Уведомлять администраторов о новых регистрациях
                    </label>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Минимальная длина пароля
                    </label>
                    <input
                      type="number"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      defaultValue="8"
                      min="6"
                      max="32"
                      aria-label="Минимальная длина пароля"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Время автоматического выхода из системы (в минутах)
                    </label>
                    <input
                      type="number"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      defaultValue="30"
                      min="5"
                      aria-label="Время автоматического выхода из системы"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-6">Настройки внешнего вида</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Тема
                    </label>
                    <select 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      aria-label="Тема"
                    >
                      <option value="light">Светлая</option>
                      <option value="dark">Тёмная</option>
                      <option value="system">Системная</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Логотип
                    </label>
                    <div className="flex items-center space-x-4">
                      <div className="h-16 w-16 bg-gray-200 rounded-md flex items-center justify-center text-gray-400">
                        Логотип
                      </div>
                      <button className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        Загрузить новый
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Favicon
                    </label>
                    <div className="flex items-center space-x-4">
                      <div className="h-8 w-8 bg-gray-200 rounded-md flex items-center justify-center text-gray-400 text-xs">
                        Favicon
                      </div>
                      <button className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        Загрузить новый
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Основной цвет
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        className="h-10 w-10 border-0 p-0"
                        defaultValue="#3B82F6"
                        aria-label="Основной цвет"
                        title="Выберите основной цвет"
                      />
                      <input
                        type="text"
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        defaultValue="#3B82F6"
                        aria-label="Значение основного цвета"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Шрифт
                    </label>
                    <select 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      aria-label="Шрифт"
                    >
                      <option value="inter">Inter</option>
                      <option value="roboto">Roboto</option>
                      <option value="opensans">Open Sans</option>
                      <option value="lato">Lato</option>
                      <option value="montserrat">Montserrat</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="enable-animations"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      defaultChecked={true}
                    />
                    <label htmlFor="enable-animations" className="ml-2 block text-sm text-gray-900">
                      Включить анимации интерфейса
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-6">Настройки безопасности</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Двухфакторная аутентификация
                    </label>
                    <select 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      aria-label="Двухфакторная аутентификация"
                    >
                      <option value="disabled">Отключена</option>
                      <option value="optional">Опциональная для пользователей</option>
                      <option value="required-admin">Обязательная для администраторов</option>
                      <option value="required-all">Обязательная для всех</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ограничение входа по IP
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Введите IP-адреса, разделенные запятой (оставьте пустым, если ограничений нет)"
                      aria-label="Ограничение входа по IP"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Максимальное количество попыток входа
                    </label>
                    <input
                      type="number"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      defaultValue="5"
                      min="1"
                      aria-label="Максимальное количество попыток входа"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Время блокировки после неудачных попыток (в минутах)
                    </label>
                    <input
                      type="number"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      defaultValue="15"
                      min="1"
                      aria-label="Время блокировки после неудачных попыток"
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="force-ssl"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      defaultChecked={true}
                    />
                    <label htmlFor="force-ssl" className="ml-2 block text-sm text-gray-900">
                      Принудительно использовать HTTPS
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="enable-captcha"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      defaultChecked={true}
                    />
                    <label htmlFor="enable-captcha" className="ml-2 block text-sm text-gray-900">
                      Включить CAPTCHA при входе
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'advanced' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-6">Дополнительные настройки</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ключ API
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        defaultValue="sk_test_WFGHx9MxVtB5bJTZXd3GhUf5"
                        readOnly
                        aria-label="Ключ API"
                      />
                      <button className="px-4 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        Сгенерировать новый
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Лимит загрузки файлов (в МБ)
                    </label>
                    <input
                      type="number"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      defaultValue="10"
                      min="1"
                      aria-label="Лимит загрузки файлов"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Разрешенные типы файлов
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      defaultValue="jpg, jpeg, png, gif, pdf, doc, docx, xls, xlsx"
                      aria-label="Разрешенные типы файлов"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Настройки кэширования
                    </label>
                    <select 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      aria-label="Настройки кэширования"
                    >
                      <option value="disabled">Отключено</option>
                      <option value="basic">Базовое</option>
                      <option value="advanced">Расширенное</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Время кэширования (в минутах)
                    </label>
                    <input
                      type="number"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      defaultValue="60"
                      min="5"
                      aria-label="Время кэширования"
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="enable-logs"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      defaultChecked={true}
                    />
                    <label htmlFor="enable-logs" className="ml-2 block text-sm text-gray-900">
                      Включить логирование действий администраторов
                    </label>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
                      Очистить кэш
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
} 