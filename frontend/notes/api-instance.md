# API Instance Guide

We use a single configured Axios instance (`src/api/axios.js`) for all backend communication to handle tokens and errors automatically.

## 🛠️ Configuration
```javascript
import api from "../../api/axios";

// Our instance automatically points to your VITE_API_URL
// It also checks if you are on an `/admin` route or user route to attach the correct JWT token!
```

## ✅ How to use it
You do **not** need to manually add headers or tokens when fetching data. Just use the `api` import!

```javascript
import api from "../../api/axios";

const fetchOrders = async () => {
    // 1. Auto injects Base URL
    // 2. Auto attaches Bearer Token
    // 3. Auto refreshes expired tokens
    const res = await api.get("/orders/"); 
    return res.data;
}
```
