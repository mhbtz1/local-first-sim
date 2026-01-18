from fastapi import Request, WebSocket, FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from socketio_manager import socketio_manager
import socketio
from routers import router_main

app = FastAPI()
root_router = APIRouter()

@root_router.post("/mock_otel_data")
async def mock_otel_data(request: Request):
    pass

@root_router.websocket("/ws-data")
async def ws_endpoint(websocket: WebSocket):
    await websocket.accept()

app.include_router(router_main.app)
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, 
                   allow_methods=["*"], allow_headers=["*"])

