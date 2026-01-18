import { createRoot } from 'react-dom/client';
import { Dispatcher } from "./client"

const root = document.getElementById('root')!
createRoot(root).render(<Dispatcher/>)    