import { SCHEMA } from './constants';

// Referência espacial Web Mercator para ser usada em todo o widget
export const spatialReference = { wkid: 102100, latestWkid: 3857 };

export const mockFeatureServerResponse = {
  objectIdFieldName: 'objectid',
  uniqueIdField: {
    name: 'objectid',
    isSystemMaintained: true
  },
  geometryType: 'esriGeometryPoint',
  spatialReference: spatialReference,
  fields: Object.entries(SCHEMA.fields).map(([name, field]) => ({
    name,
    type: field.esriType,
    alias: field.alias
  })),
  features: [
    {
      attributes: {
        objectid: 13,
        globalid: 'cb218600-65f7-49f2-bb14-30bf3dc83404',
        nome: '',
        incidente: 'INC230504184856',
        Emitente: 'Bruno Gomes',
        criada_por: '',
        gerencia: 'Gerencia de atendimento',
        data_hora: new Date('2023-05-05T09:33:00.000Z').getTime(),
        paralisa_operacao: '',
        area_atendida: 'Gerencia de atendimento',
        area_negocio: 'Mina',
        pessoas_comunicadas: 'Maíra Soares',
        ocorrencia: 'Invasão',
        ocorrencia_associada: '',
        gradacao: 'Grave',
        pais: 'Brasil',
        uf: 'Minas Gerais',
        municipio: 'Brumadinho',
        projeto: 'Demonstação',
        avu: '',
        resumo: '',
        acoes: '',
        repercussao_midia: '',
        abrangencia_midia: '',
        tipos_midia: '',
        tecnologia_empregada: '',
        houve_prisao_apreensao: '',
        houve_recup_material: '',
        ocorrencia_neutralizada: '',
        impacto_ferrovia: '',
        km_da_ferrovia: '',
        potencial_crise: '',
        presenca_policia: '',
        qnt_pessoas_envolvidas: 5,
        tratativas: '',
        pessoas: '',
        empresas: '',
        veiculos: '',
        memoria_de_calculo: '',
        ocorrencias_relacionadas: '',
        Ident_tell: '',
        Nome: 'Fazenda Boa Aliança',
        Proprietario: 'Mayara Izidio',
        Cadastro: 'FAZBA001',
        Atuacao: '',
        Localizacao: 'Rural',
        Estado: 'Minas Gerais',
        Comarca: '',
        Cartorio: '',
        Registro: '',
        Posse: '',
        CCIR: '',
        NIRF_ITR: '',
        IPTU: '',
        Status_Geo: '',
        Cert_Inc: '',
        N_Cert_Inc: '',
        Area_Matri_ha: null,
        Data_Levan: null,
        Data_Atual: null,
        Obs: '',
        incidente_count: '15',
        CreationDate: new Date('2023-05-04T21:34:00.184Z').getTime(),
        Creator: 'bgomes_minning_img',
        EditDate: new Date('2024-04-13T15:18:19.246Z').getTime(),
        Editor: 'bgomes_minning_img',
        equipe_vistoria: 'Grupo 1',
        cadastro_imovel: 'FAZBA001',
        nome_imovel: 'Fazenda Boa Aliança',
        parent_objectid: 96,
        parent_globalid: '3952285b-673a-4110-b154-3a6cd33e3a3a',
        parent_CreationDate: new Date('2023-05-04T21:25:26.335Z').getTime(),
        parent_Creator: 'bgomes_minning_img',
        parent_EditDate: new Date('2023-08-17T12:46:17.276Z').getTime(),
        parent_Editor: 'bgomes_minning_img'
      },
      geometry: {
        x: -4898936.439168109,
        y: -2298268.8613244058,
        spatialReference: spatialReference
      }
    },
    {
      attributes: {
        objectid: 14,
        globalid: '60bb6821-bd21-4733-b9f0-4af6f4c8a74c',
        nome: '',
        incidente: 'INC230510082911',
        Emitente: 'Bruno Gomes',
        criada_por: '',
        gerencia: 'Desenvolvimento de Negócios',
        data_hora: new Date('2023-05-10T11:29:35.069Z').getTime(),
        paralisa_operacao: '',
        area_atendida: 'Soluções',
        area_negocio: 'Escritório',
        pessoas_comunicadas: 'Maíra Soares',
        ocorrencia: 'Segurança',
        ocorrencia_associada: '',
        gradacao: 'Média',
        pais: 'Brasil',
        uf: 'Minas Gerais',
        municipio: 'Brumadinho',
        projeto: 'Demonstação',
        avu: '',
        resumo: '',
        acoes: '',
        repercussao_midia: '',
        abrangencia_midia: '',
        tipos_midia: '',
        tecnologia_empregada: '',
        houve_prisao_apreensao: '',
        houve_recup_material: '',
        ocorrencia_neutralizada: '',
        impacto_ferrovia: '',
        km_da_ferrovia: '',
        potencial_crise: '',
        presenca_policia: '',
        qnt_pessoas_envolvidas: 0,
        tratativas: '',
        pessoas: '',
        empresas: '',
        veiculos: '',
        memoria_de_calculo: '',
        ocorrencias_relacionadas: '',
        Ident_tell: '',
        Nome: 'Fazenda Sino Azul',
        Proprietario: 'Fernanda Vieira',
        Cadastro: 'FSA-001',
        Atuacao: '',
        Localizacao: 'Rural',
        Estado: 'Minas Gerais',
        Comarca: '',
        Cartorio: '',
        Registro: '',
        Posse: '',
        CCIR: '',
        NIRF_ITR: '',
        IPTU: '',
        Status_Geo: '',
        Cert_Inc: '',
        N_Cert_Inc: '',
        Area_Matri_ha: null,
        Data_Levan: null,
        Data_Atual: null,
        Obs: '',
        incidente_count: '5',
        CreationDate: new Date('2023-05-10T11:30:11.556Z').getTime(),
        Creator: 'bgomes_minning_img',
        EditDate: new Date('2024-04-13T15:18:19.246Z').getTime(),
        Editor: 'bgomes_minning_img',
        equipe_vistoria: 'Grupo 1',
        cadastro_imovel: 'VG-64',
        nome_imovel: 'Fazenda Sino Azul',
        parent_objectid: 75,
        parent_globalid: '8bf4b1c2-5ad0-4058-8d23-1c60b7784f72',
        parent_CreationDate: new Date('2023-05-04T21:25:26.335Z').getTime(),
        parent_Creator: 'bgomes_minning_img',
        parent_EditDate: new Date('2023-08-21T14:19:19.839Z').getTime(),
        parent_Editor: 'bgomes_minning_img'
      },
      geometry: {
        x: -4884914.891195004,
        y: -2294317.305824459,
        spatialReference: spatialReference
      }
    }
  ]
}; 