from .db import DB_Interface
from playhouse.pool import PooledPostgresqlDatabase

pg_db = PooledPostgresqlDatabase('test', max_connections=8, user='na', password='na',
                                 host='test', port=5432)

db_interface = DB_Interface(pg_db)


def get_db_interface():
    return db_interface
