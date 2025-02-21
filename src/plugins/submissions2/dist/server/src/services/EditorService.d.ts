import { Core } from '@strapi/strapi';
declare const editorService: ({ strapi }: {
    strapi: Core.Strapi;
}) => {
    getEditorsArticles: () => Promise<({
        id: import("@strapi/types/dist/data").ID;
    } & {
        [key: string]: any;
    }) | ({
        id: import("@strapi/types/dist/data").ID;
    } & {
        [key: string]: any;
    })[]>;
    getAllEditorsArticles: (query: any) => Promise<({
        id: import("@strapi/types/dist/data").ID;
    } & {
        [key: string]: any;
    }) | ({
        id: import("@strapi/types/dist/data").ID;
    } & {
        [key: string]: any;
    })[]>;
    createArticle: (data: any) => Promise<{
        id: import("@strapi/types/dist/data").ID;
    } & {
        [key: string]: any;
    }>;
    getArticleById: (id: any) => Promise<{
        id: import("@strapi/types/dist/data").ID;
    } & {
        [key: string]: any;
    }>;
    updateArticle: (id: any, data: any) => Promise<{
        id: import("@strapi/types/dist/data").ID;
    } & {
        [key: string]: any;
    }>;
    deleteArticle: (id: any) => Promise<{
        id: import("@strapi/types/dist/data").ID;
    } & {
        [key: string]: any;
    }>;
};
export default editorService;
