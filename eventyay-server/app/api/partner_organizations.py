"""
API endpoints for Partner Organizations (Erasmus+ Youth Exchanges).

This module provides RESTful API endpoints for managing partner organizations
that participate in Erasmus+ youth exchange events.
"""

from flask_rest_jsonapi import ResourceDetail, ResourceList, ResourceRelationship

from app.api.bootstrap import api
from app.api.helpers.errors import ForbiddenError
from app.api.helpers.permission_manager import has_access
from app.api.helpers.query import event_query
from app.api.helpers.utilities import require_relationship
from app.api.schema.partner_organizations import PartnerOrganizationSchema
from app.models import db
from app.models.partner_organization import PartnerOrganization


class PartnerOrganizationListPost(ResourceList):
    """
    List and create Partner Organizations.
    """

    def before_post(self, args, kwargs, data):
        """
        Before post method to check for required relationship and proper permission.
        
        :param args: Request arguments
        :param kwargs: Request keyword arguments
        :param data: Request data
        :return: None
        """
        require_relationship(['event'], data)
        if not has_access('is_coorganizer', event_id=data['event']):
            raise ForbiddenError({'source': ''}, 'Co-organizer access is required.')

    methods = ['POST']
    schema = PartnerOrganizationSchema
    data_layer = {'session': db.session, 'model': PartnerOrganization}


class PartnerOrganizationList(ResourceList):
    """
    List Partner Organizations for an event.
    """

    def query(self, view_kwargs):
        """
        Query method for Partner Organization List.
        
        :param view_kwargs: View keyword arguments
        :return: SQLAlchemy query object
        """
        query_ = self.session.query(PartnerOrganization)
        query_ = event_query(query_, view_kwargs)
        return query_

    view_kwargs = True
    methods = ['GET']
    schema = PartnerOrganizationSchema
    data_layer = {
        'session': db.session, 
        'model': PartnerOrganization, 
        'methods': {'query': query}
    }


class PartnerOrganizationDetail(ResourceDetail):
    """
    Partner Organization detail by id.
    """

    decorators = (
        api.has_permission(
            'is_coorganizer',
            methods="PATCH,DELETE",
            fetch="event_id",
            model=PartnerOrganization,
        ),
    )
    schema = PartnerOrganizationSchema
    data_layer = {'session': db.session, 'model': PartnerOrganization}


class PartnerOrganizationRelationshipRequired(ResourceRelationship):
    """
    Partner Organization required relationship.
    """

    decorators = (
        api.has_permission(
            'is_coorganizer',
            methods="PATCH,DELETE",
            fetch="event_id",
            model=PartnerOrganization,
        ),
    )
    methods = ['GET', 'PATCH']
    schema = PartnerOrganizationSchema
    data_layer = {'session': db.session, 'model': PartnerOrganization}


class PartnerOrganizationRelationshipOptional(ResourceRelationship):
    """
    Partner Organization optional relationship.
    """

    decorators = (
        api.has_permission(
            'is_coorganizer',
            methods="PATCH,DELETE",
            fetch="event_id",
            model=PartnerOrganization,
        ),
    )
    methods = ['GET', 'PATCH']
    schema = PartnerOrganizationSchema
    data_layer = {'session': db.session, 'model': PartnerOrganization}


