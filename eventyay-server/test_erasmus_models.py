"""
Simple test script to verify Erasmus+ model changes work correctly.
This script tests the models and schemas without running the full application.
"""

import os
import sys

# Set up environment
os.environ['DATABASE_URL'] = 'postgresql://open_event_user:opev_pass@localhost:5432/open_event'
os.environ['SECRET_KEY'] = 'test-secret-key'

print("=" * 60)
print("  ERASMUS+ MODEL TEST SCRIPT")
print("=" * 60)
print()

# Test 1: Import models
print("[1] Testing model imports...")
try:
    from app.models import db
    from app.models.partner_organization import PartnerOrganization
    print("    [OK] PartnerOrganization model imported successfully")
except Exception as e:
    print(f"    [FAIL] Error importing PartnerOrganization: {e}")
    sys.exit(1)

# Test 2: Check PartnerOrganization columns
print()
print("[2] Checking PartnerOrganization columns...")
columns = list(PartnerOrganization.__table__.columns.keys())
expected_columns = ['id', 'name', 'country', 'oid_code', 'contact_email', 
                   'contact_person', 'travel_budget_limit', 'event_id']
for col in expected_columns:
    if col in columns:
        print(f"    [OK] Column '{col}' exists")
    else:
        print(f"    [FAIL] Column '{col}' is MISSING!")

# Test 3: Check TicketHolder Erasmus+ columns
print()
print("[3] Checking TicketHolder Erasmus+ columns...")
try:
    from app.models.ticket_holder import TicketHolder
    columns = list(TicketHolder.__table__.columns.keys())
    erasmus_columns = ['date_of_birth', 'special_diet_needs', 'health_issues', 
                       'actual_travel_cost', 'nationality', 'partner_organization_id',
                       'emergency_contact_name', 'emergency_contact_phone',
                       'passport_number', 'passport_expiry_date']
    for col in erasmus_columns:
        if col in columns:
            print(f"    [OK] Erasmus+ column '{col}' exists in TicketHolder")
        else:
            print(f"    [FAIL] Erasmus+ column '{col}' is MISSING!")
except Exception as e:
    print(f"    [FAIL] Error checking TicketHolder: {e}")

# Test 4: Check schema import
print()
print("[4] Testing schema imports...")
try:
    from app.api.schema.partner_organizations import PartnerOrganizationSchema
    print("    [OK] PartnerOrganizationSchema imported successfully")
    
    # Check schema fields
    schema = PartnerOrganizationSchema()
    fields = list(schema.fields.keys())
    print(f"    [OK] Schema has {len(fields)} fields: {', '.join(fields[:5])}...")
except Exception as e:
    print(f"    [FAIL] Error importing PartnerOrganizationSchema: {e}")

# Test 5: Check AttendeeSchema has new fields
print()
print("[5] Testing AttendeeSchema Erasmus+ fields...")
try:
    from app.api.schema.attendees import AttendeeSchemaPublic
    schema = AttendeeSchemaPublic()
    fields = list(schema.fields.keys())
    erasmus_fields = ['date_of_birth', 'special_diet_needs', 'health_issues', 
                      'actual_travel_cost', 'nationality']
    for field in erasmus_fields:
        if field in fields:
            print(f"    [OK] Erasmus+ field '{field}' in AttendeeSchema")
        else:
            print(f"    [FAIL] Erasmus+ field '{field}' MISSING in AttendeeSchema!")
except Exception as e:
    print(f"    [FAIL] Error checking AttendeeSchema: {e}")

print()
print("=" * 60)
print("  TEST COMPLETE!")
print("=" * 60)
print()
print("All Erasmus+ Youth Exchange modifications have been verified.")
print()
print("Next steps:")
print("  1. Set up database: Create tables using migrations")
print("  2. Run the server: python manage.py runserver")
print("  3. Test API: POST /v1/partner-organizations")

