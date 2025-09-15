interface Person {
    id: number;
    name: string;
    age: number;   
    document: string;
    email: string;
    password: string;
    phone: string;
    documentStatus: boolean;
    createdAt: Date;
}

interface Property {
    id: number;
    ownerId: number;
    description: string;
    type: string;
    zipCode: string;
    address: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    images: string[];
    price: number;
    area: number;
    bedrooms: number;
    bathrooms: number;
    createdAt: Date;
}

interface Contract {
    id: number;
    propertyId: number;
    tenantId: number;
    landlordId: number;
    contractHash: string;
    value: number;
    startDate: Date;
    endDate: Date;
    paymentStatus: "pending" | "paid" | "late";

}

interface Post {
    id: number;
    propertyId: number;
    title: string;
    content: string;
    createdAt: Date;
    status: "active" | "inactive" | "archived";
}

interface Payment {
    id: number;
    contractId: number;         // FK -> Contract.id
    amount: number;
    dueDate: Date;
    paidAt?: Date;
    txHash?: string;            // hash da transação Stellar
    status: "pending" | "paid" | "late";
}
