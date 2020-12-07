from .text import Text


class UseCases:
    def __init__(self, insert_text, get_chat_texts):
        self._insert_text = insert_text
        self._get_chat_texts = get_chat_texts
        pass

    def register_text(self, text: str, account_id: int, chat_id: int):
        try:
            text = Text(text, account_id, chat_id)
            return self._insert_text(text, account_id, chat_id)
        except Exception as e:
            raise e

    def get_chat_texts(self, chat_id):
        try:
            num_texts = 10
            texts = self._get_chat_texts(chat_id, num_texts=num_texts)
            return
        except Exception as e:
            raise e
