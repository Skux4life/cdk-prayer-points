import { createPrayerPoint, parseEventBody } from '../lambda/create-prayer-point';
import { PrayerPoint } from '../models/prayer-point';
import { addPrayerPoint } from '../lib/ddb-client';

const validEventBody = {
    category: 'mission',
    prayer: 'Pray for Haiti',
};
const invalidEventBody = {
    category: 'test',
    random: 'stuff',
};

jest.mock('../lib/ddb-client');
const mockAddPrayerPoint = addPrayerPoint as jest.MockedFunction<typeof addPrayerPoint>;

test('parsing valid event body', () => {
    const result = parseEventBody(validEventBody);
    expect(result).toBe(true);
});

test('parsing invalid event body', () => {
    const result = parseEventBody(invalidEventBody);
    expect(result).toBe(false);
});

test('parsing empty event body', () => {
    const result = parseEventBody({});
    expect(result).toBe(false);
});
// create a new prayer point
test('creating a new prayer point', async () => {
    mockAddPrayerPoint.mockResolvedValue(true);
    const pp: PrayerPoint = await createPrayerPoint(validEventBody);

    expect(addPrayerPoint).toHaveBeenCalledTimes(1);
    //expect(addPrayerPoint).toHaveBeenCalledWith('PutCommandInput');

    expect(pp.pk).toBeDefined();
    expect(pp.category).toBe(validEventBody.category);
    expect(pp.prayer).toBe(validEventBody.prayer);
});

test('error when creating a new prayer point', async () => {
    mockAddPrayerPoint.mockResolvedValue(false);
    try {
        await createPrayerPoint(validEventBody);
        // Fail test if above expression doesn't throw anything.
        expect(true).toBe(false);
    } catch (err) {
        expect(err).toHaveProperty('message', 'Unable to create prayer point');
    }
});
// save that ddb

// return response
