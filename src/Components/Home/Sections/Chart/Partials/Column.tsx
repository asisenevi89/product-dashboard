import React, { memo, useEffect } from 'react';
import HighCharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';
import { DEFAULT_CURRENCY } from '../../../../../Utils/Constants';

// To enable context menu
Exporting(HighCharts);

type ColumnChartPropType = {
  series: HighCharts.SeriesColumnOptions[],
  title?: HighCharts.TitleOptions,
  subTitle?: HighCharts.SubtitleOptions,
  plotOptions?:  HighCharts.PlotOptions,
  yAxis?: HighCharts.YAxisOptions,
  xAxis: HighCharts.XAxisOptions,
  tooltip?: HighCharts.TooltipOptions,
};

const defaultTitleOptions: HighCharts.TitleOptions = {
  text: 'Products in selected Category',
  align: 'left',
};

const defaultSubtitleOptions: HighCharts.SubtitleOptions = {
  text: '',
  align: 'left',
};

const defaultPlotOptions: HighCharts.PlotOptions = {
  series: {
    allowPointSelect: true,
    cursor: 'pointer',
  },
};

const yAxisDefaultOptions: HighCharts.YAxisOptions = {
  title: {
    text: `prices in ${DEFAULT_CURRENCY}`,
  },
};

const tooltipDefaultOptions: HighCharts.TooltipOptions = {
  valueSuffix: ` ${DEFAULT_CURRENCY}`
};

const exporting: HighCharts.ExportingOptions = {
  buttons: {
    contextButton: {
      menuItems: [
        'viewFullscreen',
        'printChart',
        'downloadPNG',
        'downloadJPEG',
        'downloadPDF',
        'downloadSVG',
      ],
    },
  },
};

const ColumnChart = (props: ColumnChartPropType) => {
  const {
    title,
    subTitle,
    plotOptions,
    series,
    yAxis,
    xAxis,
    tooltip,
  } = props
  useEffect(() => {
    chartRender();
  },[props]);

  const chartRender = () => {
    HighCharts.chart({
      chart: {
        type: 'column',
        renderTo: 'column-chart-container'
      },
      title: {
        ...defaultTitleOptions,
        ...title
      },
      yAxis: {
        ...yAxisDefaultOptions,
        ...yAxis
      },
      subtitle: {
        ...defaultSubtitleOptions,
        ...subTitle
      },
      plotOptions: {
        ...defaultPlotOptions,
        ...plotOptions,
      },
      tooltip: {
        ...tooltipDefaultOptions,
        ...tooltip
      },
      xAxis,
      series,
      exporting,
    });
  };

  return (
    <div className="column-chart-container" id="column-chart-container" />
  );
};


export default memo(ColumnChart)