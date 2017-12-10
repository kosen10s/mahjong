import * as React from 'react';
import * as ReactDOM from 'react-dom'

export interface RankingItem {
    rank?: number;
    name: string;
    totalScore: number;
    scoreTrans: Array<number | null>;
}

export type Ranking = RankingItem[];

export class RecordTable {
    private data: Ranking;

    public render(data: Ranking) {
        this.data = data;

        ReactDOM.render(
            <table className='table record-table'>
                <thead>
                <tr>
                    <th className='right'>順位</th>
                    <th className='center'>名前</th>
                    {this.data[0].scoreTrans.map((_, i) => {
                        return (<th className='right'>第{i + 1}回</th>)
                    })}
                    <th className='right'>総合</th>
                </tr>
                </thead>
                <tbody>
                {this.data.map((d: RankingItem) => {
                    return (
                        <tr>
                            <td className='right'>{d.rank}</td>
                            <td className='center'>{d.name}</td>
                            {d.scoreTrans.map(s => {
                                return (<td className='right'>{this.setSign(s) || '---'}</td>)
                            })}
                            <td className='right'>{this.setSign(d.totalScore)}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
            , document.getElementById('record-table'));
    }

    // Set `+` or `±`  sign to the value
    // ex) 8 -> '+8', 0 -> '±0'
    private setSign(value: number | null): string | null {
        if (value === null) return null;
        if (value < 0) return `${value}`;
        if (value === 0) return '±0';
        return `+${value}`;
    }
}
