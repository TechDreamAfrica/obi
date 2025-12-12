# Fixing 404 Error on Login Page

## Quick Fixes (Try These First)

### 1. Hard Refresh Browser
Press **Ctrl+Shift+R** (Windows/Linux) or **Cmd+Shift+R** (Mac)
- This clears the cache and reloads fresh

### 2. Clear Browser Cache
1. Press **F12** to open DevTools
2. Right-click the Reload button
3. Select "Empty cache and hard reload"

### 3. Restart Live Server
1. Stop the current server
2. Kill the process: `pkill -f "live-server"`
3. Restart: Look for a "Go Live" button in VS Code (bottom right)

## Diagnostic Steps

### Step 1: Check Network Tab
1. Press **F12** to open DevTools
2. Click **Network** tab
3. Reload the page (F5)
4. Look for any requests with **red 404 status**
5. Note which file is returning 404

### Step 2: Common 404 Files
These would indicate the issue:
- `auth-service.js` → File path wrong
- `firebase-config.js` → File path wrong  
- `google-drive-utils.js` → Only affects News, Gallery, etc. (NOT login)

### Step 3: Check File Paths
All these files should exist:
```
✓ /dashboard/login.html
✓ /dashboard/assets/js/auth-service.js
✓ /assets/js/firebase-config.js
```

## Root Cause Analysis

### If You See 404 for `auth-service.js`
**Problem:** Path is wrong
**Solution:** The import in login.html should be:
```javascript
import { loginUser } from './assets/js/auth-service.js';
```

### If You See 404 for `firebase-config.js`
**Problem:** Path from auth-service.js is wrong
**Solution:** The import in auth-service.js should be:
```javascript
import { auth as firebaseAuth, db as firebaseDb } from '../../assets/js/firebase-config.js';
```

### If You See 404 for something else
**Check:** What exactly is the 404? Look in Network tab

## Manual File Verification

Run this in terminal to verify all files exist:
```bash
ls -la /workspaces/obi/dashboard/login.html
ls -la /workspaces/obi/dashboard/assets/js/auth-service.js
ls -la /workspaces/obi/assets/js/firebase-config.js
```

All three should show file sizes, not "No such file"

## If Problem Persists

1. **Check console errors** (F12 → Console tab)
2. **Look for JavaScript errors** - Red errors in console
3. **Try a different browser** - Firefox, Chrome, Safari
4. **Disable extensions** - Ad blockers can interfere
5. **Check network** - F12 → Network → Check timing

## What We Know Works

✅ Files exist in the right locations
✅ No JavaScript syntax errors
✅ All imports are correctly structured
✅ Firebase configuration is in place
✅ Auth service exports the right functions

## The Fix

**99% of the time, the issue is:**
1. Stale browser cache
2. Live Server not restarted
3. Wrong server address (use correct port)

**Solution:**
1. Hard refresh (Ctrl+Shift+R)
2. Restart Live Server
3. Check you're using the right URL (usually http://localhost:5500)

---

Still having issues? Please share:
1. The exact 404 error message
2. Which file is showing 404 in Network tab
3. The full error from DevTools Console tab
