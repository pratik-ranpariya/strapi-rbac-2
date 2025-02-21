import type { Core } from '@strapi/strapi';
declare const service: ({ strapi }: {
    strapi: Core.Strapi;
}) => {
    getWelcomeMessage(): string;
    getAllUsers(): Promise<({
        id: import("@strapi/types/dist/data").ID;
    } & {
        [key: string]: any;
    }) | ({
        id: import("@strapi/types/dist/data").ID;
    } & {
        [key: string]: any;
    })[]>;
    getAllCategories(): Promise<({
        id: import("@strapi/types/dist/data").ID;
    } & {
        [key: string]: any;
    }) | ({
        id: import("@strapi/types/dist/data").ID;
    } & {
        [key: string]: any;
    })[]>;
    getAllArticles(): Promise<({
        id: import("@strapi/types/dist/data").ID;
    } & {
        [key: string]: any;
    }) | ({
        id: import("@strapi/types/dist/data").ID;
    } & {
        [key: string]: any;
    })[]>;
    getAllAuthors(): Promise<({
        id: import("@strapi/types/dist/data").ID;
    } & {
        [key: string]: any;
    }) | ({
        id: import("@strapi/types/dist/data").ID;
    } & {
        [key: string]: any;
    })[]>;
};
export default service;
