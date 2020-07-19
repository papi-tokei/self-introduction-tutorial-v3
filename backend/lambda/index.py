import json
import os
import pprint

import boto3
from boto3.dynamodb.conditions import Key

USER_TABLE_NAME = "self_introduction_tutorial"
USER_TABLE_NAME = os.environ['TABLE_NAME']
dynamodb = boto3.resource('dynamodb')


def handler(event, context):
    print(event)

    response = {
        'statusCode': 200,
        'body': '',
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    }
    try:
        user_table = dynamodb.Table(USER_TABLE_NAME)
        body = json.loads(event['body'])
        print(body)
        if not body:
            raise Exception('invalid body')

        if body['method'] == 'update':
            user_table.put_item(Item=body['data'])
            response['body'] = json.dumps("Update Success")
            response['statusCode'] = 200

        else:
            table_response = user_table.query(KeyConditionExpression=Key('id').eq('1'))[
                "Items"
            ]
            response['body'] = json.dumps(table_response)
            response['statusCode'] = 200
    except Exception as err:
        print("Error Message: {0}".format(err))
        response['body'] = json.dumps("Error Message: {0}".format(err))
        response['statusCode'] = 500
    print(response)
    return response
