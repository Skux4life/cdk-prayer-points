import { APIGatewayProxyEvent } from 'aws-lambda';

export const handler = async (event: APIGatewayProxyEvent) => {
    const validEvent = parseEventBody(JSON.parse(event.body ?? ''));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseEventBody(body: any): boolean {
    if (body.category && body.prayer) {
        return true;
    } else {
        return false;
    }
}
