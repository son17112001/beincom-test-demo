import fs from 'fs';
import path from 'path';

const USERS_FILE = path.join(process.cwd(), 'data', 'users.json');

export const readUsers = () => {
  try {
    if (!fs.existsSync(USERS_FILE)) {
      const dir = path.dirname(USERS_FILE);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      const defaultUsers = [
        {
          id: 1,
          email: 'admin@example.com',
          password: 'password',
          name: 'Admin User',
          role: 'admin',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];
      fs.writeFileSync(USERS_FILE, JSON.stringify(defaultUsers, null, 2));
      return defaultUsers;
    }

    const data = fs.readFileSync(USERS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading users file:', error);
    return [];
  }
};

export const writeUsers = (users) => {
  try {
    const dir = path.dirname(USERS_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error('Error writing users file:', error);
    throw error;
  }
};

export const addUser = (userData) => {
  const users = readUsers();

  const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;

  const newUser = {
    id: newId,
    ...userData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  users.push(newUser);
  writeUsers(users);

  return newUser;
};

export const findUserByEmail = (email) => {
  const users = readUsers();
  return users.find(user => user.email === email) || null;
};

export const findUserById = (id) => {
  const users = readUsers();
  return users.find(user => user.id === id) || null;
};

export const updateUser = (id, updateData) => {
  const users = readUsers();
  const userIndex = users.findIndex(user => user.id === id);

  if (userIndex === -1) {
    return null;
  }

  users[userIndex] = {
    ...users[userIndex],
    ...updateData,
    updatedAt: new Date().toISOString()
  };

  writeUsers(users);
  return users[userIndex];
};

export const deleteUser = (id) => {
  const users = readUsers();
  const userIndex = users.findIndex(user => user.id === id);

  if (userIndex === -1) {
    return false;
  }

  users.splice(userIndex, 1);
  writeUsers(users);
  return true;
};

export const getAllUsers = () => {
  return readUsers();
};
