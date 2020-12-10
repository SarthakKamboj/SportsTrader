from peewee import Table, fn
from playhouse.pool import PooledPostgresqlDatabase
from typing import List


class DB_Interface:
    def __init__(self, pg_db):
        self.pg_db = pg_db
        cols = ('id', 'text', 'image_url',
                'created_at', 'account_id', 'chat_id')
        Message = Table('message', cols)
        self.Message = Message.bind(pg_db)

    def insert_text(self, db_args) -> List:
        self.pg_db.connect()
        account_id, chat_id = db_args.get('account_id'), db_args.get(
            'chat_id')
        text = db_args.get('text')
        print(text)
        db_args = {
            self.Message.text: text,
            self.Message.account_id: account_id,
            self.Message.chat_id: chat_id
        }
        query = self.Message.insert(db_args).returning(
            self.Message.id, self.Message.text, self.Message.created_at, self.Message.account_id, self.Message.chat_id).execute()

        self.pg_db.close()
        return list(query)

    def insert_image(self, db_args) -> List:
        self.pg_db.connect()
        account_id, chat_id = db_args.get('account_id'), db_args.get(
            'chat_id')
        image_url = db_args.get('image_url')
        db_args = {
            self.Message.image_url: image_url,
            self.Message.account_id: account_id,
            self.Message.chat_id: chat_id
        }
        query = self.Message.insert(db_args).returning(
            self.Message.id, self.Message.image_url, self.Message.created_at, self.Message.account_id, self.Message.chat_id).execute()

        self.pg_db.close()
        return list(query)

    def get_chat_messages(self, chat_args) -> List:
        self.pg_db.connect()
        num_mgs, chat_id = chat_args.get(
            'num_mgs'), chat_args.get('chat_id')
        if not num_mgs:
            num_mgs = 10
        query = (self.Message.select().where(
            self.Message.chat_id == chat_id).order_by(self.Message.created_at.desc())).limit(num_mgs)

        self.pg_db.close()
        return list(query)


pg_db = PooledPostgresqlDatabase('image_editor', max_connections=8, user='postgres', password='Sarthak20',
                                 host='image-editor.cdebttpbq31d.us-west-1.rds.amazonaws.com', port=5432)

db_interface = DB_Interface(pg_db)
db_args = {
    # 'account_id': 1,
    'chat_id': 1,
    # 'text': 'inserted with pooling'
    # 'image_url': 'https://cdn.vox-cdn.com/thumbor/Pkmq1nm3skO0-j693JTMd7RL0Zk=/0x0:2012x1341/1200x800/filters:focal(0x0:2012x1341)/cdn.vox-cdn.com/uploads/chorus_image/image/47070706/google2.0.0.jpg'
}
for msg in db_interface.get_chat_messages(db_args):
    print(msg)
