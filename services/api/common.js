// Common API functions
import { createMutateFetcher,createQueryFetcher } from "./utils";

// API configurations
const apiConfigs = {
    // Common
    getList: {
        url: "/api/common/list",
        method: "GET",
    },
    getDetail: {
        url: "/api/common/detail",
        method: "GET",
    },
    create: {
        url: "/api/common/create",
        method: "POST",
    },
    update: {
        url: "/api/common/update",
        method: "PUT",
    },
    delete: {
        url: "/api/common/delete",
        method: "DELETE",
    },
};

// Query fetchers
export const renderGetListFetcher = createQueryFetcher(apiConfigs.getList);
export const renderGetDetailFetcher = createQueryFetcher(apiConfigs.getDetail);

// Mutation fetchers
export const renderCreateFetcher = createMutateFetcher(apiConfigs.create);
export const renderUpdateFetcher = createMutateFetcher(apiConfigs.update);
export const renderDeleteFetcher = createMutateFetcher(apiConfigs.delete);

// Mock data for development
export const mockData = {
    users: [
        { id: 1, name: "John Doe", email: "john@example.com", role: "admin" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", role: "teacher" },
    ],
    resources: [
        { id: 1, name: "Document 1", type: "document" },
        { id: 2, name: "Video 1", type: "video" },
    ],
    notifications: [
        { id: 1, title: "Notification 1", content: "Content 1", status: "unread" },
        { id: 2, title: "Notification 2", content: "Content 2", status: "read" },
    ],
};

// Mock API functions
export const mockApi = {
    getList: async (params = {}) => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        return {
            data: mockData[params.type] || [],
            total: mockData[params.type]?.length || 0,
        };
    },
    getDetail: async (id) => {
        await new Promise((resolve) => setTimeout(resolve, 300));
        return {
            data: { id, name: `Item ${id}`, description: `Description for item ${id}` },
        };
    },
    create: async (data) => {
        await new Promise((resolve) => setTimeout(resolve, 400));
        return {
            data: { id: Date.now(), ...data },
            message: "Created successfully",
        };
    },
    update: async (data) => {
        await new Promise((resolve) => setTimeout(resolve, 400));
        return {
            data,
            message: "Updated successfully",
        };
    },
    delete: async (id) => {
        await new Promise((resolve) => setTimeout(resolve, 300));
        return {
            message: "Deleted successfully",
        };
    },
};
