import { addPrayerPoint } from '../lib/ddb-client';
import { PrayerPoint } from '../models/prayer-point';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseEventBody(body: any): boolean {
    if (body.category && body.prayer) {
        return true;
    } else {
        return false;
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createPrayerPoint(body: any): Promise<PrayerPoint> {
    const prayerPoint: PrayerPoint = {
        pk: Date.now(),
        category: body.category,
        prayer: body.prayer,
    };
    const putParams = {
        TableName: 'Table', //need to update
        Item: prayerPoint,
    };
    const result = await addPrayerPoint(putParams);
    if (result) {
        return prayerPoint;
    } else {
        throw new Error('Unable to create prayer point');
    }
}
