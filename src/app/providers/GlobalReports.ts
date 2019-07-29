import { Injectable } from "@angular/core";
import { MetricsData } from '../models/MetricsData';

/**
 * Global Reports for the metrics of Reports Page
 */

@Injectable()
export class GlobalReports {

    /**
     * Metrics data variable
     */
    metricsData: MetricsData = null;
}