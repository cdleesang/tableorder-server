import typia from 'typia';
export interface GetPaginatedMenusByCategoryQuery {
    page: number & typia.tags.Type<'int32'> & typia.tags.Minimum<1>;
    categoryId: number & typia.tags.Type<'int32'>;
    subCategoryId?: number & typia.tags.Type<'int32'>;
}
