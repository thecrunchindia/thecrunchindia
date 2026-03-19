# API Endpoints List


## USER-SIDE

**Authentication & Profile**
```http
POST   - /api/auth/login-otp/                   # Send Login OTP
POST   - /api/auth/register/                    # Register new account
POST   - /api/auth/verify-otp/                  # Verify OTP code
POST   - /api/auth/resend-otp/                  # Resend OTP code
GET    - /api/auth/profile/                     # Get user profile details
PATCH  - /api/auth/profile/                     # Update user profile
GET    - /api/auth/addresses/                   # Get saved addresses
POST   - /api/auth/addresses/                   # Add new address
PATCH  - /api/auth/addresses/${id}/             # Update an address
DELETE - /api/auth/addresses/${id}/             # Delete an address
```

**Homepage & Menu**
```http
GET    - /api/inventory/public/categories/              # Get all food categories
GET    - /api/inventory/public/menu-items/              # Get all menu items
GET    - /api/inventory/public/menu-items/?section=...  # Get items by section (BANNER, COMBO MENU, BEST SELLER, TODAY'S SPECIAL)
GET    - /api/site-settings/info/                       # Get site status (Open/Closed)
```

**Cart & Orders**
```http
GET    - /api/orders/cart/                      # Fetch current cart items
POST   - /api/orders/cart/update/               # Update cart item quantities
POST   - /api/orders/cart/merge/                # Merge local cart with DB on login
POST   - /api/orders/place-order/               # Checkout / Place a new order
GET    - /api/orders/history/                   # View user order history
POST   - /api/orders/cancel/${orderId}/         # Cancel an order
```

**Interactions & Contact**
```http
POST   - /api/contact/                          # Submit contact us form
POST   - /api/bookings/create/                  # Reserve a table
GET    - /api/faq/list/                         # Get Frequently Asked Questions
GET    - /api/feedback/eligibility/             # Check if user can leave a review
GET    - /api/feedback/list/                    # Get all public reviews
POST   - /api/feedback/create/                  # Submit a new review
```

---

## ADMIN-SIDE

**Dashboard & Analytics**
```http
POST   - /api/auth/admin-login/                 # Admin Login credentials
GET    - /api/dashboard/admin-stats/            # Get top level dashboard numbers
GET    - /api/revenue/profit-tracker/           # Get revenue analytics & charts
GET    - /api/orders/admin/stats/               # Get order count aggregates
GET    - /api/site-settings/info/               # Read site config
PUT    - /api/site-settings/info/               # Update site config (Toggle shop open/close)
```

**Order Management**
```http
GET    - /api/orders/admin/?status=PLACED       # Get New orders
GET    - /api/orders/admin/?status=PREPARING    # Get Preparing orders
GET    - /api/orders/admin/?status=ON_THE_WAY   # Get On The Way orders
GET    - /api/orders/admin/?status=HISTORY      # Get Completed/Cancelled history
PATCH  - /api/orders/admin/${orderId}/status/   # Change the status of an order
```

**Menu & Inventory Management**
```http
GET    - /api/inventory/categories/                 # Get Categories (Admin View)
POST   - /api/inventory/categories/                 # Create Category
PATCH  - /api/inventory/categories/${id}/           # Update Category
DELETE - /api/inventory/categories/${id}/           # Delete Category

GET    - /api/inventory/admin/menu-items/           # Get Menu Items (Admin View)
POST   - /api/inventory/admin/menu-items/           # Create Menu Item
PATCH  - /api/inventory/admin/menu-items/${id}/     # Update Menu Item
DELETE - /api/inventory/admin/menu-items/${id}/     # Delete Menu Item
```

**Customer & Communication Management**
```http
GET    - /api/customers/                        # List all registered users
POST   - /api/customers/${id}/toggle-block/     # Block or Unblock a user
GET    - /api/customers/export/csv/             # Download customer export

GET    - /api/admin/contacts/                   # View Support Inbox
POST   - /api/admin/contacts/${id}/reply/       # Reply to a support ticket

GET    - /api/bookings/all/                     # View all table reservations

GET    - /api/feedback/admin/list/              # List all reviews for moderation
PATCH  - /api/feedback/admin/${id}/update/      # Toggle Review visibility / Reply

GET    - /api/faq/admin/list-create/            # View Admin FAQs
POST   - /api/faq/admin/list-create/            # Create FAQ
PATCH  - /api/faq/admin/edit/${id}/             # Update FAQ
DELETE - /api/faq/admin/delete/${id}/           # Delete FAQ
```

---

## SHARED (System)
```http
GET    - /api/notifications/unread/             # Get unread alerts
POST   - /api/notifications/mark-read/${type}/  # Mark alert group as read
POST   - /api/notifications/delete-fcm-token/   # Clear firebase token on logout
```
