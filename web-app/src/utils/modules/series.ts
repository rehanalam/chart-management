import { IObservationsSettingsFormValues } from 'src/components/AddChartModal';

namespace SeriesModule {
  export interface IChartSettings {
    title: string;
    yAxisLabel: string;
    lineColor: string;
    lineStyle?: string;
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
  }

  export interface IObservationState extends IObservationResponse {
    id: string;
    seriesId: string;
    chartSettings: IChartSettings;
    observationSettings?: IObservationsSettingsFormValues;
  }

  export interface IObservationPayload {
    seriesId: string;
    frequency: string;
    units: string;
    limit: number;
    observationStart: string;
    observationEnd: string;
  }

  export enum UnitsEnum {
    LIN = 'Levels (No transformation)',
    CHG = 'Change',
    CH1 = 'Change from Year Ago',
    PCH = 'Percent Change',
    PC1 = 'Percent Change from Year Ago',
    PCA = 'Compounded Annual Rate of Change',
    CCH = 'Continuously Compounded Rate of Change',
    CCA = 'Continuously Compounded Annual Rate of Change',
    LOG = 'Natural Log',
  }

  export enum FrequencyEnum {
    q = 'Quarterly',
    sa = 'Semiannual',
    a = 'Annual',
    d = 'Daily',
    w = 'Weekly',
    bw = 'Biweekly',
    m = 'Monthly',
    wef = 'Weekly, Ending Friday',
    weth = 'Weekly, Ending Thursday',
    wew = 'Weekly, Ending Wednesday',
    wetu = 'Weekly, Ending Tuesday',
    wem = 'Weekly, Ending Monday',
    wesu = 'Weekly, Ending Sunday',
    wesa = 'Weekly, Ending Saturday',
    bwew = 'Biweekly, Ending Wednesday',
    bwem = 'Biweekly, Ending Monday',
  }

  export const frequencyMapping: Record<string, FrequencyEnum[]> = {
    Annual: [FrequencyEnum.a],
    Semiannual: [FrequencyEnum.a, FrequencyEnum.sa],
    Quarterly: [FrequencyEnum.a, FrequencyEnum.sa, FrequencyEnum.q],
    Monthly: [
      FrequencyEnum.a,
      FrequencyEnum.sa,
      FrequencyEnum.q,
      FrequencyEnum.m,
    ],
    Weekly: [
      FrequencyEnum.a,
      FrequencyEnum.sa,
      FrequencyEnum.q,
      FrequencyEnum.m,
      FrequencyEnum.w,
      FrequencyEnum.wef,
      FrequencyEnum.weth,
      FrequencyEnum.wew,
      FrequencyEnum.wetu,
      FrequencyEnum.wem,
      FrequencyEnum.wesu,
      FrequencyEnum.wesa,
    ],
    Biweekly: [
      FrequencyEnum.a,
      FrequencyEnum.sa,
      FrequencyEnum.q,
      FrequencyEnum.m,
      FrequencyEnum.w,
      FrequencyEnum.bw,
      FrequencyEnum.bwew,
      FrequencyEnum.bwem,
    ],
    Daily: [
      FrequencyEnum.a,
      FrequencyEnum.sa,
      FrequencyEnum.q,
      FrequencyEnum.m,
      FrequencyEnum.w,
      FrequencyEnum.bw,
      FrequencyEnum.d,
    ],
  };

  const FrequencyEnumObject = Object.fromEntries(
    Object.entries(FrequencyEnum).map(([key, value]) => [value, key])
  );

  export const getFilteredFrequencyOptions = (
    frequency: string | undefined,
    frequencyShort: string | undefined
  ) => {
    const allowedFrequencies = frequency
      ? frequencyMapping[frequency]
      : Object.values(FrequencyEnum);

    const filteredOptions = allowedFrequencies.map((value) => ({
      label: value,
      value: FrequencyEnumObject[value],
    }));
    return filteredOptions;
  };

  export const computeSelectOption = async (
    result: SeriesModule.IFredSeriesResponse
  ) => {
    // Example of an async operation for each series (e.g., fetch additional data)
    const options = await Promise.all(
      result.seriess.map(async (series) => {
        return {
          label: series.title,
          value: series.id,
          description: series.notes,
        };
      })
    );
    return options;
  };
}

export default SeriesModule;
