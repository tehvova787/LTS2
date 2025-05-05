'use client';

import { useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';

export default function UsersPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  // Пример данных о пользователях
  const users = [
    { id: 1, name: 'Александр Петров', email: 'alex@example.com', role: 'Пользователь', status: 'Активен', lastLogin: '2 часа назад' },
    { id: 2, name: 'Екатерина Иванова', email: 'kate@example.com', role: 'Админ', status: 'Активен', lastLogin: '5 минут назад' },
    { id: 3, name: 'Дмитрий Сидоров', email: 'dmitry@example.com', role: 'Модератор', status: 'Неактивен', lastLogin: '5 дней назад' },
    { id: 4, name: 'Ольга Смирнова', email: 'olga@example.com', role: 'Пользователь', status: 'Активен', lastLogin: '1 день назад' },
    { id: 5, name: 'Сергей Козлов', email: 'sergey@example.com', role: 'Пользователь', status: 'Заблокирован', lastLogin: '1 месяц назад' },
    { id: 6, name: 'Анна Николаева', email: 'anna@example.com', role: 'Редактор', status: 'Активен', lastLogin: '3 часа назад' },
    { id: 7, name: 'Игорь Морозов', email: 'igor@example.com', role: 'Пользователь', status: 'Активен', lastLogin: '12 часов назад' },
    { id: 8, name: 'Наталья Волкова', email: 'natalia@example.com', role: 'Пользователь', status: 'Новый', lastLogin: 'Никогда' },
  ];

  const toggleRow = (id: number) => {
    setSelectedRows((prev) => {
      if (prev.includes(id)) {
        return prev.filter(rowId => rowId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const toggleAllRows = () => {
    if (selectedRows.length === users.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(users.map(user => user.id));
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminHeader setSidebarOpen={setSidebarOpen} />
        
        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Пользователи</h1>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Добавить пользователя
            </button>
          </div>

          {/* Фильтры и поиск */}
          <div className="bg-white rounded-lg shadow mb-6 p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Поиск пользователей..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex gap-2">
                <select className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">Роль</option>
                  <option value="user">Пользователь</option>
                  <option value="admin">Админ</option>
                  <option value="moderator">Модератор</option>
                  <option value="editor">Редактор</option>
                </select>
                <select className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">Статус</option>
                  <option value="active">Активен</option>
                  <option value="inactive">Неактивен</option>
                  <option value="blocked">Заблокирован</option>
                  <option value="new">Новый</option>
                </select>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
                  Сбросить
                </button>
              </div>
            </div>
          </div>

          {/* Таблица пользователей */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                          checked={selectedRows.length === users.length && users.length > 0}
                          onChange={toggleAllRows}
                        />
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Имя
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Роль
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Статус
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Последний вход
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Действия
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id} className={selectedRows.includes(user.id) ? 'bg-blue-50' : ''}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                            checked={selectedRows.includes(user.id)}
                            onChange={() => toggleRow(user.id)}
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                            {user.name.charAt(0)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.role}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                          ${user.status === 'Активен' ? 'bg-green-100 text-green-800' : 
                            user.status === 'Неактивен' ? 'bg-yellow-100 text-yellow-800' : 
                            user.status === 'Заблокирован' ? 'bg-red-100 text-red-800' : 
                            'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.lastLogin}
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
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Показано <span className="font-medium">8</span> из <span className="font-medium">30</span> пользователей
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50">
                  Назад
                </button>
                <button className="px-3 py-1 border border-gray-300 bg-blue-50 text-blue-600 rounded-md text-sm">
                  1
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">
                  2
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">
                  3
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">
                  Вперед
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 