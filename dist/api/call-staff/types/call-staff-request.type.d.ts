import { tags } from 'typia';
export interface CallStaffBody {
    options: {
        id: number & tags.Type<'int32'>;
        title: string & tags.MaxLength<100>;
        quantity: number & tags.Type<'int32'> & tags.Minimum<1>;
    }[];
}
