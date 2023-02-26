import { parseEventBody } from '../lambda/create-prayer-point';

// parse event body
test('parsing valid event body', () => {
    const eventBody = {
        category: 'mission',
        prayer: 'Pray for Haiti',
    };
    const result = parseEventBody(eventBody);
    expect(result).toBe(true);
});

test('parsing invalid event body', () => {
    const eventBody = {
        category: 'test',
    };
    const result = parseEventBody(eventBody);
    expect(result).toBe(false);
});

test('parsing empty event body', () => {
    const result = parseEventBody({});
    expect(result).toBe(false);
});
// create a new prayer point

// save that ddb

// return response
