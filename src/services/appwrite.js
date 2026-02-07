import { Client, Account, Databases, Storage, ID, Query } from 'appwrite';
import appwriteConfig from '../config/appwrite';

class AppwriteService {
  client = new Client();
  account;
  databases;
  storage;

  constructor() {
    this.client
      .setEndpoint(appwriteConfig.endpoint)
      .setProject(appwriteConfig.projectId);
    
    this.account = new Account(this.client);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  // Authentication
  async login(email, password) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async logout() {
    try {
      return await this.account.deleteSession('current');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  }

  async createAccount(email, password, name) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        return await this.login(email, password);
      }
      return userAccount;
    } catch (error) {
      console.error('Create account error:', error);
      throw error;
    }
  }

  // Projects/Cases CRUD
  async createProject(data) {
    try {
      return await this.databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.projectsCollectionId,
        ID.unique(),
        data
      );
    } catch (error) {
      console.error('Create project error:', error);
      throw error;
    }
  }

  async getProjects() {
    try {
      const response = await this.databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.projectsCollectionId,
        [Query.orderDesc('$createdAt')]
      );
      return response.documents;
    } catch (error) {
      console.error('Get projects error:', error);
      throw error;
    }
  }

  async getProject(id) {
    try {
      return await this.databases.getDocument(
        appwriteConfig.databaseId,
        appwriteConfig.projectsCollectionId,
        id
      );
    } catch (error) {
      console.error('Get project error:', error);
      throw error;
    }
  }

  async updateProject(id, data) {
    try {
      return await this.databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.projectsCollectionId,
        id,
        data
      );
    } catch (error) {
      console.error('Update project error:', error);
      throw error;
    }
  }

  async deleteProject(id) {
    try {
      await this.databases.deleteDocument(
        appwriteConfig.databaseId,
        appwriteConfig.projectsCollectionId,
        id
      );
      return true;
    } catch (error) {
      console.error('Delete project error:', error);
      throw error;
    }
  }

  // File Storage
  async uploadFile(file) {
    try {
      const response = await this.storage.createFile(
        appwriteConfig.storageId,
        ID.unique(),
        file
      );
      return response;
    } catch (error) {
      console.error('Upload file error:', error);
      throw error;
    }
  }

  getFilePreview(fileId) {
    try {
      const result = this.storage.getFilePreview(
        appwriteConfig.storageId,
        fileId
      );
      return result.href || result.toString();
    } catch (error) {
      console.error('Get file preview error:', error);
      return null;
    }
  }

  getFileView(fileId) {
    try {
      const result = this.storage.getFileView(
        appwriteConfig.storageId,
        fileId
      );
      return result.href || result.toString();
    } catch (error) {
      console.error('Get file view error:', error);
      return null;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(
        appwriteConfig.storageId,
        fileId
      );
      return true;
    } catch (error) {
      console.error('Delete file error:', error);
      throw error;
    }
  }
}

const appwriteService = new AppwriteService();
export default appwriteService;
