# Quick Fix: Collection ID Issue

## Problem
Your `projectsCollectionId` in the config file is set to `'projects'` (the name), but it needs to be the actual Collection ID (a long alphanumeric string).

## How to Find Your Collection ID

1. Go to: https://cloud.appwrite.io
2. Click on your **Portfolio** project
3. Click **"Databases"** in left sidebar
4. Click on **"PortfolioDB"**
5. Click on your **"projects"** table/collection
6. Look for the Collection ID - it should look like: `68ed8abc123def456789`
7. Copy this ID

## How to Fix

1. Open `src/config/appwrite.js` in VS Code
2. Replace this line:
   ```javascript
   projectsCollectionId: 'projects',
   ```
   
   With:
   ```javascript
   projectsCollectionId: 'YOUR_ACTUAL_COLLECTION_ID_HERE',
   ```

3. Save the file
4. Refresh your browser and try logging in again

## Example

Your config should look like this:
```javascript
export const appwriteConfig = {
  endpoint: 'https://cloud.appwrite.io/v1',
  projectId: '68ed8a8f0032cd3c025c',              // ✅ Looks correct
  databaseId: '68ed8ab9002eb2e1dbf8',             // ✅ Looks correct
  projectsCollectionId: 'YOUR_COLLECTION_ID',     // ❌ Fix this!
  storageId: '68ed8c6f00079b6e068e',              // ✅ Looks correct
};
```

All IDs should be long alphanumeric strings, not simple names like 'projects'.
