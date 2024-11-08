namespace SeriesModule {
  export interface IChartSettings {
    title: string;
    yAxisLabel: string;
    lineColor: string;
    lineStyle: string;
    chartType: string;
  }
  export interface ISeries {
    id: string;
    realtime_start: string;
    realtime_end: string;
    title: string;
    observation_start: string;
    observation_end: string;
    frequency: string;
    frequency_short: string;
    units: string;
    units_short: string;
    seasonal_adjustment: string;
    seasonal_adjustment_short: string;
    last_updated: string;
    popularity: number;
    group_popularity: number;
    notes: string;
  }

  export interface IFredSeriesResponse {
    realtime_start: string;
    realtime_end: string;
    order_by: string;
    sort_order: string;
    count: number;
    offset: number;
    limit: number;
    seriess: ISeries[];
  }

  export interface IObservation {
    realtime_start: string;
    realtime_end: string;
    date: string;
    value: string;
  }

  export interface IObservationResponse {
    realtime_start: string;
    realtime_end: string;
    observation_start: string;
    observation_end: string;
    units: string;
    output_type: number;
    file_type: string;
    order_by: string;
    sort_order: string;
    count: number;
    offset: number;
    limit: number;
    observations: IObservation[];
    chartSettings?: IChartSettings;
  }

  export interface IObservationPayload {
    seriesId: string;
    frequency: string;
    units: string;
    limit: string;
    observationStart: string;
    observationEnd: string;
  }
}
