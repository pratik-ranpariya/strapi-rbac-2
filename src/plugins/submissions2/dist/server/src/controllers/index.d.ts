declare const _default: {
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
export default _default;
