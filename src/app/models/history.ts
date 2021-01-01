export interface History {
    product:number;
    locationFrom:number
    locationTo:number;
    pcs:number;
    user:number;
    date_transfer:Date;
    location_name_from:string;
    Location_name_to:string;
    product_name:string;
    product_index:number;
    user_name:string;
}
export function sortHistory(a:History, b:History){
    var c:any = new Date(a.date_transfer);
    var d:any = new Date(b.date_transfer);
    return d-c;
}
