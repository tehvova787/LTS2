import React from 'react';
import '../../styles/landing-page.css';

const LandingPage: React.FC<{ onEnterMetaverse: () => void }> = ({ onEnterMetaverse }) => {
  return (
    <div className="landing-page">
      <div className="landing-content">
        <header>
          <h1>Добро пожаловать в LuckyVerse</h1>
          <p className="subtitle">
            Погрузитесь в уникальную метавселенную, где путешествия и прибыль сливаются воедино. 
            Станьте частью революционной экосистемы на базе TON, где каждый может стать успешным 
            путешественником в мире цифровых активов.
          </p>
        </header>

        <section className="news-section">
          <div className="news-card">
            <h2>ПОСЛЕДНИЕ НОВОСТИ</h2>
            <div className="news-item">
              <p className="news-text">
                The launch of the virtual world LuckyTrain is anticipated soon — a unique platform that will open doors to the exciting world of the crypto industry. Prepare for unforgettable adventures where innovations and technologies merge, creating a space for new opportunities and discoveries.
              </p>
            </div>
          </div>
        </section>

        <section className="components-section">
          <h2>ОСНОВНЫЕ КОМПОНЕНТЫ</h2>
          <div className="components-grid">
            <div className="component-card">
              <div className="component-icon">🚂</div>
              <h3>Ядро метавселенной</h3>
              <ul>
                <li>Полностью децентрализованная экосистема на блокчейне TON</li>
                <li>Интеграция с Telegram Mini-App для максимальной доступности</li>
                <li>Собственный токен TrainCoin с дефляционной моделью</li>
              </ul>
            </div>

            <div className="component-card">
              <div className="component-icon">🤖</div>
              <h3>AI система</h3>
              <ul>
                <li>Умные NPC для интерактивного взаимодействия</li>
                <li>Персонализированные рекомендации маршрутов</li>
                <li>Адаптивные игровые сценарии</li>
              </ul>
            </div>

            <div className="component-card">
              <div className="component-icon">⚡</div>
              <h3>Физический движок</h3>
              <ul>
                <li>Реалистичная симуляция движения поездов</li>
                <li>Динамическое взаимодействие с окружением</li>
                <li>Физика частиц для спецэффектов</li>
              </ul>
            </div>

            <div className="component-card">
              <div className="component-icon">🎨</div>
              <h3>Система рендеринга</h3>
              <ul>
                <li>Высококачественная графика в реальном времени</li>
                <li>Оптимизация для различных устройств</li>
                <li>Поддержка VR/AR технологий</li>
              </ul>
            </div>

            <div className="component-card">
              <div className="component-icon">🌐</div>
              <h3>Сетевой менеджер</h3>
              <ul>
                <li>Бесшовное многопользовательское взаимодействие</li>
                <li>Синхронизация в реальном времени</li>
                <li>Защищенные P2P соединения</li>
              </ul>
            </div>

            <div className="component-card">
              <div className="component-icon">📊</div>
              <h3>Система событий</h3>
              <ul>
                <li>Динамические ивенты и квесты</li>
                <li>Регулярные турниры и соревнования</li>
                <li>Специальные сезонные мероприятия</li>
              </ul>
            </div>

            <div className="component-card">
              <div className="component-icon">🌍</div>
              <h3>Генератор окружения</h3>
              <ul>
                <li>Процедурная генерация уникальных локаций</li>
                <li>Динамическая смена погоды и времени суток</li>
                <li>Интерактивные элементы ландшафта</li>
              </ul>
            </div>

            <div className="component-card">
              <div className="component-icon">🤝</div>
              <h3>Система взаимодействия</h3>
              <ul>
                <li>Торговля между игроками</li>
                <li>Создание альянсов и гильдий</li>
                <li>Социальные механики и чат</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="features-section">
          <h2>ВОЗМОЖНОСТИ</h2>
          <div className="features-container">
            <div className="features-block">
              <h3>✨ Игровые механики</h3>
              <ul>
                <li>Процедурная генерация мира</li>
                <li>AI-управляемые NPC</li>
                <li>Физическая симуляция</li>
                <li>Многопользовательское взаимодействие</li>
                <li>Настраиваемые аватары</li>
                <li>Реалистичные диалоги</li>
                <li>Динамическое окружение</li>
                <li>Система инвентаря</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="roadmap-section">
          <h2>ПЛАНЫ РАЗВИТИЯ</h2>
          <div className="roadmap-container">
            <div className="roadmap-block">
              <h3>🎯 Ближайшие обновления</h3>
              <ul>
                <li>Система квестов</li>
                <li>Внутриигровая экономика</li>
                <li>Система достижений</li>
                <li>Редактор мира</li>
                <li>Система крафтинга</li>
                <li>Погодные эффекты</li>
                <li>Смена дня и ночи</li>
                <li>Мультиязычная поддержка</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="join-section">
          <h2>ПРИСОЕДИНЯЙТЕСЬ К ПУТЕШЕСТВИЮ</h2>
          <p>
            Станьте частью революционной метавселенной LuckyVerse уже сегодня! 
            Создавайте, исследуйте, зарабатывайте и общайтесь в мире безграничных возможностей.
          </p>
          <div className="cta-buttons">
            <button className="primary-button" onClick={onEnterMetaverse}>
              Начать путешествие
            </button>
            <button className="secondary-button">
              Whitepaper
            </button>
            <button className="secondary-button">
              Присоединиться к сообществу
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LandingPage; 