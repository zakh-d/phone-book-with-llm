import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Contact, ContactWithId } from "../types/contact";

const apiURL = import.meta.env.VITE_API_URL;

export const contactsApi = createApi({
    reducerPath: 'contactsApi',
    baseQuery: fetchBaseQuery({ baseUrl: apiURL + '/api' }), 
    tagTypes: ['Contact'],
    endpoints: (builder) => ({
        getContacts: builder.query<ContactWithId[], void>({
            query: () => '/contacts/',
            providesTags: [{ type: 'Contact', id: 'LIST' }]
        }),
        addContact: builder.mutation<ContactWithId, Contact>({
            query: (contact) => ({
                url: '/contacts/',
                method: 'POST',
                body: contact
            }),
            invalidatesTags: [{ type: 'Contact', id: 'LIST' }]
        }),
        deleteContact: builder.mutation<void, string>({
            query: (id) => ({
                url: `/contacts/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: [{ type: 'Contact', id: 'LIST' }]
        }),
        updateContact: builder.mutation<ContactWithId, ContactWithId>({
            query: (contact) => ({
                url: `/contacts/${contact.id}`,
                method: 'PUT',
                body: {
                    name: contact.name,
                    phone_number: contact.phone_number
                }
            }),
            invalidatesTags: [{ type: 'Contact', id: 'LIST' }]
        }),
        processUserPrompt: builder.mutation<{message: string}, string>({
            query: (userPrompt) => ({
                url: '/llm/process/',
                method: 'POST',
                body: {
                    prompt: userPrompt
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
    useDeleteContactMutation,
    useProcessUserPromptMutation
} = contactsApi;