# VTEX Checkout Setup Guide

## Environment Variables

Create a `.env.local` file in the project root with the following variables:

```env
# VTEX Configuration
NEXT_PUBLIC_VTEX_ACCOUNT=your-vtex-account
NEXT_PUBLIC_VTEX_ENVIRONMENT=vtexcommercestable

# VTEX API Credentials (optional, for authenticated requests)
VTEX_APP_KEY=your-app-key
VTEX_APP_TOKEN=your-app-token

# Alternative variable names (for compatibility)
VTEX_ACCOUNT=your-vtex-account
VTEX_ENVIRONMENT=vtexcommercestable
VTEX_API_KEY=your-app-key
VTEX_API_TOKEN=your-app-token
```

## Testing the Setup

1. **Test VTEX Connectivity**: Visit `/api/test-vtex` to verify your VTEX configuration
2. **Add Items to Cart**: Go to any product page and click "Add to Cart"
3. **Test Checkout**: Go to `/cart` and click "Proceed to Checkout"

## Debugging

If checkout fails:

1. Check browser console for error messages
2. Check server logs for API errors
3. Verify VTEX account and environment are correct
4. Test VTEX API connectivity at `/api/test-vtex`

## How It Works

1. **Add to Cart**: Items are stored in local cart state
2. **Checkout**: When user clicks checkout:
   - Creates VTEX order form
   - Adds cart items to order form
   - Redirects to VTEX checkout page
3. **VTEX Checkout**: User completes payment on VTEX's secure checkout

## API Routes Created

- `/api/vtex/cart/add` - Add items to cart
- `/api/vtex/cart/update` - Update item quantities
- `/api/vtex/cart/remove` - Remove items from cart
- `/api/vtex/cart/clear` - Clear entire cart
- `/api/vtex/orderform` - Create order forms
- `/api/vtex/orderform/[orderFormId]` - Get specific order forms
- `/api/test-vtex` - Test VTEX connectivity 