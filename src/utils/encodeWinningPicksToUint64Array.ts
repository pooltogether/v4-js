import { defaultAbiCoder } from '@ethersproject/abi';
import { BigNumber } from '@ethersproject/bignumber';

import { sortByBigNumberAsc } from '.';
import { Claim, DrawResults } from '../types';

function encodeWinningPicksToUint64Array(
    userAddress: string,
    drawResults: DrawResults[],
    ticketAddress: string
): Claim {
    let claim: Claim = {
        ticketAddress,
        userAddress,
        drawIds: [],
        winningPickIndices: [],
        encodedWinningPickIndices: '',
    };
    if (drawResults.length === 0) {
        return claim;
    }

    drawResults.forEach(drawResult => {
        if (drawResult.totalValue.gt(BigNumber.from(0))) {
            claim.drawIds.push(drawResult.drawId);
            // now add the pickIndices data
            let winningPicks: BigNumber[] = [];
            for (const prizeAwardable of drawResult.prizes) {
                winningPicks.push(BigNumber.from(prizeAwardable.pick));
            }
            claim.winningPickIndices.push(winningPicks);
        }
    });

    claim.winningPickIndices = claim.winningPickIndices.map(data =>
        data.sort(sortByBigNumberAsc)
    );

    claim.encodedWinningPickIndices = defaultAbiCoder.encode(
        ['uint64[][]'],
        [claim.winningPickIndices]
    );

    return claim;
}

export default encodeWinningPicksToUint64Array;
