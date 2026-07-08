from contextlib import contextmanager

import psycopg
from psycopg.rows import dict_row

from app.core.config import settings


@contextmanager
def get_connection():
    connection = psycopg.connect(settings.database_url, row_factory=dict_row)
    try:
        yield connection
    finally:
        connection.close()
