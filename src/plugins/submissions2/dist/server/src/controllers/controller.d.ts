import type { Core } from '@strapi/strapi';
declare const controller: ({ strapi }: {
    strapi: Core.Strapi;
}) => {
    index(ctx: any): void;
    getCategories(ctx: any): Promise<any>;
    getAuthors(ctx: any): Promise<any>;
};
export default controller;
