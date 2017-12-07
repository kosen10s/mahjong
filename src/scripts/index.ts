import '../styles/main.styl';
import { Ranking, RecordTable } from './record-table';
import * as _ from 'lodash';

export interface Record {
    nth: number;
    date: string;
    score: {
        [key: string]: number;
    }
}

function loadRecordsFromJson(): Record[] {
    const context = require.context('../assets/records', true, /\.json$/);
    const data: any[] = [];
    context.keys().forEach((key: string) => {
        data.push(context(key));
    });
    return data as Record[];
}

function fillScoreTrans(record: Record, personName: string): Array<number | null> {
    console.log(personName, record.nth);
    const res: Array<number | null> = [];
    for (let i = 1; i < record.nth; i++) {
        if (record.nth === 1) break;
        res.push(null)
    }
    res.push(record.score[personName]);
    return res;
}

const records: Record[] = _.sortBy(loadRecordsFromJson(), o => o.nth);

let ranking: Ranking = [];
for (const record of records) {
    for (const attendeeName of Object.keys(record.score)) {
        const t = _.find(ranking, o => o.name === attendeeName);
        if (!t) {
            ranking.push({
                name: attendeeName,
                scoreTrans: fillScoreTrans(record, attendeeName),
                totalScore: record.score[attendeeName]
            })
        }
        if (t) {
            const score = record.score[attendeeName];
            t.scoreTrans.push(score);
            t.totalScore += score;
        }

    }
    for (const r of ranking) {
        if (r.scoreTrans.length < record.nth) r.scoreTrans.push(null);
    }
}

ranking = _.sortBy(ranking, r => r.totalScore).reverse();

 for (let i = 0; i < ranking.length; i++) {
     ranking[i].rank = i + 1;
 }
const recordTable = new RecordTable();
recordTable.render(ranking);
