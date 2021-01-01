export interface Transfer {
    product:number;
    location:number
    pcs:number;
    user:number;
    last_transfer:Date;
    location_name:string;
    product_name:string;
    product_index:number;
    user_name:string;

}
export function filterTransferForPacking(a:Transfer){
    if(a.pcs > 0 && a.location == 2) return a;
}
export function sortTransferForTransfer(a:Transfer, b:Transfer){
    return a.product_name.localeCompare(b.product_name);
}