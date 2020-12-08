def add_user(chat_id: int, user_id: int, add_user_to_chat_db):
    if user_id is None:
        return {
            'error': 'user_id is undefined'
        }

    return add_user_to_chat_db(chat_id, user_id)
