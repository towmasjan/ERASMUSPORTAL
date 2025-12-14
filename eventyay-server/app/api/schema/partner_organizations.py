"""
Marshmallow Schema for Partner Organization model (Erasmus+ Youth Exchanges).
"""

from marshmallow_jsonapi import fields
from marshmallow_jsonapi.flask import Relationship

from app.api.helpers.utilities import dasherize
from app.api.schema.base import SoftDeletionSchema, TrimmedEmail


class PartnerOrganizationSchema(SoftDeletionSchema):
    """
    API Schema for Partner Organization Model.
    
    Used for Erasmus+ Youth Exchange events to represent
    partner organizations from different countries.
    """

    class Meta:
        """
        Meta class for Partner Organization API Schema.
        """
        type_ = 'partner-organization'
        self_view = 'v1.partner_organization_detail'
        self_view_kwargs = {'id': '<id>'}
        inflect = dasherize

    id = fields.Str(dump_only=True)
    name = fields.Str(required=True)
    country = fields.Str(required=True)
    oid_code = fields.Str(allow_none=True)
    contact_email = TrimmedEmail(allow_none=True)
    contact_person = fields.Str(allow_none=True)
    contact_phone = fields.Str(allow_none=True)
    address = fields.Str(allow_none=True)
    travel_budget_limit = fields.Float(allow_none=True, load_default=0.0)
    
    # Computed fields (read-only)
    total_travel_costs = fields.Float(dump_only=True)
    remaining_travel_budget = fields.Float(dump_only=True)
    attendee_count = fields.Int(dump_only=True)
    
    # Timestamps
    created_at = fields.DateTime(dump_only=True)
    modified_at = fields.DateTime(dump_only=True)

    # Relationships
    event = Relationship(
        self_view='v1.partner_organization_event',
        self_view_kwargs={'id': '<id>'},
        related_view='v1.event_detail',
        related_view_kwargs={'partner_organization_id': '<id>'},
        schema='EventSchema',
        type_='event',
    )
    
    attendees = Relationship(
        self_view='v1.partner_organization_attendees',
        self_view_kwargs={'id': '<id>'},
        related_view='v1.attendee_list',
        related_view_kwargs={'partner_organization_id': '<id>'},
        many=True,
        schema='AttendeeSchemaPublic',
        type_='attendee',
        dump_only=True,
    )


