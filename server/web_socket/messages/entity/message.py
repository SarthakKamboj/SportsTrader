from better_profanity import profanity


class Message:
    def __init__(self, args):
        account_id, chat_id = args.get('account_id'), args.get(
            'chat_id')
        if not account_id or not chat_id:
            raise Exception('account_id and chat_id must be provided')

        self.account_id = account_id
        self.chat_id = chat_id


class Text(Message):
    def __init__(self, args):
        super().__init__(args)
        text = args['text']
        if not text:
            raise Exception('text must be provided')
        if not self._is_valid_text(text):
            raise Exception('text is not valid')

        self.text = text

    def _is_valid_text(self, text):
        return not profanity.contains_profanity(text)


class Image(Message):
    def __init__(self, args):
        super().__init__(args)
        image_url = args['image_url']
        self.image_url = image_url
