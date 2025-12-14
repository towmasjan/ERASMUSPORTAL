"""Add Erasmus+ Partner Organization model and Attendee fields

Revision ID: erasmus_001
Revises: 
Create Date: 2024-12-14

This migration adds:
- partner_organizations table for Erasmus+ Youth Exchange partner organizations
- New columns to ticket_holders table for Erasmus+ specific attendee data
"""

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'erasmus_001'
down_revision = None  # Set this to the latest migration revision ID if chaining
branch_labels = ('erasmus',)
depends_on = None


def upgrade():
    # Create partner_organizations table
    op.create_table(
        'partner_organizations',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('name', sa.String(length=255), nullable=False),
        sa.Column('country', sa.String(length=100), nullable=False),
        sa.Column('oid_code', sa.String(length=50), nullable=True),
        sa.Column('contact_email', sa.String(length=255), nullable=True),
        sa.Column('contact_person', sa.String(length=255), nullable=True),
        sa.Column('contact_phone', sa.String(length=50), nullable=True),
        sa.Column('address', sa.Text(), nullable=True),
        sa.Column('travel_budget_limit', sa.Float(), nullable=True, default=0.0),
        sa.Column('event_id', sa.Integer(), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('modified_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('deleted_at', sa.DateTime(timezone=True), nullable=True),
        sa.ForeignKeyConstraint(['event_id'], ['events.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('oid_code')
    )
    
    # Create index on event_id for faster lookups
    op.create_index(
        'ix_partner_organizations_event_id',
        'partner_organizations',
        ['event_id'],
        unique=False
    )

    # Add Erasmus+ specific columns to ticket_holders table
    op.add_column(
        'ticket_holders',
        sa.Column('date_of_birth', sa.Date(), nullable=True)
    )
    op.add_column(
        'ticket_holders',
        sa.Column('special_diet_needs', sa.Text(), nullable=True)
    )
    op.add_column(
        'ticket_holders',
        sa.Column('health_issues', sa.Text(), nullable=True)
    )
    op.add_column(
        'ticket_holders',
        sa.Column('actual_travel_cost', sa.Float(), nullable=True, default=0.0)
    )
    op.add_column(
        'ticket_holders',
        sa.Column('emergency_contact_name', sa.String(length=255), nullable=True)
    )
    op.add_column(
        'ticket_holders',
        sa.Column('emergency_contact_phone', sa.String(length=50), nullable=True)
    )
    op.add_column(
        'ticket_holders',
        sa.Column('passport_number', sa.String(length=50), nullable=True)
    )
    op.add_column(
        'ticket_holders',
        sa.Column('passport_expiry_date', sa.Date(), nullable=True)
    )
    op.add_column(
        'ticket_holders',
        sa.Column('nationality', sa.String(length=100), nullable=True)
    )
    op.add_column(
        'ticket_holders',
        sa.Column('partner_organization_id', sa.Integer(), nullable=True)
    )
    
    # Create foreign key constraint for partner_organization_id
    op.create_foreign_key(
        'fk_ticket_holders_partner_organization',
        'ticket_holders',
        'partner_organizations',
        ['partner_organization_id'],
        ['id'],
        ondelete='SET NULL'
    )
    
    # Create index on partner_organization_id for faster lookups
    op.create_index(
        'ix_ticket_holders_partner_organization_id',
        'ticket_holders',
        ['partner_organization_id'],
        unique=False
    )


def downgrade():
    # Remove foreign key and index first
    op.drop_constraint(
        'fk_ticket_holders_partner_organization',
        'ticket_holders',
        type_='foreignkey'
    )
    op.drop_index(
        'ix_ticket_holders_partner_organization_id',
        table_name='ticket_holders'
    )
    
    # Remove Erasmus+ columns from ticket_holders
    op.drop_column('ticket_holders', 'partner_organization_id')
    op.drop_column('ticket_holders', 'nationality')
    op.drop_column('ticket_holders', 'passport_expiry_date')
    op.drop_column('ticket_holders', 'passport_number')
    op.drop_column('ticket_holders', 'emergency_contact_phone')
    op.drop_column('ticket_holders', 'emergency_contact_name')
    op.drop_column('ticket_holders', 'actual_travel_cost')
    op.drop_column('ticket_holders', 'health_issues')
    op.drop_column('ticket_holders', 'special_diet_needs')
    op.drop_column('ticket_holders', 'date_of_birth')
    
    # Drop partner_organizations table
    op.drop_index('ix_partner_organizations_event_id', table_name='partner_organizations')
    op.drop_table('partner_organizations')


