export class Product {
    public id: number;
    public name: string;
    public sale: number;
    public expense: number;
    public isAvailable: boolean;
    public manufacture: string;
    public expiration: string;

    public getResult(): number {
        return this.expense - this.sale;
    }

    public getExpirateDate(): number {
        const millisecondsInADay: number = 86400000;

        return Math.ceil(Math.abs(new Date(this.expiration).getTime() - new Date(this.manufacture).getTime()) / millisecondsInADay);
    }
    public setZone(): void {
        this.manufacture = this.setTimeZoneHours(this.manufacture);
        this.expiration = this.setTimeZoneHours(this.expiration);
    }

    private setTimeZoneHours(date: string): string {
        const timeZone: number = 3;
        const dateZone: Date = new Date(date);
        dateZone.setHours(dateZone.getHours() + timeZone);

        return dateZone.toISOString();
    }
}

export class ProductAddCommand {
    public name: string;
    public sale: number;
    public expense: number;
    public isAvailable: boolean;
    public manufacture: string;
    public expiration: string;

    constructor(product: Product) {
        this.name = product.name;
        this.sale = product.sale;
        this.expense = product.expense;
        this.isAvailable = product.isAvailable;
        const timeZone: number = 3;
        this.manufacture = this.setTimeZoneHours(timeZone, product.manufacture);
        this.expiration = this.setTimeZoneHours(timeZone, product.expiration);
    }

    private setTimeZoneHours(timeZone: number, date: string): string {
        const dateZone: Date = new Date(date);
        dateZone.setHours(dateZone.getHours() + timeZone);

        return dateZone.toISOString();
    }
}

export class ProductDeleteCommand {
    public productIds: number[] = [];

    constructor(selectedEntities: any) {
        this.productIds = selectedEntities.map((product: Product) => product.id);
    }
}

export class ProductUpdateCommand {
    public id: number;
    public name: string;
    public sale: number;
    public expense: number;
    public isAvailable: boolean;
    public manufacture: string;
    public expiration: string;

    constructor(product: any, id: number) {
        this.id = id;
        this.name = product.name;
        this.sale = product.sale;
        this.expense = product.expense;
        this.isAvailable = product.isAvailable;
        this.manufacture = this.setTimeZoneHours(product.manufacture);
        this.expiration = this.setTimeZoneHours(product.expiration);
    }

    private setTimeZoneHours(date: string): string {
        const timeZone: number = 3;
        const dateZone: Date = new Date(date);
        dateZone.setHours(dateZone.getHours() + timeZone);

        return dateZone.toISOString();
    }
}
