import { TimeGraphData } from './TimeGraphData';

export interface MetricsData {
    codeCount: number;
    documentCount: number;
    pptCount: number;
    numDiffModsCount: number;
    avgResources: number;
    timeGraphData: TimeGraphData;
}