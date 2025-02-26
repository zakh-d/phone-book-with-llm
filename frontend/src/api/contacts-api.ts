import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Contact, ContactWithId } from "../types/contact";

export const contactsApi = createApi({
    reducerPath: 'contactsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/contacts' }), // TODO: change it to env variable
    tagTypes: ['Contact'],
    endpoints: (builder) => ({
        getContacts: builder.query<ContactWithId[], void>({
            query: () => '/',
            providesTags: [{ type: 'Contact', id: 'LIST' }]
        }),
        addContact: builder.mutation<ContactWithId, Contact>({
            query: (contact) => ({
                url: '/',
                method: 'POST',
                body: contact
            }),
            invalidatesTags: [{ type: 'Contact', id: 'LIST' }]
        }),
        deleteContact: builder.mutation<void, string>({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: [{ type: 'Contact', id: 'LIST' }]
        }),
        updateContact: builder.mutation<ContactWithId, ContactWithId>({
            query: (contact) => ({
                url: `/${contact.id}`,
                method: 'PUT',
                body: {
                    name: contact.name,
                    phone_number: contact.phone_number
                }
            }),
            invalidatesTags: [{ type: 'Contact', id: 'LIST' }]
        })
    })
});


export const {
    useGetContactsQuery,
    useAddContactMutation,
    useUpdateContactMutation,
    useDeleteContactMutation
} = contactsApi;