# Database Seeding Instructions

This document explains how to populate your database with broker templates for CSV imports.

## Setup

1. Update your package.json to include the seed script:

```json
"scripts": {
  // ... other scripts
  "seed:brokers": "ts-node prisma/seeders/broker-templates.ts"
}
```

## Running the Seeders

To populate the database with broker templates, run:

```bash
npm run seed:brokers
```

This will:
1. Create or update broker entries for Tradovate and Interactive Brokers
2. Create import templates for each broker with the correct column mappings
3. Configure date formats and field transformations for each template

## Template Details

### Tradovate Templates

1. **Tradovate Standard Export**
   - Maps basic Tradovate CSV exports to the platform format
   - Handles standard fields like Contract, filledQty, avgPrice, etc.

2. **Tradovate Multi-bracket Export**
   - Handles Tradovate's multi-bracket order exports
   - Contains specialized mappings for entry and exit prices

### Interactive Brokers Templates

1. **Interactive Brokers Flex Query**
   - Maps IB Flex Query exports to the platform format
   - Handles IB-specific date formats and field names

2. **Interactive Brokers Activity Report**
   - Processes the Activity Report CSV format
   - Creates synthetic external IDs from symbol and timestamp

## Example CSV Formats

The templates support the CSV formats you provided, including:

### Tradovate Example
```
orderId,Account,Order ID,B/S,Contract,Product,Product Description,avgPrice,filledQty,Fill Time,lastCommandId,Status,_priceFormat,_priceFormatType,_tickSize,spreadDefinitionId,Version ID,Timestamp,Date,Quantity,Text,Type,Limit Price,Stop Price,decimalLimit,decimalStop,Filled Qty,Avg Fill Price,decimalFillAvg
65509915441,DEMO1520898,65509915441, Buy,MESM4,MES,Micro E-mini S&P 500,5068.5,1,04/23/2024 09:11:54,65509915452, Filled,-2,0,0.25,,65509915452,04/23/2024 09:05:23,4/23/24,1,multibracket, Stop,,5068.50,,5068.5,1,5068.50,5068.5
```

### Interactive Brokers Example
```
ClientAccountID,AccountAlias,Model,CurrencyPrimary,AssetClass,SubCategory,Symbol,Description,Conid,SecurityID,SecurityIDType,CUSIP,ISIN,FIGI,ListingExchange,UnderlyingConid,UnderlyingSymbol,UnderlyingSecurityID,UnderlyingListingExchange,Issuer,Multiplier,Strike,Expiry,Put/Call,PrincipalAdjustFactor,TransactionType,TradeID,OrderID,ExecID,BrokerageOrderID,OrderReference,VolatilityOrderLink,ClearingFirmID,OrigTradePrice,OrigTradeDate,OrigTradeID,ExtExecID,BlockID,OrderTime,Date/Time,ReportDate,SettleDate,TradeDate,Exchange,Buy/Sell,Quantity,Price,Amount,Proceeds,NetCash,Commission,BrokerExecutionCommission,BrokerClearingCommission,ThirdPartyExecutionCommission,ThirdPartyClearingCommission,ThirdPartyRegulatoryCommission,OtherCommission,CommissionCurrency,Tax,Code,OrderType,LevelOfDetail,TraderID,IsAPIOrder,AllocatedTo,AccruedInterest,RFQID,SerialNumber,DeliveryType,CommodityType,Fineness,Weight
U2102003,,,USD,STK,COMMON,A,AGILENT TECHNOLOGIES INC,1715006,US00846U1016,ISIN,00846U101,US00846U1016,,NYSE,,,,,,1,,,,,ExchTrade,3831720107,1933363253,0000d3be.60bf7771.01.01,0020b459.0001974d.60bef3c6.0001,,,,0,,,1003X1100515169,0,20210608;121957,20210608;122001,20210608,20210610,20210608,ZERO,BUY,1,138.41,138.41,-138.41,-138.41,0,0,0,0,0,0,0,USD,0,O,LMT,EXECUTION,,N,,0,,,,,0,0.0
```

## Adding More Templates

To add templates for other brokers:

1. Add the broker to the `ensureBroker` section of the seeder
2. Create a new template with `ensureTemplate`
3. Define the column mappings based on the broker's CSV format
4. Run the seeder to add the new template to the database
