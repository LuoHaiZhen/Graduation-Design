export interface TypeNav {
  code: number;
  message: string;
  data: Array<any>;
}

/* export interface categorylist{
    [categorylist: string]:category
}
 interface category {
   
    categoryChild: Array<categoryChild1>;
    categoryId: number;
    categoryName: string;
  
}
interface categoryChild1 {
  categoryChild: Array<categoryChild2>;
  categoryId: number;
  categoryName: string;
}
interface categoryChild2 {
  categoryId: number;
  categoryName: string;
} */
/* 
[
    {
        [
            {       
                [
                    number,
                    string
                ],
                number,
                string
            }   
        ].
    number
    string
    }
]

*/
export interface category{
    categoryChild:Array<category1>
    categoryId: number;
    categoryName: string;
}
interface category1{
    categoryChild:Array<category2>
    categoryId: number;
    categoryName: string;
}
interface category2{
    categoryId: number;
    categoryName: string;
}
