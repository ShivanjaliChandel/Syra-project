# VTEX Real API Integration Setup

## Overview
This application now uses **real VTEX API integration** for all cart and product functionality. No fallback mode is available.

## Required Setup

### Step 1: Get VTEX API Credentials

1. **Go to your VTEX account** at https://vtex.com/
2. **Log in** with your VTEX account credentials
3. **Navigate to Account Settings** → **API** → **Create new app**

### Step 2: Create API App
1. **Click "Create new app"**
2. **Fill in the app details:**
   - App Name: `Cart Integration` (or any name you prefer)
   - Description: `API for cart and checkout functionality`
3. **Select the required permissions:**
   - `checkout-pub` (for cart operations)
   - `catalog-system-pub` (for product search)
   - `search-api` (for product search)
4. **Click "Create"**

### Step 3: Get Your Credentials
After creating the app, you'll get:
- **App Key** (VTEX_APP_KEY) - looks like `vtexappkey-xxxxxx`
- **App Token** (VTEX_APP_TOKEN) - a long string

### Step 4: Create Environment File
Create a `.env.local` file in your project root with:

```env
# VTEX Account and Environment
NEXT_PUBLIC_VTEX_ACCOUNT=iamtechiepartneruae
NEXT_PUBLIC_VTEX_ENVIRONMENT=vtexcommercestable

# VTEX API Credentials (REQUIRED)
VTEX_APP_KEY=your_actual_app_key_here
VTEX_APP_TOKEN=your_actual_app_token_here
```

### Step 5: Restart Development Server
After updating the credentials:
1. Stop the dev server (Ctrl+C)
2. Run `npm run dev` again

## What's Changed

### ✅ Real VTEX Integration
- **Real products** fetched from VTEX catalog
- **Real cart operations** using VTEX orderForm API
- **Real checkout** redirects to VTEX checkout
- **No fallback mode** - all operations use VTEX API

### 🔧 Modified Components
- `lib/vtex-api.ts` - Removed fallback logic
- `contexts/cart-context.tsx` - Removed fallback cart initialization
- `app/api/products/route.ts` - Removed mock data
- `app/api/vtex/cart/add/route.ts` - Uses real VTEX API
- `app/api/vtex/orderform/route.ts` - Uses real VTEX API

## Testing the Setup

### Before Setup:
- ❌ Cart operations will fail
- ❌ Product search will fail
- ❌ Checkout will not work

### After Setup:
- ✅ Add to cart works with real VTEX products
- ✅ Cart shows real product information
- ✅ Checkout redirects to real VTEX checkout page
- ✅ All cart operations work with real VTEX data

## Common Issues

### 401/403 Errors
- Check your API credentials are correct
- Verify the app has the required permissions

### 404 Errors
- Verify your account name and environment
- Check if the VTEX store has products

### Network Errors
- Check your internet connection
- Verify VTEX service status

## Need Help?

If you're still having issues:
1. Check the browser console for detailed error messages
2. Verify your VTEX account has the correct permissions
3. Ensure the environment variables are properly set
4. Make sure your VTEX store has products available

## API Endpoints Used

- **Products**: `/api/catalog_system/pub/products/search`
- **Cart**: `/api/checkout/pub/orderForm`
- **Add to Cart**: `/api/checkout/pub/orderForm/{orderFormId}/items`
- **Checkout**: `https://{account}.vtexcommercestable.com.br/checkout/` 