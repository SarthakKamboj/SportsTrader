from .validation_functions import valid_text


class Text:
    def __init__(self, text, account_id, chat_id):
        if not valid_text(text):
            raise Exception('text is not valid')

        self.text = text
        self.account_id = account_id
        self.chat_id = chat_id


def hi():
    return 'hi'
