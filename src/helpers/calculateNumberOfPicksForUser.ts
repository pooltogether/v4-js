import { BigNumber, constants } from 'ethers';
import { PrizeDistribution } from '../types';

export function calculateNumberOfPicksForUser(
    drawSettings: PrizeDistribution,
    normalizedBalance: BigNumber,
): number {
    const numberOfPicksForDraw = drawSettings.numberOfPicks;
    return numberOfPicksForDraw.mul(normalizedBalance).div(constants.WeiPerEther).toNumber();
}
