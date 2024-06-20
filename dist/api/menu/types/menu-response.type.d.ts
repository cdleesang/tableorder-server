import typia from 'typia';
interface MenuCategory {
    id: number;
    name: string;
    subCategories: {
        id: number;
        name: string;
    }[];
}
export type GetMenuCategoriesResponse = MenuCategory[];
interface Menu {
    id: number;
    name: string;
    engName: string;
    price: number;
    imageUrl: string & typia.tags.Format<'url'>;
    isDisplay: boolean;
    isSoldOut: boolean;
}
export interface GetPaginatedMenusByCategory {
    totalPage: number;
    menus: Menu[];
}
interface MenuDetail extends Menu {
    description: string;
    mainOptions: {
        id: number;
        name: string;
        price: number;
    }[];
    subOptionGroups: {
        id: number;
        name: string;
        isRequired: boolean;
        multiSelectOptions?: {
            min: number;
            max: number;
        };
        subOptions: {
            id: number;
            name: string;
            price: number;
            isSoldOut: boolean;
        }[];
    }[];
}
export type GetMenuDetailById = MenuDetail;
export {};
