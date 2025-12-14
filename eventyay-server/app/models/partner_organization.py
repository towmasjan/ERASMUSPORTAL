"""
Partner Organization Model for Erasmus+ Youth Exchanges.

This model represents partner organizations that participate in Erasmus+ 
youth exchange events. Each organization is associated with a specific event
and can have multiple attendees (ticket holders) linked to it.
"""

from datetime import datetime

from app.models import db
from app.models.base import SoftDeletionModel


class PartnerOrganization(SoftDeletionModel):
    """
    Partner Organization model for Erasmus+ Youth Exchanges.
    
    Represents organizations from different countries that participate
    in youth exchange events. Each organization has an OID code 
    (Organization ID from the EU Erasmus+ portal) and a travel budget limit.
    """

    __tablename__ = 'partner_organizations'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    country = db.Column(db.String(100), nullable=False)
    oid_code = db.Column(db.String(50), unique=True, nullable=True)
    contact_email = db.Column(db.String(255), nullable=True)
    contact_person = db.Column(db.String(255), nullable=True)
    contact_phone = db.Column(db.String(50), nullable=True)
    address = db.Column(db.Text, nullable=True)
    travel_budget_limit = db.Column(db.Float, default=0.0)
    
    # Relationship to Event
    event_id = db.Column(
        db.Integer, 
        db.ForeignKey('events.id', ondelete='CASCADE'), 
        nullable=False
    )
    
    # Timestamps
    created_at = db.Column(db.DateTime(timezone=True), default=datetime.utcnow)
    modified_at = db.Column(
        db.DateTime(timezone=True), 
        default=datetime.utcnow, 
        onupdate=datetime.utcnow
    )

    # Relationships
    event = db.relationship('Event', backref='partner_organizations')
    attendees = db.relationship(
        'TicketHolder', 
        backref='partner_organization',
        lazy='dynamic'
    )

    def __repr__(self):
        return f'<PartnerOrganization {self.name} ({self.country})>'

    @property
    def total_travel_costs(self):
        """Calculate total actual travel costs for all attendees."""
        from app.models.ticket_holder import TicketHolder
        total = db.session.query(db.func.sum(TicketHolder.actual_travel_cost)).filter(
            TicketHolder.partner_organization_id == self.id,
            TicketHolder.actual_travel_cost.isnot(None)
        ).scalar()
        return total or 0.0

    @property
    def remaining_travel_budget(self):
        """Calculate remaining travel budget."""
        return self.travel_budget_limit - self.total_travel_costs

    @property
    def attendee_count(self):
        """Return the number of attendees from this organization."""
        return self.attendees.count()

    def serialize(self):
        """Return object data in easily serializable format."""
        return {
            'id': self.id,
            'name': self.name,
            'country': self.country,
            'oid_code': self.oid_code,
            'contact_email': self.contact_email,
            'contact_person': self.contact_person,
            'travel_budget_limit': self.travel_budget_limit,
            'event_id': self.event_id,
        }


