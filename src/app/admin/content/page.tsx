'use client';

import { useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';

export default function ContentPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('pages');

  // Пример данных о страницах
  const pages = [
    { id: 1, title: 'Главная страница', status: 'Опубликовано', author: 'Администратор', updatedAt: '2 часа назад', views: 1245 },
    { id: 2, title: 'О нас', status: 'Опубликовано', author: 'Администратор', updatedAt: '5 дней назад', views: 532 },
    { id: 3, title: 'Услуги', status: 'Опубликовано', author: 'Редактор', updatedAt: '1 неделю назад', views: 328 },
    { id: 4, title: 'Блог', status: 'Опубликовано', author: 'Редактор', updatedAt: '2 дня назад', views: 876 },
    { id: 5, title: 'Контакты', status: 'Опубликовано', author: 'Администратор', updatedAt: '3 месяца назад', views: 421 },
    { id: 6, title: 'Новый раздел', status: 'Черновик', author: 'Редактор', updatedAt: '5 часов назад', views: 0 },
  ];

  // Пример данных о постах
  const posts = [
    { id: 1, title: 'Как начать работу с нашим сервисом', status: 'Опубликовано', author: 'Мария С.', category: 'Руководства', updatedAt: '3 дня назад', comments: 12 },
    { id: 2, title: 'Топ-10 советов для новичков', status: 'Опубликовано', author: 'Дмитрий П.', category: 'Советы', updatedAt: '1 неделю назад', comments: 34 },
    { id: 3, title: 'Обновление платформы: что нового', status: 'Опубликовано', author: 'Администратор', category: 'Новости', updatedAt: '2 дня назад', comments: 8 },
    { id: 4, title: 'Планы развития на 2024 год', status: 'Черновик', author: 'Александр К.', category: 'Новости', updatedAt: '6 часов назад', comments: 0 },
    { id: 5, title: 'Интервью с экспертом', status: 'На проверке', author: 'Елена В.', category: 'Интервью', updatedAt: '1 день назад', comments: 0 },
  ];

  // Пример данных о медиафайлах
  const media = [
    { id: 1, name: 'header-image.jpg', type: 'Изображение', size: '1.2 MB', uploadedAt: '1 неделю назад', usedIn: 'Главная страница' },
    { id: 2, name: 'presentation.pdf', type: 'Документ', size: '3.5 MB', uploadedAt: '2 недели назад', usedIn: 'О нас' },
    { id: 3, name: 'product-demo.mp4', type: 'Видео', size: '24.8 MB', uploadedAt: '5 дней назад', usedIn: 'Услуги' },
    { id: 4, name: 'team-photo.png', type: 'Изображение', size: '0.8 MB', uploadedAt: '1 месяц назад', usedIn: 'О нас' },
    { id: 5, name: 'logo.svg', type: 'Изображение', size: '0.1 MB', uploadedAt: '3 месяца назад', usedIn: 'Все страницы' },
    { id: 6, name: 'background.jpg', type: 'Изображение', size: '2.4 MB', uploadedAt: '2 дня назад', usedIn: 'Главная страница' },
    { id: 7, name: 'brochure.pdf', type: 'Документ', size: '5.2 MB', uploadedAt: '1 день назад', usedIn: 'Не используется' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminHeader setSidebarOpen={setSidebarOpen} />
        
        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Управление контентом</h1>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Создать новый
            </button>
          </div>

          {/* Вкладки */}
          <div className="bg-white rounded-lg shadow mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab('pages')}
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === 'pages'
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Страницы
                </button>
                <button
                  onClick={() => setActiveTab('posts')}
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === 'posts'
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Посты
                </button>
                <button
                  onClick={() => setActiveTab('media')}
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === 'media'
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Медиафайлы
                </button>
              </nav>
            </div>
          </div>

          {/* Содержимое вкладок */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            {activeTab === 'pages' && (
              <div>
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-medium text-gray-900">Страницы сайта</h2>
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        placeholder="Поиск страниц..."
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <select className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <option value="">Статус</option>
                        <option value="published">Опубликовано</option>
                        <option value="draft">Черновик</option>
                      </select>
                    </div>
                  </div>
                </div>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Название
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Статус
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Автор
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Обновлено
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Просмотры
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Действия
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {pages.map((page) => (
                      <tr key={page.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{page.title}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            page.status === 'Опубликовано' ? 'bg-green-100 text-green-800' : 
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {page.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{page.author}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{page.updatedAt}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {page.views}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900 mr-3">Редактировать</button>
                          <button className="text-red-600 hover:text-red-900">Удалить</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'posts' && (
              <div>
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-medium text-gray-900">Посты блога</h2>
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        placeholder="Поиск постов..."
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <select className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <option value="">Категория</option>
                        <option value="news">Новости</option>
                        <option value="guides">Руководства</option>
                        <option value="tips">Советы</option>
                        <option value="interviews">Интервью</option>
                      </select>
                    </div>
                  </div>
                </div>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Название
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Статус
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Автор
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Категория
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Обновлено
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Комментарии
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Действия
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {posts.map((post) => (
                      <tr key={post.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{post.title}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            post.status === 'Опубликовано' ? 'bg-green-100 text-green-800' : 
                            post.status === 'Черновик' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {post.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{post.author}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{post.category}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{post.updatedAt}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {post.comments}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900 mr-3">Редактировать</button>
                          <button className="text-red-600 hover:text-red-900">Удалить</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'media' && (
              <div>
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-medium text-gray-900">Медиафайлы</h2>
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        placeholder="Поиск файлов..."
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <select className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <option value="">Тип файла</option>
                        <option value="image">Изображение</option>
                        <option value="document">Документ</option>
                        <option value="video">Видео</option>
                      </select>
                    </div>
                  </div>
                </div>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Название
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Тип
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Размер
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Загружено
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Используется в
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Действия
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {media.map((item) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{item.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{item.type}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{item.size}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{item.uploadedAt}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{item.usedIn}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900 mr-3">Просмотр</button>
                          <button className="text-red-600 hover:text-red-900">Удалить</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
} 