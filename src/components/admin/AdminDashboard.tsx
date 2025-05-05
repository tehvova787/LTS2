'use client';

export default function AdminDashboard() {
  // Примеры данных для дашборда
  const stats = [
    { name: 'Пользователи', stat: '5,432', icon: '👥', change: '+3.2%' },
    { name: 'Просмотры', stat: '21,893', icon: '👁️', change: '+2.7%' },
    { name: 'Конверсия', stat: '13.2%', icon: '📈', change: '+0.5%' },
    { name: 'Доход', stat: '$21,430', icon: '💰', change: '+4.1%' },
  ];

  const recentActivity = [
    { id: 1, user: 'Александр К.', action: 'Обновил профиль', time: '2 минуты назад' },
    { id: 2, user: 'Мария С.', action: 'Добавила комментарий', time: '10 минут назад' },
    { id: 3, user: 'Иван Д.', action: 'Зарегистрировался', time: '1 час назад' },
    { id: 4, user: 'Елена В.', action: 'Сделала покупку', time: '2 часа назад' },
    { id: 5, user: 'Дмитрий П.', action: 'Обновил контент', time: '3 часа назад' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Панель управления</h1>
      
      {/* Статистические карточки */}
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.name}
            className="bg-white overflow-hidden shadow rounded-lg p-5"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0 text-2xl">{item.icon}</div>
              <div className="ml-5 w-0 flex-1">
                <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">{item.stat}</div>
                  <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                    {item.change}
                  </div>
                </dd>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Графики */}
      <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <h2 className="text-lg font-medium text-gray-900">Посещаемость сайта</h2>
            </div>
            <div className="mt-4 h-48 bg-gray-50 rounded-md border border-gray-200 flex items-center justify-center">
              <p className="text-gray-500">График посещаемости</p>
            </div>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <h2 className="text-lg font-medium text-gray-900">Активность пользователей</h2>
            </div>
            <div className="mt-4 h-48 bg-gray-50 rounded-md border border-gray-200 flex items-center justify-center">
              <p className="text-gray-500">График активности</p>
            </div>
          </div>
        </div>
      </div>

      {/* Недавняя активность */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900">Недавняя активность</h2>
        <div className="mt-4 bg-white overflow-hidden shadow rounded-lg">
          <ul className="divide-y divide-gray-200">
            {recentActivity.map((item) => (
              <li key={item.id} className="px-6 py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                    {item.user.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{item.user}</p>
                    <p className="text-sm text-gray-500 truncate">{item.action}</p>
                  </div>
                  <div className="text-sm text-gray-500">{item.time}</div>
                </div>
              </li>
            ))}
          </ul>
          <div className="px-6 py-4 border-t border-gray-200">
            <button className="text-sm font-medium text-blue-600 hover:text-blue-500">
              Показать больше
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 