namespace SeriesModule {
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
}
