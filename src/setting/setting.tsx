/** @jsx jsx */
import {
  type DataSourceJson,
  DataSourceTypes,
  jsx,
  css,
  DataSourceManager,
  SessionManager,
  loadArcGISJSAPIModules,
  DataSourceStatus
} from 'jimu-core';
import type { AllWidgetSettingProps } from 'jimu-for-builder';
import { Button, TextInput, Label } from 'jimu-ui';
import { MapWidgetSelector } from 'jimu-ui/advanced/setting-components';
import { DEFAULT_CONFIG, SCHEMA } from '../constants';
import type { IMConfig } from '../config';
import { mockFeatureServerResponse, spatialReference } from '../mock-data';

const sm = new SessionManager()

const settingStyle = css`
  .setting-section {
    margin-bottom: 16px;
    padding: 12px;
    background-color: #f8f8f8;
    border-radius: 4px;
  }
  .setting-label {
    font-weight: 500;
    margin-bottom: 8px;
    color: #333;
  }
  .setting-row {
    margin-bottom: 8px;
  }
  .text-secondary {
    color: #6c757d;
  }
  .text-sm {
    font-size: 0.875rem;
  }
`;

const Setting = (props: AllWidgetSettingProps<IMConfig>) => {
  const dsManager = DataSourceManager.getInstance();

  const setDataSource = () => {
    const outputDsJsons: DataSourceJson[] = [
      {
        id: `${props.id}-output`,
        isOutputFromWidget: true,
        isDataInDataSourceInstance: true,
        type: DataSourceTypes.FeatureLayer,
        label: 'mock data FeatureLayer',
        geometryType: 'esriGeometryPoint',
        data: mockFeatureServerResponse.features.map(feature => ({
          ...feature,
          geometry: {
            ...feature.geometry,
            spatialReference: feature.geometry.spatialReference
          }
        })),
        schema: SCHEMA,
        originDataSources: []
      },
    ];

    props.onSettingChange({ id: props.id }, outputDsJsons);
    
    setTimeout(() => {
      updateRecords();
    }, 500);
  };

  const onLayerChange = (url: string) => {
    props.onSettingChange({
      id: props.id,
      config: {
        ...props.savedConfig,
        featureUrl: url,
      },
    });
  };

  const onMapSelect = (useMapWidgetIds: string[]) => {
    props.onSettingChange({
      id: props.id,
      useMapWidgetIds: useMapWidgetIds
    });
  };

  const createFeatureLayer = async () => {
    try {
      const [FeatureLayer, Graphic, Point] = await loadArcGISJSAPIModules([
        'esri/layers/FeatureLayer',
        'esri/Graphic',
        'esri/geometry/Point'
      ]);

      const graphics = mockFeatureServerResponse.features.map(feature => {
        const point = new Point({
          x: feature.geometry.x,
          y: feature.geometry.y,
          spatialReference: spatialReference
        });

        return new Graphic({
          geometry: point,
          attributes: feature.attributes
        });
      });

      graphics.forEach(graphic => {
        if (graphic.geometry && !graphic.geometry.spatialReference) {
          graphic.geometry.spatialReference = spatialReference;
        }
      });

      const layer = new FeatureLayer({
        source: graphics,
        fields: mockFeatureServerResponse.fields.map(field => ({
          name: field.name,
          alias: field.alias,
          type: field.type.replace('esriFieldType', '').toLowerCase()
        })),
        objectIdField: mockFeatureServerResponse.objectIdFieldName,
        geometryType: 'point',
        spatialReference: spatialReference,
        title: 'Incidentes',
        popupTemplate: {
          title: '{incidente}',
          content: [
            {
              type: 'fields',
              fieldInfos: [
                { fieldName: 'incidente', label: SCHEMA.fields.incidente.alias },
                { fieldName: 'Emitente', label: SCHEMA.fields.Emitente.alias },
                { fieldName: 'gerencia', label: SCHEMA.fields.gerencia.alias },
                { 
                  fieldName: 'data_hora', 
                  label: SCHEMA.fields.data_hora.alias,
                  format: {
                    dateFormat: 'short-date-short-time'
                  }
                },
                { fieldName: 'area_atendida', label: SCHEMA.fields.area_atendida.alias },
                { fieldName: 'area_negocio', label: SCHEMA.fields.area_negocio.alias },
                { fieldName: 'ocorrencia', label: SCHEMA.fields.ocorrencia.alias },
                { fieldName: 'gradacao', label: SCHEMA.fields.gradacao.alias },
                { fieldName: 'municipio', label: SCHEMA.fields.municipio.alias },
                { fieldName: 'uf', label: SCHEMA.fields.uf.alias },
                { fieldName: 'projeto', label: SCHEMA.fields.projeto.alias },
                { fieldName: 'qnt_pessoas_envolvidas', label: SCHEMA.fields.qnt_pessoas_envolvidas.alias },
                { fieldName: 'nome_imovel', label: SCHEMA.fields.nome_imovel.alias },
                { fieldName: 'cadastro_imovel', label: SCHEMA.fields.cadastro_imovel.alias },
                { fieldName: 'equipe_vistoria', label: SCHEMA.fields.equipe_vistoria.alias }
              ]
            }
          ]
        }
      });

      return layer;
    } catch (error) {
      console.error('Erro ao criar FeatureLayer:', error);
      return null;
    }
  };

  const updateRecords = async () => {
    const dataSourceId = `${props.id}-output`;
    const dataSource = DataSourceManager.getInstance().getDataSource(dataSourceId);
    
    if (!dataSource) {
      console.error('DataSource not found. Ensure it was created.');
      return;
    }

    try {
      const featureLayer = await createFeatureLayer();
      
      if (!featureLayer) {
        console.error('Error creating FeatureLayer');
        return;
      }

      const processedFeatures = mockFeatureServerResponse.features.map(feature => {
        return {
          ...feature,
          geometry: {
            ...feature.geometry,
            spatialReference: spatialReference
          }
        };
      });

      const checkAndUpdateSource = () => {
        if (typeof dataSource['updateSourceByFeatures'] === 'function') {
          
          dataSource.setStatus(DataSourceStatus.NotReady);
          dataSource.setCountStatus(DataSourceStatus.NotReady);
          
          dataSource.setSourceRecords([dataSource.buildRecord(processedFeatures)]);
          
          dataSource.setStatus(DataSourceStatus.Unloaded);
          
        } else {
          
          setTimeout(checkAndUpdateSource, 500);
        }
      };
      
      checkAndUpdateSource();
    } catch (error) {
      console.error('Error updating records:', error);
    }
  };

  return (
    <div className='widget-setting-demo p-2' css={settingStyle}>
      {props.outputDataSources?.length ? (
        <div>
          <div className="setting-section">
            <Label className="setting-label">Data Source Configuration</Label>
            <div className="setting-row">
              <div>Feature Url:</div>
              <TextInput
                className='w-100 mb-2'
                onAcceptValue={onLayerChange}
                defaultValue={props.config.featureUrl}
              />
            </div>
          </div>
          
          <div className="setting-section">
            <Label className="setting-label">Map Configuration</Label>
            <div className="setting-row">
              <div className="mb-2">Select a map widget to display the data:</div>
              <MapWidgetSelector
                onSelect={onMapSelect}
                useMapWidgetIds={props.useMapWidgetIds}
              />
            </div>
            <div className="setting-row mt-2">
              <div className="text-sm text-secondary">
                This widget needs a map to display the geographic data. Select a map widget from the list above.
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="setting-section">
          <Label className="setting-label">Data Source Initialization</Label>
          <div className="setting-row">
            <Button 
              type="primary" 
              className="w-100"
              onClick={setDataSource}
            >
              Create output data source
            </Button>
            <div className="text-sm text-secondary mt-2">
              Click the button above to create an output data source that will be used by the widget.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

Setting.getFullConfig = (config: IMConfig) => {
  return DEFAULT_CONFIG.merge(config, { deep: true });
};

export default Setting;
