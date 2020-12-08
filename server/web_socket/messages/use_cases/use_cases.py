from entity.message import Text, Image


class UseCases:
    def __init__(self, db_interface):
        self.db_interface = db_interface

    def register_text(self, args):
        try:
            text_obj = Text(args)
            text_args = {
                'text': text_obj.text,
                'account_id': text_obj.account_id,
                'chat_id': text_obj.chat_id
            }
            return self.db_interface.insert_text(text_args)
        except Exception as e:
            raise e

    def register_image(self, args):
        try:
            image_obj = Image(args)
            return self.db_interface.insert_image(image_obj.image_url, image_obj.account_id, image_obj.chat_id)
        except Exception as e:
            raise e

    def get_chat_messages(self, chat_id):
        try:
            num_texts = 10
            chat_args = {
                'chat_id': chat_id,
                'num_texts': num_texts
            }
            texts = self.db_interface.get_chat_messages(chat_args)
            return
        except Exception as e:
            raise e
