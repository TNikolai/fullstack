# Quick MongoDB Setup - No Installation Required!

## Option 1: MongoDB Atlas (Recommended - Free & No Installation)

1. **Create a free MongoDB Atlas account:**
   - Go to: https://www.mongodb.com/atlas/database
   - Click "Try Free"
   - Sign up with your email

2. **Create a database:**
   - After signup, click "Build a Database"
   - Choose "M0 Sandbox" (FREE)
   - Select your preferred cloud provider and region
   - Click "Create Cluster"

3. **Set up database access:**
   - Click "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Username: `todouser`
   - Password: `todopassword123` (or generate one)
   - Database User Privileges: "Read and write to any database"
   - Click "Add User"

4. **Set up network access:**
   - Click "Network Access" in the left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Click "Confirm"

5. **Get your connection string:**
   - Click "Database" in the left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string (should look like):
     ```
     mongodb+srv://todouser:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
     ```

6. **Update your backend configuration:**
   Replace `<password>` with your actual password and update the database name to `todoapp`

## Option 2: Install MongoDB Locally (if you prefer)

Run these commands in your terminal:

```bash
# Install Homebrew (if not already installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Add Homebrew to PATH (follow the instructions after installation)
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"

# Install MongoDB
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb/brew/mongodb-community
```

## After setting up MongoDB:

1. Update `backend/.env` with your connection string
2. Run: `npm run dev`
3. Visit: http://localhost:3000

---

**Recommendation:** Use MongoDB Atlas (Option 1) - it's free, requires no installation, and works immediately!
