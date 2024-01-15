# -*- coding: utf-8 -*-
{
    'name' : 'Disable Form',
    'version' : '16.0',
    'summary': 'Disable form view using OWL',
    'sequence': -1,
    'description':"""
    Disable form view from ir.ui.view, from actions context,
    and from javascript using OWL.
    """,
    'category': 'Hidden',
    'depends' : ['web', 'sale'],
    'data': [
        'views/sale_order.xml'
    ],
    'installable': True,
    'application': False,
    'assets': {
        'web.assets_backend': [
            'disable_form/static/src/components/*'
        ]
    },
}