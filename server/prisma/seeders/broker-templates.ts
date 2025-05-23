import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

/**
 * Seed script to populate broker templates for CSV/Excel import
 * Run this with: npx ts-node prisma/seeders/broker-templates.ts
 */
async function main() {
  try {
    console.log('Starting broker templates seeder...');
    
    // First, ensure the brokers exist
    const tradovate = await ensureBroker({
      name: 'Tradovate',
      description: 'Modern futures trading platform with commission-free days.',
      logo: '/images/brokers/tradovate-logo.png',
      apiEndpoint: 'https://demo.tradovateapi.com/v1',
      isActive: true
    });
    
    const interactiveBrokers = await ensureBroker({
      name: 'Interactive Brokers',
      description: 'Global electronic broker offering stocks, options, futures, currencies, bonds and funds.',
      logo: '/images/brokers/ib-logo.png',
      apiEndpoint: 'https://api.ibkr.com/v1/api',
      isActive: true
    });

    // Tradovate templates
    await ensureTemplate({
      name: 'Tradovate Standard Export',
      description: 'Standard CSV export from Tradovate platform',
      requiredColumns: [
        'orderId', 'Account', 'B/S', 'Contract', 'avgPrice', 
        'filledQty', 'Fill Time', 'Status'
      ],
      dateFormat: 'MM/DD/YYYY HH:mm:ss',
      columnMappings: {
        symbol: 'Contract',
        quantity: 'filledQty',
        entryPrice: 'avgPrice',
        date: 'Fill Time',
        tradeType: {
          source: 'B/S',
          mapping: {
            'Buy': 'buy',
            'Sell': 'sell'
          }
        },
        profit: {
          formula: '0', // Will be calculated after import or updated later
          description: 'Profit will be calculated based on entry and exit'
        },
        externalId: 'orderId'
      },
      brokerId: tradovate.id
    });

    await ensureTemplate({
      name: 'Tradovate Multi-bracket Export',
      description: 'CSV export for multi-bracket orders from Tradovate',
      requiredColumns: [
        'orderId', 'Account', 'Order ID', 'B/S', 'Contract', 'Product', 
        'avgPrice', 'filledQty', 'Fill Time', 'Status', 'Timestamp'
      ],
      dateFormat: 'MM/DD/YYYY HH:mm:ss',
      columnMappings: {
        symbol: 'Contract',
        quantity: 'filledQty',
        entryPrice: 'avgPrice',
        date: 'Fill Time',
        tradeType: {
          source: 'B/S',
          mapping: {
            'Buy': 'buy',
            ' Buy': 'buy',
            'Sell': 'sell',
            ' Sell': 'sell'
          }
        },
        profit: {
          formula: '0', // Will be calculated after import
          description: 'Profit will be calculated based on entry and exit'
        },
        externalId: 'Order ID'
      },
      brokerId: tradovate.id
    });

    // Interactive Brokers templates
    await ensureTemplate({
      name: 'Interactive Brokers Flex Query',
      description: 'Standard CSV export from Interactive Brokers Flex Query',
      requiredColumns: [
        'ClientAccountID', 'Symbol', 'Quantity', 'Price', 
        'Date/Time', 'Buy/Sell', 'Commission'
      ],
      dateFormat: 'YYYYMMDD;HHmmss',
      columnMappings: {
        symbol: 'Symbol',
        quantity: 'Quantity',
        entryPrice: 'Price',
        date: 'Date/Time',
        tradeType: {
          source: 'Buy/Sell',
          mapping: {
            'BUY': 'buy',
            'SELL': 'sell'
          }
        },
        profit: {
          formula: '0', // Will be calculated after import
          description: 'Profit will be calculated based on entry and exit'
        },
        commission: 'Commission',
        externalId: 'TradeID'
      },
      brokerId: interactiveBrokers.id
    });

    await ensureTemplate({
      name: 'Interactive Brokers Activity Report',
      description: 'CSV export from Interactive Brokers Activity Report',
      requiredColumns: [
        'Symbol', 'Date/Time', 'Quantity', 'Price', 'Commission', 'Buy/Sell'
      ],
      dateFormat: 'YYYY-MM-DD, HH:mm:ss',
      columnMappings: {
        symbol: 'Symbol',
        quantity: 'Quantity',
        entryPrice: 'Price',
        date: 'Date/Time',
        tradeType: {
          source: 'Buy/Sell',
          mapping: {
            'BUY': 'buy',
            'SELL': 'sell'
          }
        },
        profit: {
          formula: '0', // Will be calculated after import
          description: 'Profit will be calculated based on entry and exit'
        },
        commission: 'Commission',
        externalId: {
          formula: 'Symbol + Date/Time',
          description: 'Creating a unique ID from symbol and timestamp'
        }
      },
      brokerId: interactiveBrokers.id
    });
    
    console.log('Broker templates seeded successfully!');
  } catch (error) {
    console.error('Error seeding broker templates:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

/**
 * Ensure a broker exists in the database
 */
async function ensureBroker(brokerData) {
  const existingBroker = await prisma.broker.findFirst({
    where: { name: brokerData.name }
  });
  
  if (existingBroker) {
    console.log(`Broker ${brokerData.name} already exists, updating...`);
    return await prisma.broker.update({
      where: { id: existingBroker.id },
      data: brokerData
    });
  } else {
    console.log(`Creating new broker: ${brokerData.name}`);
    return await prisma.broker.create({
      data: brokerData
    });
  }
}

/**
 * Ensure a template exists in the database
 */
async function ensureTemplate(templateData) {
  const existingTemplate = await prisma.importTemplate.findFirst({
    where: { 
      name: templateData.name,
      brokerId: templateData.brokerId
    }
  });
  
  if (existingTemplate) {
    console.log(`Template ${templateData.name} already exists, updating...`);
    return await prisma.importTemplate.update({
      where: { id: existingTemplate.id },
      data: templateData
    });
  } else {
    console.log(`Creating new template: ${templateData.name}`);
    return await prisma.importTemplate.create({
      data: templateData
    });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
