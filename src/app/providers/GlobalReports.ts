import { Injectable } from "@angular/core";
import { MetricsData } from '../models/MetricsData';

/**
 * Global Reports for the metrics of Reports Page, handles site-wide caching of reports metrics
 */
@Injectable()
export class GlobalReports {

    /**
     * Cached metrics data
     */
    metricsData: MetricsData = null;
}