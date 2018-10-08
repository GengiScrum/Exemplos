export class Order {
    public id: number;
    public customer: string;
    public quantity: number;
    public productId: number;
    public productName: string;
}

export class OrderAddCommand {
    public customer: string;
    public quantity: number;
    public productId: number;

    constructor(order: any) {
        this.customer = order.customer;
        this.quantity = order.quantity;
        this.productId = order.product.id;
    }
}

export class OrderDeleteCommand {
    public orderIds: number[];

    constructor(selectedEntities: any) {
        this.orderIds = selectedEntities.map((order: Order) => order.id);
    }
}

export class OrderUpdateCommand {

    public id: number;
    public customer: string;
    public quantity: number;
    public productId: number;

    constructor(order: any, id: number) {
        this.id = id;
        this.customer = order.customer;
        this.quantity = order.quantity;
        this.productId = order.product.id;
    }

}
