# Setup Guide

## Prerequisites

- Node.js 18+
- PostgreSQL 15+
- Redis 7+
- npm or yarn
- Docker & Docker Compose (optional)

---

## Local Setup (Without Docker)

### 1. Clone Repository

```bash
git clone https://github.com/BENDAVIS246/INDIVIDUAL-PROJECT.git
cd INDIVIDUAL-PROJECT
```

### 2. Database Setup

**Create PostgreSQL database:**

```bash
createdb admission_system
```

**Or using psql:**

```sql
CREATE DATABASE admission_system;
```

### 3. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your configuration
# Edit database credentials, API keys, etc.

# Run database migrations (if applicable)
npm run migrate

# Start development server
npm run dev
```

**Backend will start at:** `http://localhost:5000`

### 4. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file (if needed)
echo 'REACT_APP_API_URL=http://localhost:5000/api' > .env

# Start development server
npm run dev
```

**Frontend will start at:** `http://localhost:3000`

---

## Docker Setup

### 1. Build and Start Services

```bash
# Build all services
docker-compose build

# Start services in detached mode
docker-compose up -d
```

### 2. Verify Services

```bash
# Check running containers
docker-compose ps

# View logs
docker-compose logs -f
```

### 3. Access Applications

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`
- Database: `localhost:5432`
- Redis: `localhost:6379`

### 4. Stop Services

```bash
docker-compose down
```

---

## Environment Configuration

### Backend .env Example

```env
# Server
NODE_ENV=development
PORT=5000
API_URL=http://localhost:5000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=admission_system
DB_USER=postgres
DB_PASSWORD=postgres

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# JWT
JWT_SECRET=your-super-secret-key-change-this-in-production
JWT_EXPIRE=7d

# Email (SendGrid)
SENDGRID_API_KEY=your_sendgrid_key
SENDGRID_FROM_EMAIL=noreply@excelsecondary.school

# SMS (Twilio)
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=+1234567890

# Payment Methods
STRIPE_SECRET_KEY=sk_test_your_key
MTN_API_KEY=your_mtn_key
AIRTEL_API_KEY=your_airtel_key
```

### Frontend .env Example

```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## Database Initialization

### Option 1: TypeORM Auto-Sync

With `synchronize: true` in development, tables are created automatically.

### Option 2: Manual Migration

```bash
cd backend
npm run typeorm migration:generate -- -n InitialSchema
npm run migrate
```

---

## Testing

### Backend Tests

```bash
cd backend

# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

### Frontend Tests

```bash
cd frontend

# Run tests
npm test

# Watch mode
npm run test:watch
```

---

## Running in Production

### Build Frontend

```bash
cd frontend
npm run build
```

### Build Backend

```bash
cd backend
npm run build
npm start
```

### Docker Production Build

```bash
docker-compose -f docker-compose.yml build
docker-compose -f docker-compose.yml up -d
```

---

## Troubleshooting

### Database Connection Issues

**Error:** `FATAL: Ident authentication failed for user "postgres"`

**Solution:**
```bash
# Update PostgreSQL pg_hba.conf
# Change authentication method from 'ident' to 'md5' or 'password'
```

### Port Already in Use

```bash
# Find process using port
lsof -i :5000
lsof -i :3000

# Kill process
kill -9 <PID>
```

### Module Not Found Errors

```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Database Migration Issues

```bash
# Reset database (WARNING: deletes all data)
npm run typeorm schema:drop
npm run migrate
```

---

## Development Workflow

### 1. Feature Development

```bash
# Create feature branch
git checkout -b feature/feature-name

# Make changes and commit
git add .
git commit -m "Add feature description"

# Push to remote
git push origin feature/feature-name

# Create pull request
```

### 2. Code Quality

```bash
# Lint code
cd backend && npm run lint
cd frontend && npm run lint

# Format code
npx prettier --write .
```

### 3. Commit Standards

Follow conventional commits:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Formatting
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Build/dependency updates

---

## Deployment

### AWS EC2 Deployment

1. **Launch EC2 Instance:** Ubuntu 20.04 LTS
2. **Install Prerequisites:**

```bash
sudo apt update
sudo apt install nodejs npm postgresql postgresql-contrib redis-server
```

3. **Clone and Setup Project:**

```bash
git clone <repo-url>
cd INDIVIDUAL-PROJECT
npm run install-all
```

4. **Configure Environment:**

```bash
cp backend/.env.example backend/.env
# Edit with production values
```

5. **Run Application:**

```bash
npm run build
npm start
```

### Heroku Deployment

1. **Create Heroku App:**

```bash
heroku create app-name
```

2. **Add PostgreSQL Addon:**

```bash
heroku addons:create heroku-postgresql:hobby-dev
```

3. **Deploy:**

```bash
git push heroku main
```

---

## Monitoring

- **Application Logs:** `docker-compose logs -f`
- **Database Monitoring:** Use pgAdmin
- **Error Tracking:** Sentry integration
- **Performance:** New Relic or DataDog

---

## Support

For issues or questions:
- Email: admissions@excelsecondary.school
- GitHub Issues: [Report here](https://github.com/BENDAVIS246/INDIVIDUAL-PROJECT/issues)
