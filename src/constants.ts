import { type DataSourceSchema, EsriFieldType, Immutable, JimuFieldType } from 'jimu-core'
import type { IMConfig } from './config'

export const SCHEMA: DataSourceSchema = {
  label: 'Incidentes',
  idField: 'objectid',
  fields: {
    objectid: {
      jimuName: 'objectid',
      name: 'objectid',
      alias: 'objectid',
      type: JimuFieldType.Number,
      esriType: EsriFieldType.OID
    },
    globalid: {
      jimuName: 'globalid',
      name: 'globalid',
      alias: 'GlobalID',
      type: JimuFieldType.String,
      esriType: EsriFieldType.GlobalID
    },
    nome: {
      jimuName: 'nome',
      name: 'nome',
      alias: 'nome',
      type: JimuFieldType.String,
      esriType: EsriFieldType.String
    },
    incidente: {
      jimuName: 'incidente',
      name: 'incidente',
      alias: 'Número do Incidente',
      type: JimuFieldType.String,
      esriType: EsriFieldType.String
    },
    Emitente: {
      jimuName: 'Emitente',
      name: 'Emitente',
      alias: 'Emitente',
      type: JimuFieldType.String,
      esriType: EsriFieldType.String
    },
    criada_por: {
      jimuName: 'criada_por',
      name: 'criada_por',
      alias: 'Criada por:',
      type: JimuFieldType.String,
      esriType: EsriFieldType.String
    },
    gerencia: {
      jimuName: 'gerencia',
      name: 'gerencia',
      alias: 'Gerrência',
      type: JimuFieldType.String,
      esriType: EsriFieldType.String
    },
    data_hora: {
      jimuName: 'data_hora',
      name: 'data_hora',
      alias: 'Data e hora',
      type: JimuFieldType.Date,
      esriType: EsriFieldType.Date
    },
    paralisa_operacao: {
      jimuName: 'paralisa_operacao',
      name: 'paralisa_operacao',
      alias: 'Paralisação na Operação?',
      type: JimuFieldType.String,
      esriType: EsriFieldType.String
    },
    area_atendida: {
      jimuName: 'area_atendida',
      name: 'area_atendida',
      alias: 'Área Atendida',
      type: JimuFieldType.String,
      esriType: EsriFieldType.String
    },
    area_negocio: {
      jimuName: 'area_negocio',
      name: 'area_negocio',
      alias: 'Área de negócio',
      type: JimuFieldType.String,
      esriType: EsriFieldType.String
    },
    pessoas_comunicadas: {
      jimuName: 'pessoas_comunicadas',
      name: 'pessoas_comunicadas',
      alias: 'Pessoas comunicadas',
      type: JimuFieldType.String,
      esriType: EsriFieldType.String
    },
    ocorrencia: {
      jimuName: 'ocorrencia',
      name: 'ocorrencia',
      alias: 'Ocorrência',
      type: JimuFieldType.String,
      esriType: EsriFieldType.String
    },
    ocorrencia_associada: {
      jimuName: 'ocorrencia_associada',
      name: 'ocorrencia_associada',
      alias: 'Ocorrência Associada',
      type: JimuFieldType.String,
      esriType: EsriFieldType.String
    },
    gradacao: {
      jimuName: 'gradacao',
      name: 'gradacao',
      alias: 'Gradação',
      type: JimuFieldType.String,
      esriType: EsriFieldType.String
    },
    pais: {
      jimuName: 'pais',
      name: 'pais',
      alias: 'País',
      type: JimuFieldType.String,
      esriType: EsriFieldType.String
    },
    uf: {
      jimuName: 'uf',
      name: 'uf',
      alias: 'UF',
      type: JimuFieldType.String,
      esriType: EsriFieldType.String
    },
    municipio: {
      jimuName: 'municipio',
      name: 'municipio',
      alias: 'Município',
      type: JimuFieldType.String,
      esriType: EsriFieldType.String
    },
    projeto: {
      jimuName: 'projeto',
      name: 'projeto',
      alias: 'Projeto',
      type: JimuFieldType.String,
      esriType: EsriFieldType.String
    },
    avu: {
      jimuName: 'avu',
      name: 'avu',
      alias: 'AVU',
      type: JimuFieldType.String,
      esriType: EsriFieldType.String
    },
    resumo: {
      jimuName: 'resumo',
      name: 'resumo',
      alias: 'Resumo',
      type: JimuFieldType.String,
      esriType: EsriFieldType.String
    },
    acoes: {
      jimuName: 'acoes',
      name: 'acoes',
      alias: 'Ações',
      type: JimuFieldType.String,
      esriType: EsriFieldType.String
    },
    repercussao_midia: {
      jimuName: 'repercussao_midia',
      name: 'repercussao_midia',
      alias: 'Repercussão na Mídia?',
      type: JimuFieldType.String,
      esriType: EsriFieldType.String
    },
    abrangencia_midia: {
      jimuName: 'abrangencia_midia',
      name: 'abrangencia_midia',
      alias: 'Abrangência na Mídia',
      type: JimuFieldType.String,
      esriType: EsriFieldType.String
    },
    tipos_midia: {
      jimuName: 'tipos_midia',
      name: 'tipos_midia',
      alias: 'Tipos de Mídia',
      type: JimuFieldType.String,
      esriType: EsriFieldType.String
    },
    tecnologia_empregada: {
      jimuName: 'tecnologia_empregada',
      name: 'tecnologia_empregada',
      alias: 'Tecnologia empregada',
      type: JimuFieldType.String,
      esriType: EsriFieldType.String
    },
    houve_prisao_apreensao: {
      jimuName: 'houve_prisao_apreensao',
      name: 'houve_prisao_apreensao',
      alias: 'Houve prisão / Apreensão?',
      type: JimuFieldType.String,
      esriType: EsriFieldType.String
    },
    houve_recup_material: {
      jimuName: 'houve_recup_material',
      name: 'houve_recup_material',
      alias: 'Houve recuperação de material?',
      type: JimuFieldType.String,
      esriType: EsriFieldType.String
    },
    ocorrencia_neutralizada: {
      jimuName: 'ocorrencia_neutralizada',
      name: 'ocorrencia_neutralizada',
      alias: 'Ocorrência neutralizada?',
      type: JimuFieldType.String,
      esriType: EsriFieldType.String
    },
    impacto_ferrovia: {
      jimuName: 'impacto_ferrovia',
      name: 'impacto_ferrovia',
      alias: 'Impacto na ferrovia?',
      type: JimuFieldType.String,
      esriType: EsriFieldType.String
    },
    km_da_ferrovia: {
      jimuName: 'km_da_ferrovia',
      name: 'km_da_ferrovia',
      alias: 'km da ferrovia',
      type: JimuFieldType.String,
      esriType: EsriFieldType.String
    },
    potencial_crise: {
      jimuName: 'potencial_crise',
      name: 'potencial_crise',
      alias: 'Potencial de crise?',
      type: JimuFieldType.String,
      esriType: EsriFieldType.String
    },
    presenca_policia: {
      jimuName: 'presenca_policia',
      name: 'presenca_policia',
      alias: 'Houve presença policial?',
      type: JimuFieldType.String,
      esriType: EsriFieldType.String
    },
    qnt_pessoas_envolvidas: {
      jimuName: 'qnt_pessoas_envolvidas',
      name: 'qnt_pessoas_envolvidas',
      alias: 'Quantidade de pessoas envolvidas',
      type: JimuFieldType.Number,
      esriType: EsriFieldType.Double
    },
    tratativas: {
      jimuName: 'tratativas',
      name: 'tratativas',
      alias: 'Tratativas',
      type: JimuFieldType.String,
      esriType: EsriFieldType.String
    },
    pessoas: {
      jimuName: 'pessoas',
      name: 'pessoas',
      alias: 'Pessoas',
      type: JimuFieldType.String,
      esriType: EsriFieldType.String
    },
    empresas: {
      jimuName: 'empresas',
      name: 'empresas',
      alias: 'Empresas',
      type: JimuFieldType.String,
      esriType: EsriFieldType.String
    },
    veiculos: {
      jimuName: 'veiculos',
      name: 'veiculos',
      alias: 'Veículos',
      type: JimuFieldType.String,
      esriType: EsriFieldType.String
    },
    memoria_de_calculo: {
      jimuName: 'memoria_de_calculo',
      name: 'memoria_de_calculo',
      alias: 'Memória de Cálculo',
      type: JimuFieldType.String,
      esriType: EsriFieldType.String
    },
    ocorrencias_relacionadas: {
      jimuName: 'ocorrencias_relacionadas',
      name: 'ocorrencias_relacionadas',
      alias: 'Ocorrências Relacionadas',
      type: JimuFieldType.String,
      esriType: EsriFieldType.String
    },
    Ident_tell: {
      jimuName: 'Ident_tell',
      name: 'Ident_tell',
      alias: 'Ident_tell',
      type: JimuFieldType.String,
      esriType: EsriFieldType.String
    },
    Nome: {
      jimuName: 'Nome',
      name: 'Nome',
      alias: 'Nome',
      type: JimuFieldType.String,
      esriType: EsriFieldType.String
    },
    Proprietario: {
      jimuName: 'Proprietario',
      name: 'Proprietario',
      alias: 'Proprietario',
      type: JimuFieldType.String,
      esriType: EsriFieldType.String
    },
    Cadastro: {
      jimuName: 'Cadastro',
      name: 'Cadastro',
      alias: 'Cadastro',
      type: JimuFieldType.String,
      esriType: EsriFieldType.String
    },
    Atuacao: {
      jimuName: 'Atuacao',
      name: 'Atuacao',
      alias: 'Atuacao',
      type: JimuFieldType.String,
      esriType: EsriFieldType.String
    },
    Localizacao: {
      jimuName: 'Localizacao',
      name: 'Localizacao',
      alias: 'Localizacao',
      type: JimuFieldType.String,
      esriType: EsriFieldType.String
    },
    Estado: {
      jimuName: 'Estado',
      name: 'Estado',
      alias: 'Estado',
      type: JimuFieldType.String,
      esriType: EsriFieldType.String
    },
    Comarca: {
      jimuName: 'Comarca',
      name: 'Comarca',
      alias: 'Comarca',
      type: JimuFieldType.String,
      esriType: EsriFieldType.String
    },
    Cartorio: {
      jimuName: 'Cartorio',
      name: 'Cartorio',
      alias: 'Cartorio',
      type: JimuFieldType.String,
      esriType: EsriFieldType.String
    },
    Registro: {
      jimuName: 'Registro',
      name: 'Registro',
      alias: 'Registro',
      type: JimuFieldType.String,
      esriType: EsriFieldType.String
    },
    Posse: {
      jimuName: 'Posse',
      name: 'Posse',
      alias: 'Posse',
      type: JimuFieldType.String,
      esriType: EsriFieldType.String
    },
    CCIR: {
      jimuName: 'CCIR',
      name: 'CCIR',
      alias: 'CCIR',
      type: JimuFieldType.String,
      esriType: EsriFieldType.String
    },
    NIRF_ITR: {
      jimuName: 'NIRF_ITR',
      name: 'NIRF_ITR',
      alias: 'NIRF_ITR',
      type: JimuFieldType.String,
      esriType: EsriFieldType.String
    },
    IPTU: {
      jimuName: 'IPTU',
      name: 'IPTU',
      alias: 'IPTU',
      type: JimuFieldType.String,
      esriType: EsriFieldType.String
    },
    Status_Geo: {
      jimuName: 'Status_Geo',
      name: 'Status_Geo',
      alias: 'Status_Geo',
      type: JimuFieldType.String,
      esriType: EsriFieldType.String
    },
    Cert_Inc: {
      jimuName: 'Cert_Inc',
      name: 'Cert_Inc',
      alias: 'Cert_Inc',
      type: JimuFieldType.String,
      esriType: EsriFieldType.String
    },
    N_Cert_Inc: {
      jimuName: 'N_Cert_Inc',
      name: 'N_Cert_Inc',
      alias: 'N_Cert_Inc',
      type: JimuFieldType.String,
      esriType: EsriFieldType.String
    },
    Area_Matri_ha: {
      jimuName: 'Area_Matri_ha',
      name: 'Area_Matri_ha',
      alias: 'Area_Matri_ha',
      type: JimuFieldType.Number,
      esriType: EsriFieldType.Double
    },
    Data_Levan: {
      jimuName: 'Data_Levan',
      name: 'Data_Levan',
      alias: 'Data_Levan',
      type: JimuFieldType.Date,
      esriType: EsriFieldType.Date
    },
    Data_Atual: {
      jimuName: 'Data_Atual',
      name: 'Data_Atual',
      alias: 'Data_Atual',
      type: JimuFieldType.Date,
      esriType: EsriFieldType.Date
    },
    Obs: {
      jimuName: 'Obs',
      name: 'Obs',
      alias: 'Obs',
      type: JimuFieldType.String,
      esriType: EsriFieldType.String
    },
    incidente_count: {
      jimuName: 'incidente_count',
      name: 'incidente_count',
      alias: 'incidente_count',
      type: JimuFieldType.String,
      esriType: EsriFieldType.String
    },
    CreationDate: {
      jimuName: 'CreationDate',
      name: 'CreationDate',
      alias: 'CreationDate',
      type: JimuFieldType.Date,
      esriType: EsriFieldType.Date
    },
    Creator: {
      jimuName: 'Creator',
      name: 'Creator',
      alias: 'Creator',
      type: JimuFieldType.String,
      esriType: EsriFieldType.String
    },
    EditDate: {
      jimuName: 'EditDate',
      name: 'EditDate',
      alias: 'EditDate',
      type: JimuFieldType.Date,
      esriType: EsriFieldType.Date
    },
    Editor: {
      jimuName: 'Editor',
      name: 'Editor',
      alias: 'Editor',
      type: JimuFieldType.String,
      esriType: EsriFieldType.String
    },
    equipe_vistoria: {
      jimuName: 'equipe_vistoria',
      name: 'equipe_vistoria',
      alias: 'Equipe que está realizando a vistoria:',
      type: JimuFieldType.String,
      esriType: EsriFieldType.String
    },
    cadastro_imovel: {
      jimuName: 'cadastro_imovel',
      name: 'cadastro_imovel',
      alias: 'Cadastro do imóvel',
      type: JimuFieldType.String,
      esriType: EsriFieldType.String
    },
    nome_imovel: {
      jimuName: 'nome_imovel',
      name: 'nome_imovel',
      alias: 'Nome do Imóvel',
      type: JimuFieldType.String,
      esriType: EsriFieldType.String
    },
    parent_objectid: {
      jimuName: 'parent_objectid',
      name: 'parent_objectid',
      alias: 'parent_objectid',
      type: JimuFieldType.Number,
      esriType: EsriFieldType.OID
    },
    parent_globalid: {
      jimuName: 'parent_globalid',
      name: 'parent_globalid',
      alias: 'parent_GlobalID',
      type: JimuFieldType.String,
      esriType: EsriFieldType.GlobalID
    },
    parent_CreationDate: {
      jimuName: 'parent_CreationDate',
      name: 'parent_CreationDate',
      alias: 'parent_CreationDate',
      type: JimuFieldType.Date,
      esriType: EsriFieldType.Date
    },
    parent_Creator: {
      jimuName: 'parent_Creator',
      name: 'parent_Creator',
      alias: 'parent_Creator',
      type: JimuFieldType.String,
      esriType: EsriFieldType.String
    },
    parent_EditDate: {
      jimuName: 'parent_EditDate',
      name: 'parent_EditDate',
      alias: 'parent_EditDate',
      type: JimuFieldType.Date,
      esriType: EsriFieldType.Date
    },
    parent_Editor: {
      jimuName: 'parent_Editor',
      name: 'parent_Editor',
      alias: 'parent_Editor',
      type: JimuFieldType.String,
      esriType: EsriFieldType.String
    }
  }
}

export const DEFAULT_CONFIG: IMConfig = Immutable({
  featureUrl: 'https://services1.arcgis.com/myT7Emiy4dLnYpdI/ArcGIS/rest/services/Seguran%c3%a7a_Patrimonial/FeatureServer/1',
  parentFeatureUrl: 'https://services1.arcgis.com/myT7Emiy4dLnYpdI/ArcGIS/rest/services/Seguran%c3%a7a_Patrimonial/FeatureServer/0'
})
