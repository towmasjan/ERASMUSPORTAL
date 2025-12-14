#!/bin/bash
#
# Erasmus+ Youth Exchange Setup Script
# =====================================
# This script sets up the eventyay-server with Erasmus+ Youth Exchange
# extensions including Partner Organizations and extended Attendee fields.
#
# Usage: ./setup_erasmus.sh
#

set -e

echo "=============================================="
echo "  Erasmus+ Youth Exchange Setup"
echo "  for eventyay-server"
echo "=============================================="
echo ""

# Check if we're in a virtual environment
if [ -z "$VIRTUAL_ENV" ]; then
    echo "⚠️  Warning: Not running in a virtual environment."
    echo "   Consider activating a virtual environment first:"
    echo "   python -m venv venv && source venv/bin/activate"
    echo ""
fi

# Step 1: Install dependencies
echo "📦 Step 1: Installing dependencies..."
if [ -f "requirements.txt" ]; then
    pip install -r requirements.txt
elif [ -f "pyproject.toml" ]; then
    pip install poetry
    poetry install
else
    echo "❌ Error: No requirements.txt or pyproject.toml found."
    exit 1
fi
echo "✅ Dependencies installed."
echo ""

# Step 2: Check database configuration
echo "🔧 Step 2: Checking database configuration..."
if [ -z "$DATABASE_URL" ]; then
    echo "⚠️  Warning: DATABASE_URL environment variable not set."
    echo "   Make sure your .env file is configured or set the variable:"
    echo "   export DATABASE_URL=postgresql://user:pass@localhost:5432/eventyay"
    echo ""
fi

# Step 3: Run database migrations
echo "📊 Step 3: Running database migrations..."
echo "   Creating migration for Erasmus+ Partner Organizations..."

# Generate migration
python manage.py db migrate -m "Add Erasmus+ Partner Organization model and Attendee fields"

echo "✅ Migration file created."
echo ""

# Step 4: Apply migrations
echo "⬆️  Step 4: Applying migrations to database..."
python manage.py db upgrade

echo "✅ Database migrations applied."
echo ""

# Summary
echo "=============================================="
echo "  ✅ Erasmus+ Setup Complete!"
echo "=============================================="
echo ""
echo "New features added:"
echo "  • PartnerOrganization model (for managing partner orgs)"
echo "  • Extended Attendee/TicketHolder fields:"
echo "    - date_of_birth"
echo "    - special_diet_needs"
echo "    - health_issues"
echo "    - actual_travel_cost"
echo "    - emergency_contact_name"
echo "    - emergency_contact_phone"
echo "    - passport_number"
echo "    - passport_expiry_date"
echo "    - nationality"
echo "    - partner_organization_id (FK)"
echo ""
echo "API Endpoints:"
echo "  GET/POST  /v1/partner-organizations"
echo "  GET/PATCH/DELETE  /v1/partner-organizations/<id>"
echo "  GET  /v1/events/<event_id>/partner-organizations"
echo ""
echo "Happy coding! 🇪🇺"


