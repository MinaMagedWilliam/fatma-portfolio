# Login Troubleshooting Checklist

You're getting "Invalid email or password" - let's fix this step by step.

## Step 1: Verify User Exists in Appwrite

1. Go to: https://cloud.appwrite.io
2. Click on your **Portfolio** project
3. Click **"Auth"** in the left sidebar
4. **Do you see any users in the list?**
   - ✅ YES → Go to Step 2
   - ❌ NO → You need to create a user first! See "Creating a User" below

## Step 2: Verify Platform Configuration

1. In Appwrite Console, click **"Settings"** in left sidebar
2. Scroll to **"Platforms"** section
3. **Do you see a Web platform with hostname `localhost`?**
   - ✅ YES → Go to Step 3
   - ❌ NO → Add it now (see APPWRITE_SETUP.md Step 6)

## Step 3: Check Browser Console

1. Open your browser (where you're trying to log in)
2. Press **F12** to open Developer Tools
3. Click the **"Console"** tab
4. Try logging in again
5. **What errors do you see?**
   - "Origin not allowed" → Platform not configured correctly
   - "User (role: guests) missing scope (account)" → User not created
   - "Invalid credentials" → Wrong email or password
   - "Collection 'projects' not found" → Collection ID is wrong
   - No errors → The error is caught somewhere else

## Step 4: Test with Console

Let's test if your credentials work in the Appwrite Console:

1. Go to Appwrite Console → **Auth**
2. Find your user in the list
3. Click on the user
4. **Verify:**
   - Email is correct
   - Status is "Active" (not disabled)
   - No special characters in email/password

## Creating a User (if you haven't)

1. Appwrite Console → **Auth**
2. Click **"Create User"**
3. Fill in:
   ```
   Email: test@example.com
   Password: Test123456!
   Name: Test Admin
   ```
4. Click **"Create"**
5. Try logging in with: `test@example.com` / `Test123456!`

## Testing with Different Credentials

Try creating a simple test user:

**In Appwrite Console (Auth → Create User):**
- Email: `admin@test.com`
- Password: `password123`
- Name: `Admin`

**Then try logging in with:**
- Email: `admin@test.com`
- Password: `password123`

## Common Mistakes

❌ **Using the wrong email format**
- Make sure it's a valid email: `user@example.com`
- Not just: `user` or `admin`

❌ **Password too short**
- Must be at least 8 characters
- `Test123!` ✅
- `test` ❌

❌ **User not created in Auth section**
- Creating a user in your app doesn't work yet (we didn't add that feature)
- You MUST create it in Appwrite Console → Auth

❌ **Platform not configured**
- Must add `localhost` as Web platform in Settings → Platforms

## Next Steps

After checking all the above:

1. **Tell me what you see in the browser console** (F12 → Console tab)
2. **Confirm you created a user in Appwrite Auth** and can see it in the list
3. **Try with the test credentials** I provided above

This will help me identify the exact issue!
