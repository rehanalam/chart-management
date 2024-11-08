import { useEffect, useState } from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useLazyGetFredObservationsByIdQuery } from '../../redux/rootApis';
import { IObservationsSettingsFormValues, ScreenEnum } from '.';
import { Button, message, Spin, Typography } from 'antd';
import dayjs from 'dayjs';
import {
  DEFAULT_OBSERVATION_END,
  DEFAULT_OBSERVATION_START,
  UnitsEnum,
} from './ObservationSettings';
import { LoadingOutlined } from '@ant-design/icons';
import ReduxModule from '../../utils/modules/redux';
import { addObservations, updateObservations } from '../../redux/rootSlices';
import ChartSettingsForm from './ChartSettingsForm';
import ChartComponent from '../Charts';
import { generateRandomId } from '../../utils/common';
import SeriesModule from 'src/utils/modules/series';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface IChartPreviewProps {
  isEdit: boolean;
  seriesId: string;
  formData: IObservationsSettingsFormValues | null;
  seriesData?: SeriesModule.IFredSeriesResponse;
  defaultChartData?: SeriesModule.IObservationState;
  onScreenChange: (screen: ScreenEnum) => void;
  onCloseModal?: () => void;
}

const ChartPreview = ({
  isEdit,
  formData,
  seriesId,
  seriesData,
  defaultChartData,
  onScreenChange,
  onCloseModal,
}: IChartPreviewProps) => {
  const [chartSettings, setChartSettings] = useState(
    defaultChartData
      ? defaultChartData.chartSettings
      : {
          title: seriesData?.seriess?.[0]?.title || 'Value Over Time',
          yAxisLabel: seriesData?.seriess?.[0]?.units || 'Y axis',
          lineColor: '#4bc0c0',
          lineStyle: 'solid',
          chartType: 'line',
        }
  );

  const dispatch = ReduxModule.useAppDispatch();

  const [getObservationsById, { data: observationResp, isLoading }] =
    useLazyGetFredObservationsByIdQuery();

  const getObservations = async (body: SeriesModule.IObservationPayload) => {
    try {
      const resp = await getObservationsById(body).unwrap();

      setChartSettings({
        ...chartSettings,
        yAxisLabel:
          UnitsEnum[resp.units.toUpperCase() as keyof typeof UnitsEnum],
      });
    } catch {
      message.success('Error on getting observation data');
    }
  };

  const onEditChartClick = async () => {
    if (defaultChartData && observationResp && formData) {
      await dispatch(
        updateObservations({
          id: defaultChartData?.id,
          updatedData: {
            ...observationResp,
            chartSettings,
            id: generateRandomId(),
            seriesId,
            observationSettings: formData,
          },
        })
      );
    }
    onCloseModal?.();
    onScreenChange(ScreenEnum.SEARCH);
  };

  const onAddChartClick = async () => {
    if (observationResp && formData) {
      await dispatch(
        addObservations({
          ...observationResp,
          chartSettings,
          id: generateRandomId(),
          seriesId,
          observationSettings: formData,
        })
      );

      onCloseModal?.();
      onScreenChange(ScreenEnum.SEARCH);
    }
  };

  useEffect(() => {
    if (formData) {
      const { observationPeriod, ...otherValues } = formData;
      // Extract start and end dates from the form
      const observationStart = observationPeriod
        ? dayjs(observationPeriod[0]).format('YYYY-MM-DD')
        : DEFAULT_OBSERVATION_START;
      const observationEnd = observationPeriod
        ? dayjs(observationPeriod[1]).format('YYYY-MM-DD')
        : DEFAULT_OBSERVATION_END;

      if (seriesId) {
        getObservations({
          ...otherValues,
          observationStart,
          observationEnd,
          seriesId,
        });
      } else {
        message.error('Series ID unavailable');
      }
    }
  }, [formData]);

  const handleSettingsChange = (newSettings: SeriesModule.IChartSettings) => {
    setChartSettings(newSettings);
  };

  return (
    <div className="flex flex-col">
      <Typography.Title level={5}>Chart Settings</Typography.Title>
      <ChartSettingsForm
        settings={chartSettings}
        onSettingsChange={handleSettingsChange}
      />

      <Typography.Title level={5}>Chart Preview</Typography.Title>
      {isLoading && <Spin indicator={<LoadingOutlined spin />} size="large" />}
      {observationResp && (
        <div className="py-6">
          <ChartComponent
            observationData={observationResp}
            settings={chartSettings}
          />
        </div>
      )}

      <div className="flex justify-end pt-6 gap-2 ">
        <Button
          type="default"
          onClick={() => onScreenChange(ScreenEnum.SETTINGS)}
        >
          Back
        </Button>
        {isEdit ? (
          <Button type="primary" onClick={onEditChartClick}>
            Edit Chart
          </Button>
        ) : (
          <Button type="primary" onClick={onAddChartClick}>
            Add Chart
          </Button>
        )}
      </div>
    </div>
  );
};

export default ChartPreview;
