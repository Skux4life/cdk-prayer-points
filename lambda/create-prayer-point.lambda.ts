import { APIGatewayProxyEvent } from 'aws-lambda';
import { parseEventBody } from './create-prayer-point';

export const handler = async (event: APIGatewayProxyEvent) => {
    const validEvent = parseEventBody(JSON.parse(event.body ?? ''));
};