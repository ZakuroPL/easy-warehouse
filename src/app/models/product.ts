export interface Product {
    id:number;
    index:number;
    name:string;
    ean:number;

}
export function sortProduct(a:Product, b:Product){
    return a.name.localeCompare(b.name);
}