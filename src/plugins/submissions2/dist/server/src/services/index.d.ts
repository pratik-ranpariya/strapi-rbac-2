declare const _default: {
    service: ({ strapi }: {
        strapi: import("@strapi/types/dist/core").Strapi;
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
    editorService: ({ strapi }: {
        strapi: import("@strapi/types/dist/core").Strapi;
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
    contributerService: ({ strapi }: {
        strapi: import("@strapi/types/dist/core").Strapi;
    }) => {
        getContributersArticles: () => Promise<({
            id: import("@strapi/types/dist/data").ID;
        } & {
            [key: string]: any;
        }) | ({
            id: import("@strapi/types/dist/data").ID;
        } & {
            [key: string]: any;
        })[]>;
        getAllContributersArticles: (query: any) => Promise<({
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
};
export default _default;
