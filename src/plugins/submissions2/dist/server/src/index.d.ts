declare const _default: {
    register: ({ strapi }: {
        strapi: import("@strapi/types/dist/core").Strapi;
    }) => void;
    bootstrap: ({ strapi }: {
        strapi: import("@strapi/types/dist/core").Strapi;
    }) => void;
    destroy: ({ strapi }: {
        strapi: import("@strapi/types/dist/core").Strapi;
    }) => void;
    config: {
        default: {};
        validator(): void;
    };
    controllers: {
        controller: ({ strapi }: {
            strapi: import("@strapi/types/dist/core").Strapi;
        }) => {
            index(ctx: any): void;
            getCategories(ctx: any): Promise<any>;
            getAuthors(ctx: any): Promise<any>;
        };
        editor: ({ strapi }: {
            strapi: import("@strapi/types/dist/core").Strapi;
        }) => {
            index: (ctx: any) => Promise<void>;
            find: (ctx: any) => Promise<void>;
            submit: (ctx: any) => Promise<void>;
            getSubmission: (ctx: any) => Promise<any>;
            approveSubmission: (ctx: any) => Promise<void>;
            rejectSubmission: (ctx: any) => Promise<void>;
            deleteSubmission: (ctx: any) => Promise<any>;
        };
        contributer: ({ strapi }: {
            strapi: import("@strapi/types/dist/core").Strapi;
        }) => {
            index: (ctx: any) => Promise<void>;
            find: (ctx: any) => Promise<void>;
            submit: (ctx: any) => Promise<void>;
            getSubmission: (ctx: any) => Promise<any>;
            approveSubmission: (ctx: any) => Promise<void>;
            rejectSubmission: (ctx: any) => Promise<void>;
            deleteSubmission: (ctx: any) => Promise<any>;
            updateSubmission: (ctx: any) => Promise<void>;
        };
    };
    routes: {
        method: string;
        path: string;
        handler: string;
        config: {
            policies: any[];
            auth: boolean;
        };
    }[];
    services: {
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
    contentTypes: {
        article: {
            schema: {
                kind: string;
                collectionName: string;
                info: {
                    singularName: string;
                    pluralName: string;
                    displayName: string;
                    description: string;
                };
                options: {
                    draftAndPublish: boolean;
                };
                pluginOptions: {
                    "content-manager": {
                        visible: boolean;
                    };
                    "content-type-builder": {
                        visible: boolean;
                    };
                };
                attributes: {
                    title: {
                        type: string;
                    };
                    description: {
                        type: string;
                        maxLength: number;
                    };
                    slug: {
                        type: string;
                        targetField: string;
                    };
                    cover: {
                        type: string;
                        multiple: boolean;
                        required: boolean;
                        allowedTypes: string[];
                    };
                    author: {
                        type: string;
                        relation: string;
                        target: string;
                        inversedBy: string;
                    };
                    category: {
                        type: string;
                        relation: string;
                        target: string;
                        inversedBy: string;
                    };
                    blocks: {
                        type: string;
                        components: string[];
                    };
                    submissionStatus: {
                        type: string;
                        enum: string[];
                        default: string;
                        description: string;
                    };
                    approvalComments: {
                        type: string;
                        required: boolean;
                        description: string;
                    };
                    approvedBy: {
                        type: string;
                        relation: string;
                        target: string;
                        description: string;
                    };
                    approvalDate: {
                        type: string;
                        required: boolean;
                        description: string;
                    };
                };
            };
            kind: string;
            __schema__: {
                kind: string;
                collectionName: string;
                info: {
                    singularName: string;
                    pluralName: string;
                    displayName: string;
                    description: string;
                };
                options: {
                    draftAndPublish: boolean;
                };
                pluginOptions: {
                    "content-manager": {
                        visible: boolean;
                    };
                    "content-type-builder": {
                        visible: boolean;
                    };
                };
                attributes: {
                    title: {
                        type: string;
                    };
                    description: {
                        type: string;
                        maxLength: number;
                    };
                    slug: {
                        type: string;
                        targetField: string;
                    };
                    cover: {
                        type: string;
                        multiple: boolean;
                        required: boolean;
                        allowedTypes: string[];
                    };
                    author: {
                        type: string;
                        relation: string;
                        target: string;
                        inversedBy: string;
                    };
                    category: {
                        type: string;
                        relation: string;
                        target: string;
                        inversedBy: string;
                    };
                    blocks: {
                        type: string;
                        components: string[];
                    };
                    submissionStatus: {
                        type: string;
                        enum: string[];
                        default: string;
                        description: string;
                    };
                    approvalComments: {
                        type: string;
                        required: boolean;
                        description: string;
                    };
                    approvedBy: {
                        type: string;
                        relation: string;
                        target: string;
                        description: string;
                    };
                    approvalDate: {
                        type: string;
                        required: boolean;
                        description: string;
                    };
                };
            };
            uid: string;
            modelType: string;
            modelName: string;
            connection: string;
        };
    };
    policies: {};
    middlewares: {};
};
export default _default;
