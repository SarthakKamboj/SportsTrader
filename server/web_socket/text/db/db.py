from pypika import Query, Table


class DB:
    def __init__(self):
        pass

    def insert_text(self, text: str, account_id: int, chat_id: int):
        texts = Table('texts')
        q = Query.into(texts).columns('text', 'account_id',
                                      'chat_id').insert(text, account_id, chat_id)
        print(q)


DB().insert_text('hi', 5, 5)
