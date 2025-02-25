export interface Contact {
    name: string;
    phone_number: string;
}

export interface ContactWithId extends Contact {
    id: string
}