# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
JWT Bearer token required for protected endpoints:
```
Authorization: Bearer <jwt_token>
```

---

## Contact Endpoints

### Submit Contact Form
**POST** `/contact`

**Public Endpoint** - No authentication required

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "I'm interested in your premium cars"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Contact submission received successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "message": "I'm interested in your premium cars",
    "status": "new",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

---

## Admin Endpoints

### Admin Login
**POST** `/admin/login`

**Public Endpoint** - No authentication required

**Request Body:**
```json
{
  "email": "your_email",
  "password": "your_password"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "admin": {
    "id": "507f1f77bcf86cd799439011",
    "email": "your_email",
    "name": "Admin User",
    "role": "admin"
  }
}
```

### Initialize Admin User
**POST** `/admin/initialize`

**Public Endpoint** - Run once to create first admin

**Request Body:**
```json
{}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Admin user initialized successfully",
  "data": {
    "email": "your_email",
    "name": "Pramukh Admin"
  }
}
```

### Get Admin Profile
**GET** `/admin/profile`

**Protected Endpoint** - Requires JWT token

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "your_email",
    "name": "Pramukh Admin",
    "role": "super_admin",
    "isActive": true,
    "lastLogin": "2024-01-15T10:30:00Z"
  }
}
```

---

## Contact Management Endpoints

### Get All Contacts
**GET** `/admin/contacts`

**Protected Endpoint** - Requires JWT token

**Response (200):**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "message": "Message text...",
      "status": "new",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

### Get Single Contact
**GET** `/admin/contacts/:id`

**Protected Endpoint** - Requires JWT token
**Note:** Automatically marks contact as "read"

**URL Parameters:**
- `id` (required) - Contact ID

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Message text...",
    "status": "read",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

### Delete Contact
**DELETE** `/admin/contacts/:id`

**Protected Endpoint** - Requires JWT token

**URL Parameters:**
- `id` (required) - Contact ID

**Response (200):**
```json
{
  "success": true,
  "message": "Contact deleted successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Message text...",
    "status": "new",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

---

## Statistics Endpoint

### Get Dashboard Stats
**GET** `/admin/stats`

**Protected Endpoint** - Requires JWT token

**Response (200):**
```json
{
  "success": true,
  "data": {
    "totalContacts": 25,
    "newContacts": 5,
    "respondedContacts": 10,
    "readContacts": 10
  }
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Please provide all required fields"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Invalid or expired token"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Contact not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Failed to submit contact form",
  "error": "Error details..."
}
```

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Invalid token |
| 404 | Not Found - Resource doesn't exist |
| 500 | Server Error - Internal error |

---

## Rate Limiting

Currently no rate limiting is implemented. Recommended for production:
- 100 requests per 15 minutes per IP
- 1000 requests per hour per IP

---

## Testing with cURL

### Create Contact
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "Test message"
  }'
```

### Admin Login
```bash
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "your_email",
    "password": "your_password"
  }'
```

### Get Contacts (with token)
```bash
curl -X GET http://localhost:5000/api/admin/contacts \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## Testing with Postman

1. Create new Postman collection
2. Add request for each endpoint
3. Use environment variables for:
   - Base URL
   - JWT token
   - IDs
4. Save for team sharing

---

## Validation Rules

### Contact Form
- **name**: Required, max 100 characters
- **email**: Required, valid email format
- **message**: Required, 10-5000 characters

### Admin Login
- **email**: Required, valid email format
- **password**: Required, min 6 characters

---

## Response Headers

All responses include:
```
Content-Type: application/json
Access-Control-Allow-Origin: *
```

---

**Last Updated:** 2024
**Version:** 1.0.0
