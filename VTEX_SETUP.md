# VTEX API Setup Guide

## Current Status
Your application is now running in **fallback mode**, which means:
- ✅ Add to cart functionality works (with demo products)
- ✅ Cart drawer opens and shows items
- ✅ Checkout button works (shows demo checkout)
- ⚠️ Real VTEX products are not being added to cart
- ⚠️ Checkout redirects to demo instead of real VTEX checkout

## To Enable Full VTEX Integration

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

### Step 4: Update Environment Variables
Edit your `.env.local` file and replace the placeholder values:

```env
NEXT_PUBLIC_VTEX_ACCOUNT=iamtechiepartneruae
NEXT_PUBLIC_VTEX_ENVIRONMENT=vtexcommercestable

# Replace these with your actual VTEX credentials
VTEX_APP_KEY=your_actual_app_key_here
VTEX_APP_TOKEN=your_actual_app_token_here
```

### Step 5: Restart Development Server
After updating the credentials:
1. Stop the dev server (Ctrl+C)
2. Run `npm run dev` again
3. The notice should disappear and real VTEX integration will work

## Testing the Setup

### Before (Fallback Mode):
- ✅ Add to cart works with demo products
- ✅ Cart shows demo items
- ✅ Checkout shows demo options

### After (Full VTEX Mode):
- ✅ Add to cart works with real VTEX products
- ✅ Cart shows real product information
- ✅ Checkout redirects to real VTEX checkout page
- ✅ All cart operations work with real VTEX data

## Common Issues

- **401/403 Errors**: Check your API credentials are correct
- **404 Errors**: Verify your account name and environment
- **Network Errors**: Check your internet connection and VTEX service status

## Need Help?

If you're still having issues:
1. Check the browser console for detailed error messages
2. Verify your VTEX account has the correct permissions
3. Ensure the environment variables are properly set
4. Make sure your VTEX store has products available

## Alternative: Continue with Fallback Mode

If you want to continue development without VTEX credentials:
- The cart will work with demo products
- You can test the UI and user flow
- Real VTEX integration will be disabled
- The notice will remain visible to remind you to set up credentials 