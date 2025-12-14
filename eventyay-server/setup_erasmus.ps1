#
# Erasmus+ Youth Exchange Setup Script (PowerShell)
# ==================================================
# This script sets up the eventyay-server with Erasmus+ Youth Exchange
# extensions including Partner Organizations and extended Attendee fields.
#
# Usage: .\setup_erasmus.ps1
#

$ErrorActionPreference = "Stop"

Write-Host "==============================================" -ForegroundColor Cyan
Write-Host "  Erasmus+ Youth Exchange Setup" -ForegroundColor Cyan
Write-Host "  for eventyay-server" -ForegroundColor Cyan
Write-Host "==============================================" -ForegroundColor Cyan
Write-Host ""

# Check if we're in a virtual environment
if (-not $env:VIRTUAL_ENV) {
    Write-Host "Warning: Not running in a virtual environment." -ForegroundColor Yellow
    Write-Host "   Consider activating a virtual environment first:" -ForegroundColor Yellow
    Write-Host "   python -m venv venv; .\venv\Scripts\Activate.ps1" -ForegroundColor Yellow
    Write-Host ""
}

# Step 1: Install dependencies
Write-Host "Step 1: Installing dependencies..." -ForegroundColor Green
if (Test-Path "requirements.txt") {
    pip install -r requirements.txt
} elseif (Test-Path "pyproject.toml") {
    pip install poetry
    poetry install
} else {
    Write-Host "Error: No requirements.txt or pyproject.toml found." -ForegroundColor Red
    exit 1
}
Write-Host "Dependencies installed." -ForegroundColor Green
Write-Host ""

# Step 2: Check database configuration
Write-Host "Step 2: Checking database configuration..." -ForegroundColor Green
if (-not $env:DATABASE_URL) {
    Write-Host "Warning: DATABASE_URL environment variable not set." -ForegroundColor Yellow
    Write-Host "   Make sure your .env file is configured or set the variable:" -ForegroundColor Yellow
    Write-Host '   $env:DATABASE_URL = "postgresql://user:pass@localhost:5432/eventyay"' -ForegroundColor Yellow
    Write-Host ""
}

# Step 3: Run database migrations
Write-Host "Step 3: Running database migrations..." -ForegroundColor Green
Write-Host "   Creating migration for Erasmus+ Partner Organizations..." -ForegroundColor White

# Generate migration
python manage.py db migrate -m "Add Erasmus+ Partner Organization model and Attendee fields"

Write-Host "Migration file created." -ForegroundColor Green
Write-Host ""

# Step 4: Apply migrations
Write-Host "Step 4: Applying migrations to database..." -ForegroundColor Green
python manage.py db upgrade

Write-Host "Database migrations applied." -ForegroundColor Green
Write-Host ""

# Summary
Write-Host "==============================================" -ForegroundColor Cyan
Write-Host "  Erasmus+ Setup Complete!" -ForegroundColor Green
Write-Host "==============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "New features added:" -ForegroundColor White
Write-Host "  - PartnerOrganization model (for managing partner orgs)" -ForegroundColor White
Write-Host "  - Extended Attendee/TicketHolder fields:" -ForegroundColor White
Write-Host "    - date_of_birth" -ForegroundColor Gray
Write-Host "    - special_diet_needs" -ForegroundColor Gray
Write-Host "    - health_issues" -ForegroundColor Gray
Write-Host "    - actual_travel_cost" -ForegroundColor Gray
Write-Host "    - emergency_contact_name" -ForegroundColor Gray
Write-Host "    - emergency_contact_phone" -ForegroundColor Gray
Write-Host "    - passport_number" -ForegroundColor Gray
Write-Host "    - passport_expiry_date" -ForegroundColor Gray
Write-Host "    - nationality" -ForegroundColor Gray
Write-Host "    - partner_organization_id (FK)" -ForegroundColor Gray
Write-Host ""
Write-Host "API Endpoints:" -ForegroundColor White
Write-Host "  GET/POST  /v1/partner-organizations" -ForegroundColor Gray
Write-Host "  GET/PATCH/DELETE  /v1/partner-organizations/<id>" -ForegroundColor Gray
Write-Host "  GET  /v1/events/<event_id>/partner-organizations" -ForegroundColor Gray
Write-Host ""
Write-Host "Happy coding! " -ForegroundColor Blue -NoNewline
Write-Host "[EU Flag]" -ForegroundColor Yellow


