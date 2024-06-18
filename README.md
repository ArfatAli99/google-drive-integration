# Google Drive Integration Project

## Overview

This project integrates Google Drive with our system, allowing us to read the contents of shared folders, obtain object IDs and parent folder IDs, and store this information in our PostgreSQL database. It also captures user permissions on each object and stores this in a `permission_history` table. Webhooks are configured to notify us of any changes, with an endpoint to receive these notifications.

## Stack

- Node.js
- Prisma
- TypeScript
- NestJS
- PostgreSQL

## Features

- Read contents of shared folders in Google Drive
- Store object IDs and parent folder IDs in PostgreSQL
- Capture and store user permissions in the `permission_history` table
- Configure webhooks for real-time notifications
- Endpoint to receive webhook requests

## Prerequisites

- Node.js v14.x or higher
- PostgreSQL database
- Google Cloud Platform project with Drive API enabled
- Service Account with appropriate permissions

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/ArfatAli99/google-drive-integration.git
cd google-drive-integration
```


### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL="postgresql database url"
GOOGLE_CLIENT_EMAIL=""
GOOGLE_PRIVATE_KEY=""
GOOGLE_PROJECT_ID=""
WEBHOOK_ENDPOINT="/webhook-endpoint"
```

### 4. Configure Prisma

Run the following commands to generate Prisma client and migrate the database:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 5. Start the server

```bash
npm run start:dev
```

## Usage

### Reading Google Drive Contents

1. Use the Google Drive API to list contents of shared folders.
2. Extract object IDs and parent folder IDs.
3. Store the extracted data in the PostgreSQL database.

### Capturing User Permissions

1. For each object, retrieve the list of users and their permissions.
2. Store this information in the `permission_history` table.

### Webhook Configuration

1. Set up webhooks in Google Drive to notify of any changes.
2. Implement an endpoint to receive and process these webhook notifications.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.

## Contact

For any inquiries or support regarding this project, feel free to reach out:

- **Email**: [arfatali.dev@gmail.com](mailto:arfatali.dev@gmail.com)
