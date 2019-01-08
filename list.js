import * as dynamoDbLib from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';

export async function main(event, context) {
  const params = {
    TableName: 'notes',
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': event.requestContext.identity.cognitoIdentityId
    }
  };

  try {
    const result = await dynamoDbLib.call('query', params);
    if (result.Items) {
      return success(result.Items);
    }
    return failure({ status: false, error: 'Not Found.' });
  } catch (error) {
    console.log(error);
    return failure({ status: false });
  }
}
