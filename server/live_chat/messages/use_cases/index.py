from .use_cases import UseCases
from ..db.index import get_db_interface

db_interface = get_db_interface()
use_cases = UseCases(db_interface)


def get_use_cases():
    return use_cases
