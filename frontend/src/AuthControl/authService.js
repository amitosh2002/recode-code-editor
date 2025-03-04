import { account, teams } from "./appwriteConfig";

// Login function
export const login = async (email, password) => {
    try {
        console.log("Attempting login with:", email);
        
        // FIX: Use `createSession()` instead of `createEmailSession()`
        const session = await account.createSession(email, password);
        
        console.log("Login successful! Session:", session);
        return session;
    } catch (error) {
        console.error("Login failed:", error);
        
        if (error.code === 401) {
            console.log("Invalid credentials. Please check email and password.");
        }

        throw error;
    }
};





// Logout function
export const logout = async () => {
    try {
        await account.deleteSession('current'); 
        localStorage.removeItem("session"); // Clear local storage
        console.log("User logged out successfully!");
    } catch (error) {
        console.error("Logout failed:", error);
        throw error;
    }
};


// Get logged-in user details
export const getUser = async () => {
    try {
        const session = await account.getSession('current'); // Get active session
        if (!session) {
            console.log("No active session found.");
            return null;
        }

        console.log("User session found:", session);
        return { userId: session.userId, providerUid: session.providerUid }; // Return user ID
    } catch (error) {
        if (error.code === 401) {
            console.log("User session expired. Logging out...");
            await logout(); // Clear session
        } else {
            console.error("Error fetching user session:", error);
        }
        return null;
    }
};



// Check if user is admin (using Appwrite Teams)
export const isAdmin = async () => {
  try {
    const user = await account.get();
    const teamId = "67c455d500368acc7fe6"; // Create an Admin Team in Appwrite & get ID
    const teamList = await teams.listMemberships(teamId);
    
    const isAdmin = teamList.memberships.some(member => member.userId === user.$id);
    return isAdmin;
  } catch (error) {
    console.error("Admin check failed:", error);
    return false;
  }
};

export const createAccount = async (email, password, name) => {
  try {
    const userAccount = await account.create(
      "unique()", // Generate a unique user ID
      email,
      password,
      name
    );
    return userAccount;
  } catch (error) {
    console.error("Account creation failed:", error);
    throw error;
  }
};