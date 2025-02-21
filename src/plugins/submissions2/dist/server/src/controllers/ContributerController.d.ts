import { Core } from '@strapi/strapi';
declare const contributerController: ({ strapi }: {
    strapi: Core.Strapi;
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
export default contributerController;
