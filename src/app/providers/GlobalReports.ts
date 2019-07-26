import { Injectable } from "@angular/core";
import { MetricsData } from '../models/MetricsData';

@Injectable()
export class GlobalReports {

    metricsData: MetricsData = null;
}