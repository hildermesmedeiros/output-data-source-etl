/** @jsx jsx */
import { 
  React,
  jsx,
  css,
  type AllWidgetProps,
  DataSourceManager,
  DataSourceStatus,
  type SerializedStyles,
  loadArcGISJSAPIModules,
  SessionManager
} from 'jimu-core'
import type { IMConfig } from '../config'
import { useEffect } from 'react'
import { DEFAULT_CONFIG, SCHEMA } from '../constants'
import { JimuMapView, JimuMapViewComponent } from 'jimu-arcgis';
import { mockFeatureServerResponse, spatialReference } from '../mock-data';
import { fetchData} from '../fetcher';

const { useState } = React

const Widget = (props: AllWidgetProps<IMConfig>) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [errMsg, setErrMsg] = useState<string>(null)
  const [jimuMapView, setJimuMapView] = useState<JimuMapView>();
  const [featureLayer, setFeatureLayer] = useState<any>(null);
  const [isUpdatingOnline, setIsUpdatingOnline] = useState<boolean>(false);
  const [isUsingOnlineData, setIsUsingOnlineData] = useState<boolean>(false);
  const [hasFeatureLayer, setHasFeatureLayer] = useState<boolean>(false);

  
  const handleActiveViewChange = (view: JimuMapView) => {
    setJimuMapView(view);
  };

  const createGraphics = async () => {
    try {
      const dsId = props.outputDataSources?.[0];
      const dataSource = DataSourceManager.getInstance().getDataSource(dsId);
      const records = dataSource?.getSourceRecords() || [];

      const simpleGraphics = [];
      
      for (const record of records) {
        const recordAny = record as any;
        
        let x = 0, y = 0, attributes = {};
        
        if (recordAny.feature && recordAny.feature.geometry) {
          x = recordAny.feature.geometry.x;
          y = recordAny.feature.geometry.y;
          attributes = {...recordAny.feature.attributes};
        } 
        else if (recordAny.geometry) {
          x = recordAny.geometry.x;
          y = recordAny.geometry.y;
          attributes = {...recordAny.attributes};
        }
        else if (recordAny.attributes) {
          const geom = recordAny.geometry || {};
          x = geom.x || 0;
          y = geom.y || 0;
          attributes = {...recordAny.attributes};
        }
        
        simpleGraphics.push({
          geometry: {
            type: "point",
            x: x,
            y: y,
            spatialReference: {
              wkid: spatialReference.wkid
            }
          },
          attributes: attributes
        });
      }
      
      return simpleGraphics;
    } catch (error) {
      console.error('Error creating graphics:', error);
      return [];
    }
  };

  const addFeatureLayer = async () => {
    try {
      if (!jimuMapView || !jimuMapView.view) {
        console.error('JimuMapView is not available');
        return null;
      }

      const existingLayer = jimuMapView.view.map.allLayers.find(l => l.title === 'Incidentes');
      if (existingLayer) {
        jimuMapView.view.map.remove(existingLayer);
      }

      const simpleGraphics = await createGraphics();
      
      if (!simpleGraphics || simpleGraphics.length === 0) {
        console.warn('No graphics available to add');
        return null;
      }

      const simpleFields = mockFeatureServerResponse.fields.map(field => {
        if (field.name === 'globalid' || field.name === 'parent_globalid') {
          return {
            name: field.name,
            alias: field.alias,
            type: 'guid',
            nullable: false,
            editable: false
          };
        }

        let fieldType = field.type.replace('esriFieldType', '').toLowerCase();
        if (!['string', 'small-integer', 'integer', 'double', 'date', 'oid', 'global-id'].includes(fieldType)) {
          fieldType = 'string';
        }

        setHasFeatureLayer(true);
        return {
          name: field.name,
          alias: field.alias,
          type: fieldType
        };
      });

      const [FeatureLayer] = await loadArcGISJSAPIModules([
        'esri/layers/FeatureLayer'
      ]);
      
      const layer = new FeatureLayer({
        source: simpleGraphics,
        fields: simpleFields,
        objectIdField: mockFeatureServerResponse.objectIdFieldName,
        geometryType: "point",
        spatialReference: {
          wkid: spatialReference.wkid
        },
        title: 'Incidentes',
        popupTemplate: {
          title: '{incidente}',
          content: [{
            type: 'fields',
            fieldInfos: Object.entries(SCHEMA.fields).map(([fieldName, fieldInfo]) => ({
              fieldName: fieldName,
              label: fieldInfo.alias,
              visible: true,
              format: fieldName === 'data_hora' ? {
                dateFormat: 'short-date-short-time'
              } : undefined
            }))
          }]
        }
      });

      jimuMapView.view.map.add(layer);
      setFeatureLayer(layer);

      return layer;
    } catch (error) {
      console.error('Error creating FeatureLayer:', error);
      setErrMsg(`Error creating layer: ${error.message}`);
      return null;
    }
  };

  useEffect(() => {
    if (jimuMapView) {
      const existingLayers = jimuMapView.view.map.allLayers.filter(l => 
        l.title === 'Incidentes'
      );
      
      existingLayers.forEach(layer => {
        jimuMapView.view.map.remove(layer);
      });
    }
  }, [jimuMapView]);

  useEffect(() => {
    if (props.outputDataSources?.[0]) {
      setIsLoading(true);
      
      const dsId = props.outputDataSources[0];
      const dsManager = DataSourceManager.getInstance();
      
      let ds = dsManager.getDataSource(dsId);
      
      if (ds) {
        updateDataSource(ds);
      } else {
        dsManager.createDataSource(dsId)
          .then(createdDs => {
            updateDataSource(createdDs);
          })
          .catch(error => {
            setErrMsg('Error creating data source: ' + error.message);
            setIsLoading(false);
          });
      }
    }
  }, [props.outputDataSources]);


  const updateDataSource = (ds: any) => {
    if (!ds) {
      setIsLoading(false);
      return;
    }
    
    try {
      const processedFeatures = mockFeatureServerResponse.features.map(feature => {
        return {
          attributes: { ...feature.attributes },
          geometry: { 
            ...feature.geometry,
            spatialReference: spatialReference
          }
        };
      });
      
      const checkAndUpdateSource = () => {
        const dataSource = DataSourceManager.getInstance().getDataSource(ds.id);
        
        if (DataSourceStatus.NotReady) {
          
          dataSource.setStatus(DataSourceStatus.NotReady);
          dataSource.setCountStatus(DataSourceStatus.NotReady);
          
          const records = processedFeatures.map(feature => dataSource.buildRecord(feature));
          dataSource.setSourceRecords(records);
          dataSource.setStatus(DataSourceStatus.Unloaded); //MUST BE UNLOADED

          if (jimuMapView && processedFeatures.length > 0) {
            addFeatureLayer();
          }
          
          setErrMsg(null);
          setIsLoading(false);
          
        } else {
          
          setTimeout(checkAndUpdateSource, 500);
        }
      };
      
      checkAndUpdateSource();
    } catch (error) {
      setErrMsg('Error updating data source: ' + error.message);
      setIsLoading(false);
    }
  };


  const updateOnlineData = async () => {
    if (!props.config.featureUrl) {
      setErrMsg('Feature Service URL not configured. Configure it in the widget settings.');
      return;
    }

    setIsUpdatingOnline(true);
    setErrMsg(null);

    try {
      const onlineData = await fetchData(props.config.featureUrl);
      
      if (!onlineData || !onlineData.features) {
        throw new Error('Invalid online data');
      }

      const dsId = props.outputDataSources?.[0];
      if (!dsId) {
        throw new Error('Data source not configured');
      }

      const dataSource = DataSourceManager.getInstance().getDataSource(dsId);
      if (!dataSource) {
        throw new Error('Data source not found');
      }

      const simpleFeatures = onlineData.features.map(feature => {
        const geom = feature.geometry || {};
        
        return {
          geometry: {
            type: "point",
            x: (geom as any).x || 0,
            y: (geom as any).y || 0,
            spatialReference: {
              wkid: spatialReference.wkid
            }
          },
          attributes: {...feature.attributes}
        };
      });

      dataSource.setStatus(DataSourceStatus.NotReady);
      dataSource.setCountStatus(DataSourceStatus.NotReady);
      
      const records = simpleFeatures.map(feature => dataSource.buildRecord(feature));
      dataSource.setSourceRecords(records);
      dataSource.setStatus(DataSourceStatus.Unloaded);

      if (jimuMapView && hasFeatureLayer) {
        setTimeout(async () => {
          try {
            await addFeatureLayer();
          } catch (err) {
            console.error('Error adding layer after online data:', err);
            setErrMsg(`Error adding layer: ${err.message}`);
          }
        }, 500);
      }

      setErrMsg(null);
      setIsUsingOnlineData(true);
    } catch (error) {
      console.error('Error updating online data:', error);
      setErrMsg(`Error updating online data: ${error.message}`);
    } finally {
      setIsUpdatingOnline(false);
    }
  };

  return (
    <div className='widget-demo jimu-widget m-2' css={getStyle()}>
      {!props.outputDataSources?.[0] ? (
        <h1>Please configure the output data source in the settings</h1>
      ) : (
        <div>
          <h1>Output Data Source (Valid ESRI JSON)</h1>
          
          <div className='widget-controls'>
            <button 
              className='jimu-btn jimu-btn-default m-2'
              onClick={updateOnlineData}
              disabled={isLoading || isUpdatingOnline || !props.config.featureUrl}
              title={!props.config.featureUrl ? 'Configure the Feature Service URL in the settings' : ''}
            >
              {isUpdatingOnline ? 'Updating online data...' : 'Update Online Data'}
            </button>

            <button 
              className='jimu-btn jimu-btn-default m-2'
              onClick={() => addFeatureLayer()}
              disabled={!jimuMapView || isLoading || isUpdatingOnline}
            >
              Add Feature Layer
            </button>
          </div>
          
          <JimuMapViewComponent 
            useMapWidgetId={props.useMapWidgetIds?.[0]} 
            onActiveViewChange={handleActiveViewChange}
          />
          
          <div className='query-results'>
            {isLoading || isUpdatingOnline ? (
              'Loading ...'
            ) : errMsg ? (
              <div className='text-danger'>{errMsg}</div>
            ) : (
              <div>
                <div>Status: <span className='text-success'>Data loaded successfully</span></div>
                <div>Map: {jimuMapView ? <span className='text-success'>Connected</span> : <span className='text-danger'>Not connected</span>}</div>
                <div>FeatureLayer: {featureLayer ? <span className='text-success'>Added</span> : <span className='text-danger'>Not added</span>}</div>
                <div>Number of records: {DataSourceManager.getInstance().getDataSource(props.outputDataSources?.[0])?.getSourceRecords()?.length || 0}</div>
                <div>Source: {isUsingOnlineData ? <span className='text-success'>Online ETL Data</span>  : <span>Mock Data</span>}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

Widget.getFullConfig = (config: IMConfig) => DEFAULT_CONFIG.merge(config, { deep: true })

export default Widget

function getStyle(): SerializedStyles {
  return css`
    .query-results {
      margin-top: 10px;
      border: 1px solid #ccc;
      padding: 10px;
      max-height: 400px;
      overflow-y: auto;
    }
    
    .widget-controls {
      display: flex;
      flex-wrap: wrap;
      margin-top: 10px;
      padding: 5px;
      background-color: #f0f0f0;
      border-radius: 4px;
    }
    
    .text-success {
      color: #28a745;
      font-weight: bold;
    }
    
    .text-danger {
      color: #dc3545;
      font-weight: bold;
    }
    
    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    .jimu-widget-setting--map-selector {
      min-height: 300px;
      margin-bottom: 10px;
    }
  `
}
