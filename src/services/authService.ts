// Mock authentication service - would be replaced with actual API calls in a real application

import { User } from '../types/user';

// Helper function to simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock user data
const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123', // In a real app, passwords would be hashed and never stored in code
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
  },
];

export const authService = {
  async login(email: string, password: string): Promise<Omit<User, 'password'>> {
    await delay(800); // Simulate network delay
    
    const user = MOCK_USERS.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    // Store token in localStorage (in a real app, this would be a JWT from the server)
    localStorage.setItem('token', 'mock-jwt-token');
    localStorage.setItem('userId', user.id);
    
    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },
  
  async signup(name: string, email: string, password: string): Promise<Omit<User, 'password'>> {
    await delay(800); // Simulate network delay
    
    // Check if user with this email already exists
    if (MOCK_USERS.some(u => u.email === email)) {
      throw new Error('User with this email already exists');
    }
    
    // Create new user
    const newUser: User = {
      id: String(MOCK_USERS.length + 1),
      name,
      email,
      password,
    };
    
    // In a real app, this would be an API call to create the user
    MOCK_USERS.push(newUser);
    
    // Store token in localStorage
    localStorage.setItem('token', 'mock-jwt-token');
    localStorage.setItem('userId', newUser.id);
    
    // Return user without password
    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  },
  
  async getCurrentUser(): Promise<Omit<User, 'password'> | null> {
    await delay(300); // Simulate network delay
    
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    
    if (!token || !userId) {
      return null;
    }
    
    const user = MOCK_USERS.find(u => u.id === userId);
    
    if (!user) {
      return null;
    }
    
    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },
  
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  },
};