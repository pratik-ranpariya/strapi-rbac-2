declare const _default: {
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
export default _default;
