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
} from './ObservationSettings';
import { LoadingOutlined } from '@ant-design/icons';
import ReduxModule from '../../utils/modules/redux';
import { addObservations, updateObservations } from '../../redux/rootSlices';
import ChartSettingsForm from './ChartSettingsForm';
import ChartComponent from '../Charts';
import { dateFormat, generateRandomId } from '../../utils/common';
import SeriesModule from '../../utils/modules/series';

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
  const dispatch = ReduxModule.useAppDispatch();
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

  const [getObservationsById, { data: observationResp, isLoading }] =
    useLazyGetFredObservationsByIdQuery();

  const getObservations = async (body: SeriesModule.IObservationPayload) => {
    try {
      const resp = await getObservationsById(body).unwrap();

      setChartSettings({
        ...chartSettings,
        yAxisLabel:
          SeriesModule.UnitsEnum[
            resp.units.toUpperCase() as keyof typeof SeriesModule.UnitsEnum
          ],
      });
    } catch {
      message.error('Error on getting observation data');
    }
  };

  useEffect(() => {
    if (formData && Object.keys(formData).length > 0 && seriesId) {
      const { observationPeriod, ...otherValues } = formData;
      // Extract start and end dates from the form
      const observationStart = observationPeriod
        ? dayjs(observationPeriod[0]).format(dateFormat)
        : DEFAULT_OBSERVATION_START;
      const observationEnd = observationPeriod
        ? dayjs(observationPeriod[1]).format(dateFormat)
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

  const onEditChartClick = async () => {
    if (defaultChartData && observationResp && formData) {
      await dispatch(
        updateObservations({
          id: defaultChartData?.id,
          updatedData: {
            ...observationResp,
            chartSettings,
            id: defaultChartData?.id,
            seriesId,
            observationSettings: {
              ...formData,
              observationPeriod: [
                dayjs(formData.observationPeriod[0]).format(dateFormat),
                dayjs(formData.observationPeriod[1]).format(dateFormat),
              ],
            },
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
          observationSettings: {
            ...formData,
            observationPeriod: [
              dayjs(formData.observationPeriod[0]).format(dateFormat),
              dayjs(formData.observationPeriod[1]).format(dateFormat),
            ],
          },
        })
      );

      onCloseModal?.();
      onScreenChange(ScreenEnum.SEARCH);
    }
  };

  const handleSettingsChange = (newSettings: SeriesModule.IChartSettings) => {
    setChartSettings(newSettings);
  };

  return (
    <div className="flex flex-col">
      {/* Settigns */}
      <Typography.Title level={5}>Chart Settings</Typography.Title>
      <ChartSettingsForm
        settings={chartSettings}
        onSettingsChange={handleSettingsChange}
      />

      {/* Preview */}
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

      {/* Footer */}
      <div className="flex justify-end pt-6 gap-2 ">
        <Button
          type="default"
          onClick={() => onScreenChange(ScreenEnum.SETTINGS)}
        >
          Back
        </Button>

        {isEdit ? (
          <Button type="primary" onClick={onEditChartClick}>
            Save Chart
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
