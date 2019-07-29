import { TimeGraphData } from './TimeGraphData';

/** Metrics Data Interface for Reports Page */
export interface MetricsData {
    /** Number variable for number of codes */
    codeCount: number;
    /** Number variable for number of documents */
    documentCount: number;
    /** Number variable for number of power points */
    pptCount: number;
    /** Number variable for number of different modules */
    numDiffModsCount: number;
    /** Number variable for number of average resources per module */
    avgResources: number;
    /** TimeGraphData variable for the time graph data */
    timeGraphData: TimeGraphData;
}