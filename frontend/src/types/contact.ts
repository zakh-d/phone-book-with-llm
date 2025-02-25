export interface Contact {
    name: string;
    phone: string;
}

export interface ContactWithId extends Contact {
    id: string
}