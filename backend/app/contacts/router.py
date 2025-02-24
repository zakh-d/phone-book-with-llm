from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def get_list_of_contacts():
    pass


@router.get("/{contact_id}")
async def get_contact_details(contact_id: int):
    pass


@router.post("/")
async def create_contact():
    pass


@router.put("/{contact_id}")
async def update_contact(contact_id: int):
    pass


@router.delete("/{contact_id}")
async def delete_contact(contact_id: int):
    pass
