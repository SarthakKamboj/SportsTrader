from datetime import datetime as dt
import json
import asyncio
import websockets

# STATE = {
#     'num_users': 0
# }

ROOMS = {}


# def message():
#     return json.dumps({'timestamp': str(dt.now()), **STATE})


# async def notify_state():
#     if USERS:
#         data_to_send = message()
#         await asyncio.wait([user.send(data_to_send) for user in USERS])


# def increment_users():
#     STATE['num_users'] += 1


# def decrement_users():
#     cur_num_users = STATE['num_users']-1
#     STATE['num_users'] = max(0, cur_num_users)


async def register_conn(chat_id, conn):
    # USERS.add(conn)
    ROOMS[chat_id].add(conn)
    """
    TODO use case for querying the latest messages for the chat and giving it to the user
    """
    # increment_users()
    # await notify_state()


def handle_create_chat_room(chat_id):
    """
    TODO use case for creating a chat in db
    """

    chat = ROOMS.get(chat_id)
    if not chat:
        ROOMS[chat_id] = set()


def delete_chat(chat_id):
    del ROOMS[chat_id]


async def unregister_conn(chat_id, conn):
    # USERS.remove(conn)

    USERS = ROOMS[chat_id]
    USERS.remove(conn)
    if len(USERS) == 0:
        delete_chat(chat_id)
        return


async def notify_msg(chat_id, conn, msg_data):
    """
    TODO use case for registering a text
    """
    USERS = ROOMS.get(chat_id)
    if len(USERS) > 1:
        data = json.dumps(data)
        await asyncio.wait([user.send(data) for user in USERS if user != conn])


def gen_init_info(account_id: int):
    timestamp = str(dt.now())
    init_info = {
        'timestamp': timestamp,
        'account_id': account_id,
        'message': f'you are now part of the chat'
    }
    return json.dumps(init_info)


def process_cookies(cookies):
    processed_cookies = {}
    for cookie in cookies.split(';'):
        cookie = cookie.strip()
        cookie_name, cookie_val = cookie.split('=')
        processed_cookies[cookie_name] = cookie_val
    return processed_cookies


async def server(websocket, path: str):
    cookies = websocket.request_headers["Cookie"]
    cookies = process_cookies(cookies)
    print(cookies)
    """
    TODO fetch account_id using the cookie qid value and send it to the user
    """
    chat_id = path.replace('/', '')
    handle_create_chat_room(chat_id)
    await register_conn(chat_id, websocket)
    try:
        init_info = gen_init_info(5)
        await websocket.send(init_info)
        async for message in websocket:
            msg_data = json.loads(message)
            """
            msg_data = {
                account_id,
                text?,
                image_data?,
            }
            """
            await notify_msg(chat_id, websocket, msg_data)
    finally:
        print(f'user disconnected from {path}')
        await unregister_conn(chat_id, websocket)


async def process_request(self, path, request_headers):
    cookies = request_headers["Cookie"]

start_server = websockets.serve(server, "localhost", 5000)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
