import typia from 'typia';

export interface GetPaginatedMenusByCategoryQuery {
  /** 조회할 페이지 */
  page: number & typia.tags.Type<'int32'> & typia.tags.Minimum<1>;

  /** 대분류 카테고리 아이디 */
  categoryId: number & typia.tags.Type<'int32'>;

  /** 중분류 카테고리 아이디 */
  subCategoryId: number & typia.tags.Type<'int32'>;
}