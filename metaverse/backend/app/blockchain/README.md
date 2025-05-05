# TON Blockchain Integration for Metaverse

Модуль интеграции метавселенной с блокчейном TON, обеспечивающий управление цифровыми активами, верификацию собственности и проведение транзакций.

## Структура модуля

- `ton_contract.py` - Содержит код смарт-контракта на языке FunC и Python-класс для взаимодействия с ним
- `ton_integration.py` - Основной интеграционный слой между метавселенной и блокчейном
- `api.py` - FastAPI эндпоинты для взаимодействия с блокчейном через HTTP API

## Установка

Для работы с TON требуются дополнительные зависимости. Установите их с помощью:

```bash
pip install pytoncenter pytonlib
```

## Конфигурация

Создайте файл `.env` в корневой директории проекта и укажите следующие параметры:

```
TON_NETWORK=testnet  # или mainnet
TON_API_KEY=your_api_key
TON_OWNER_ADDRESS=your_ton_wallet_address
TON_CONTRACT_ADDRESS=existing_contract_address  # опционально
```

## Использование

### Интеграция в основной модуль

Для интеграции в основной модуль метавселенной, импортируйте модуль blockchain и добавьте его роутер к приложению:

```python
from app.blockchain.api import router as blockchain_router

app.include_router(blockchain_router)
```

### Примеры HTTP-запросов

#### Создание нового актива

```http
POST /api/blockchain/assets
Content-Type: application/json

{
  "name": "Виртуальный участок земли",
  "description": "Участок 10x10 в центральном районе метавселенной",
  "asset_type": 1,
  "value": 1000,
  "properties": {
    "x": 150,
    "y": 230,
    "width": 10,
    "height": 10
  },
  "is_transferable": true
}
```

#### Передача актива другому владельцу

```http
POST /api/blockchain/assets/transfer
Content-Type: application/json

{
  "asset_id": 123456789,
  "from_address": "EQD1_U8MmJMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXbSBH",
  "to_address": "EQBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX--3gy"
}
```

#### Получение информации об активе

```http
GET /api/blockchain/assets/123456789
```

#### Проверка владения активом

```http
GET /api/blockchain/verify-ownership/123456789/EQD1_U8MmJMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXbSBH
```

## Смарт-контракт TON

В качестве смарт-контракта используется `MetaverseIntegration`, который обеспечивает следующую функциональность:

1. Создание цифровых активов с уникальными идентификаторами
2. Хранение метаданных активов
3. Передача прав собственности на активы
4. Верификация владения активами
5. Отслеживание истории транзакций

### Структура данных

Контракт хранит следующие данные:

- `owner_address` - адрес владельца контракта
- `asset_count` - общее количество активов
- `transactions_count` - общее количество транзакций
- `assets_dict` - словарь всех активов
- `transactions_dict` - история транзакций

### Методы контракта

- `recv_internal` - обрабатывает входящие сообщения
  - `op=1` - создание актива
  - `op=2` - передача актива
  - `op=3` - получение актива
  - `op=4` - обновление метаданных актива

### Get-методы

- `get_asset_by_id(asset_id)` - получение информации об активе по ID
- `get_assets()` - получение всех активов
- `get_transactions()` - получение истории транзакций
- `get_asset_count()` - получение количества активов
- `get_owner()` - получение адреса владельца

## Интеграция с клиентской частью метавселенной

Для интеграции с клиентской частью рекомендуется использовать [TON Connect](https://docs.ton.org/develop/dapps/ton-connect/overview) для авторизации пользователей и подписи транзакций.

### Пример интеграции с React/Next.js

```javascript
import { TonConnectButton, useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import { useTonClient } from '@ton/ton-react';

function MetaverseAssetComponent() {
  const { client } = useTonClient();
  const [tonConnectUI] = useTonConnectUI();
  const userAddress = useTonAddress();
  
  const buyAsset = async (assetId) => {
    // Взаимодействие с нашим API
    const response = await fetch('/api/blockchain/assets/transfer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        asset_id: assetId,
        from_address: 'CONTRACT_ADDRESS',
        to_address: userAddress
      })
    });
    
    // Обработка ответа
    const result = await response.json();
    console.log(result);
  };
  
  return (
    <div>
      <TonConnectButton />
      {userAddress && (
        <button onClick={() => buyAsset(123456789)}>
          Купить участок
        </button>
      )}
    </div>
  );
}
``` 