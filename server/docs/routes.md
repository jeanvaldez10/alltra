# MayTrade API Routes Documentation

## Base Routes

### GET /api
Base health check route.

**Returns:**
```typescript
{
  message: string // "Welcome to ~/maytrade/api"
}
```

### GET /api/logout
Logs out the current user by clearing their access token.

**Returns:**
```typescript
{
  message: string // "Logout successful"
}
```

### POST /api/contact
Submit a contact form request.

**Request Body:**
```typescript
{
  name: string,
  email: string,
  phone: string,
  message: string,
  reason: number
}
```

**Returns:**
```typescript
{
  message: string,
  code: number,
  data?: {
    name: string,
    email: string,
    phone: string,
    message: string,
    reason: number
  }
}
```

## Trading Routes

### GET /api/trade
Trading API health check.

**Returns:**
```typescript
{
  status: string, // "operational"
  message: string, // "MayTrade Trading API is running"
  code: number
}
```

### Trade Analytics Routes

#### GET /api/trade/analytics/overview
Get overview statistics for trades.

**Query Parameters:**
```typescript
{
  startDate?: string, // ISO date string
  endDate?: string, // ISO date string
  account?: string,
  broker?: string,
  symbol?: string
}
```

**Returns:**
```typescript
{
  data: {
    totalTrades: number,
    winningTrades: number,
    losingTrades: number,
    breakEvenTrades: number,
    winRate: number,
    totalProfit: number,
    averageProfit: number,
    totalLoss: number,
    averageLoss: number,
    netProfit: number,
    profitFactor: number,
    largestWin: number,
    largestLoss: number,
    averageTradeResult: number
  },
  code: number
}
```

### Trade Management Routes

#### GET /api/trade/trades
Get all trades for a user.

**Query Parameters:**
```typescript
{
  page?: number, // default: 1
  limit?: number, // default: 20, max: 100
  sort?: string, // default: "date"
  order?: "asc" | "desc", // default: "desc"
  startDate?: string,
  endDate?: string,
  symbol?: string,
  broker?: string,
  account?: string,
  tradeType?: string,
  minProfit?: number,
  maxProfit?: number
}
```

**Returns:**
```typescript
{
  data: {
    trades: Array<{
      id: string,
      userId: string,
      symbol: string,
      quantity: number,
      entryPrice: number,
      exitPrice: number,
      date: Date,
      exitDate: Date,
      tradeType: string,
      profit: number,
      broker: {
        name: string,
        logo: string
      },
      account: {
        name: string,
        accountNumber: string
      }
    }>,
    total: number,
    page: number,
    limit: number,
    totalPages: number
  },
  code: number
}
```

### Trade Import Routes

#### GET /api/trade/import/templates
Get available import templates for brokers.

**Returns:**
```typescript
{
  data: Array<{
    id: string,
    name: string,
    templates: Array<{
      id: string,
      name: string,
      description: string,
      requiredColumns: string[],
      dateFormat: string,
      columnMappings: Object
    }>
  }>,
  code: number
}
```

#### POST /api/trade/import/file
Import trades from a file.

**Request Body (multipart/form-data):**
```typescript
{
  file: File, // CSV or Excel file
  brokerId: string,
  accountId: string,
  templateId?: string
}
```

**Returns:**
```typescript
{
  message: string,
  data: {
    importedTrades: number,
    importTime: Date
  },
  code: number
}
```

### Broker Connection Routes

#### POST /api/trade/brokers/tradovate/auth
Authenticate with Tradovate broker.

**Request Body:**
```typescript
{
  username: string,
  password: string
}
```

**Returns:**
```typescript
{
  message: string,
  code: number,
  data: {
    connected: boolean,
    accountInfo: any
  }
}
```

#### GET /api/trade/brokers/tradovate/accounts
Get Tradovate accounts for authenticated user.

**Returns:**
```typescript
{
  data: Array<{
    id: string,
    name: string,
    accountNumber: string
    // Additional account information
  }>,
  code: number
}
```

#### POST /api/trade/connect/settings/:brokerId
Update auto-sync settings for a broker connection.

**Request Body:**
```typescript
{
  autoSync: boolean,
  syncInterval?: number // minutes between syncs
}
```

**Returns:**
```typescript
{
  message: string,
  code: number
}
```

## Chat & Messaging Routes

### GET /api/chat/members
Get all chat members and their online status.

**Returns:**
```typescript
Array<{
  id: string,
  name: string,
  avatar?: string,
  status: "online" | "offline",
  bio?: string,
  roles: number[]
}>
```

### GET /api/direct/friends
Get user's friends list.

**Returns:**
```typescript
{
  friends: Array<{
    name: string,
    avatar: string,
    date: Date,
    id: string
  }>
}
```

### POST /api/chat/channel/[id]/message
Send a message in a channel.

**Request Body:**
```typescript
{
  content: string,
  channel: string
}
```

**Returns:**
```typescript
{
  message: string,
  code: number,
  data?: {
    id: string,
    content: string,
    channel: string,
    author: {
      id: string,
      name: string
    },
    createdAt: Date
  }
}
```

Note: All routes except `/api/contact` require authentication via a JWT token in the `Authorization` header or `access_token` cookie. Unauthorized requests will receive a 401 status code.