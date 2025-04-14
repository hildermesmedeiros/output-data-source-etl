import { spatialReference } from './mock-data';
import { SCHEMA } from './constants';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import { mockFeatureServerResponse } from './mock-data';

const fieldTypeMap = {
  'esriFieldTypeOID': 'oid',
  'esriFieldTypeString': 'string',
  'esriFieldTypeInteger': 'integer',
  'esriFieldTypeDouble': 'double',
  'esriFieldTypeDate': 'date',
  'esriFieldTypeGUID': 'guid',
  'esriFieldTypeGlobalID': 'global-id',
  'esriFieldTypeSmallInteger': 'small-integer',
  'esriFieldTypeLong': 'long',
  'esriFieldTypeSingle': 'single',
  'esriFieldTypeGeometry': 'geometry'
};

export interface EsriFeatureAttributes {
  objectid: number
  globalid: string
  nome: string
  incidente: string
  Emitente: string
  criada_por: string
  gerencia: string
  data_hora: number
  paralisa_operacao: string
  area_atendida: string
  area_negocio: string
  pessoas_comunicadas: string
  ocorrencia: string
  ocorrencia_associada: string
  gradacao: string
  pais: string
  uf: string
  municipio: string
  projeto: string
  avu: string
  resumo: string
  acoes: string
  repercussao_midia: string
  abrangencia_midia: string
  tipos_midia: string
  tecnologia_empregada: string
  houve_prisao_apreensao: string
  houve_recup_material: string
  ocorrencia_neutralizada: string
  impacto_ferrovia: string
  km_da_ferrovia: string
  potencial_crise: string
  presenca_policia: string
  qnt_pessoas_envolvidas: number
  tratativas: string
  pessoas: string
  empresas: string
  veiculos: string
  memoria_de_calculo: string
  ocorrencias_relacionadas: string
  Ident_tell: string
  Nome: string
  Proprietario: string
  Cadastro: string
  Atuacao: string
  Localizacao: string
  Estado: string
  Comarca: string
  Cartorio: string
  Registro: string
  Posse: string
  CCIR: string
  NIRF_ITR: string
  IPTU: string
  Status_Geo: string
  Cert_Inc: string
  N_Cert_Inc: string
  Area_Matri_ha: number | null
  Data_Levan: number | null
  Data_Atual: number | null
  Obs: string
  incidente_count: string
  CreationDate: number
  Creator: string
  EditDate: number
  Editor: string
  equipe_vistoria: string
  cadastro_imovel: string
  nome_imovel: string
  parent_objectid: number
  parent_globalid: string
  parent_CreationDate: number
  parent_Creator: string
  parent_EditDate: number
  parent_Editor: string
}

export interface EsriGeometry {
  x: number
  y: number
  spatialReference?: any
}

export interface EsriFeature {
  attributes: EsriFeatureAttributes
  geometry: EsriGeometry
}


export async function fetchData(featureUrl: string): Promise<{
  objectIdFieldName: string,
  uniqueIdField: { name: string, isSystemMaintained: boolean },
  geometryType: string,
  spatialReference: any,
  fields: Array<{ name: string, type: string, alias: string }>,
  features: EsriFeature[]
}> {
  try {
    const featureLayer = new FeatureLayer({ 
      url: featureUrl
    });

    await featureLayer.load();

    const query = featureLayer.createQuery();
    query.outFields = ['*'];
    query.returnGeometry = true;
    query.orderByFields = ['objectid ASC'];
    query.where = '1=1';
    query.start = 0;
    query.num = 1000;

    let allFeatures: __esri.Graphic[] = [];
    let result;

    do {
      result = await featureLayer.queryFeatures(query);
      allFeatures = allFeatures.concat(result.features);
      query.start += result.features.length;
    } while (result.exceededTransferLimit);


    const oidField = featureLayer.objectIdField;
    
    if (featureLayer.relationships && featureLayer.relationships.length > 0) {
      const relationshipId = featureLayer.relationships[0].id;
      const oids = allFeatures.map(f => f.attributes[oidField]);
      
      const relationshipQuery = {
        objectIds: oids,
        relationshipId: relationshipId,
        outFields: ['*'],
        returnGeometry: true
      };
      
      try {
        const relatedResponse = await featureLayer.queryRelatedFeatures(relationshipQuery);

        
        oids.forEach((oid) => {
          if (relatedResponse[oid]) {
            relatedResponse[oid].features.forEach(relatedFeature => {
              const mainFeature = allFeatures.find(
                f => f.attributes[oidField] === oid
              );
              if (mainFeature && relatedFeature?.attributes) {
                const prefixedAttributes = Object.entries(relatedFeature.attributes).reduce((acc, [key, value]) => {
                  acc[`parent_${key}`] = value;
                  return acc;
                }, {});
                
                mainFeature.attributes = {
                  ...mainFeature.attributes,
                  ...prefixedAttributes
                };
                
                if (relatedFeature.geometry) {
                  mainFeature.geometry = relatedFeature.geometry;
                }
              }
            });
          }
        });
      } catch (error) {
        console.warn('Error fetching related data:', error);
      }
    } else {
      console.warn('No relationships defined in the layer.');
    }

    const features = allFeatures.map(feature => {
      let geometryData = {
        x: 0,
        y: 0,
        spatialReference
      };

      if (feature.geometry) {
        if (feature.geometry.type === 'point') {
          geometryData = {
            x: (feature.geometry as any).x || 0,
            y: (feature.geometry as any).y || 0,
            spatialReference
          };
        } else if ((feature.geometry as any).extent) {
          geometryData = {
            x: (feature.geometry as any).extent.center.x || 0,
            y: (feature.geometry as any).extent.center.y || 0,
            spatialReference
          };
        }
      }
      
      if ((!geometryData.x || !geometryData.y) && feature.attributes) {
        if (typeof feature.attributes.parent_x === 'number' && typeof feature.attributes.parent_y === 'number') {
          geometryData.x = feature.attributes.parent_x;
          geometryData.y = feature.attributes.parent_y;
        }
      }

      return {
        attributes: feature.attributes || {},
        geometry: geometryData
      };
    });

    const fields = Object.entries(SCHEMA.fields).map(([name, field]) => ({
      name,
      type: fieldTypeMap[field.esriType] || 'string',
      alias: field.alias
    }));

    return {
      objectIdFieldName: featureLayer.objectIdField || 'objectid',
      uniqueIdField: {
        name: featureLayer.objectIdField || 'objectid',
        isSystemMaintained: true
      },
      geometryType: 'esriGeometryPoint',
      spatialReference,
      fields,
      features
    };

  } catch (error) {
    console.error('Error fetching data:', error);
    return mockFeatureServerResponse;
  }
} 