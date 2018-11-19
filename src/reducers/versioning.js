import PouchDB from "pouchdb";
import pouchdbFind from "pouchdb-find";
import { combineReducers } from "redux";
import moment from "moment";
import { addItems } from "../actions/item";
import * as actions from "../constants/actions";
import { homePageLoading, showRequestError } from "../actions/UI";
import request from "../api/request";

PouchDB.plugin(pouchdbFind);

export const getVersioning = state => state.versioning;
export const getDrafts = state => getVersioning(state).drafts;
export const getDraftList = state => getDrafts(state).list;
export const getActiveDraftName = state => getDrafts(state).active;
export const getActiveDraft = state =>
  getDraftList(state).find(draft => draft.name === getActiveDraftName(state));

const DRAFTS_INFO_COLLECTION = "rappi-mapping-drafts";

const updateDraftList = draftList => ({
  type: actions.UPDATE_DRAFTS,
  payload: { draftList },
});

const updateMappingList = mappingList => ({
  type: actions.UPDATE_MAPPINGS,
  payload: { mappingList },
});

const setActiveDraft = draftName => ({
  type: actions.SET_ACTIVE_DRAFT,
  payload: { draftName },
});

const cleanActiveDraft = () => setActiveDraft("");

export const saveVersion = () => async (dispatch, getState) => {
  dispatch(homePageLoading(true));

  let result = null;

  try {
    const currentDraftName = getActiveDraftName(getState());
    const currentDraftDb = new PouchDB(currentDraftName);
    const draftsMetadataDb = new PouchDB(DRAFTS_INFO_COLLECTION);

    const currentDraftMetadata = await draftsMetadataDb
      .find({ selector: { name: currentDraftName } })
      .then(result => result.docs)
      .then(drafts => drafts[0]);

    const currentDraft = await currentDraftDb
      .allDocs({ include_docs: true })
      .then(response => response.rows.map(row => row.doc));

    const data = {
      storeId: currentDraftMetadata.store.id,
      baseVersion: currentDraftMetadata.baseMapping,
      createdBy: currentDraftMetadata.createdBy,
      items: currentDraft,
    };

    result = await request().post(
      "/restaurants-integrations-admin/mappings",
      data,
    );

    await draftsMetadataDb.remove(currentDraftMetadata);

    currentDraftDb.destroy();
    draftsMetadataDb.close();

    dispatch(cleanActiveDraft());
    dispatch(homePageLoading(false));
  } catch (e) {
    dispatch(showRequestError(e.message));
  }

  return result;
};

const generateDraftName = ({
  integration,
  store,
  storeType,
  baseMapping,
  baseMappingType,
}) => {
  const timeMark = moment().format("MM-DD-YYYY--HH:mm:ss");

  return `${integration} - ${store.name} :: ${baseMapping ||
    baseMappingType} :: ${timeMark}`;
};

export const generateDraft = draftMetadata => dispatch => {
  const draftName = generateDraftName(draftMetadata);
  const draft = { name: draftName, ...draftMetadata, createdAt: new Date() };

  dispatch(setActiveDraft(draftName));

  const draftsInfoDb = new PouchDB(DRAFTS_INFO_COLLECTION);

  return draftsInfoDb.post(draft).then(() => draftsInfoDb.close());
};

export const fetchDraftList = integrationId => dispatch => {
  const isOfCurrentIntegration = draft => draft.integration === integrationId;
  const byDateDesc = (a, b) => new Date(b.createdAt) - new Date(a.createdAt);

  const draftsInfoDb = new PouchDB(DRAFTS_INFO_COLLECTION);

  return (
    draftsInfoDb
      .allDocs({ include_docs: true })
      .then(result => result.rows.map(row => row.doc))
      // FIXME move filtering and sorting into query - Fede 25/09/2018
      .then(
        drafts =>
          integrationId ? drafts.filter(isOfCurrentIntegration) : drafts,
      )
      .then(drafts => drafts.sort(byDateDesc))
      .then(drafts => dispatch(updateDraftList(drafts)))
      .then(() => draftsInfoDb.close())
  );
};

export const loadDraft = draftName => dispatch => {
  const draftsInfoDb = new PouchDB(DRAFTS_INFO_COLLECTION);

  draftsInfoDb
    .find({ selector: { name: draftName } })
    .then(result => result.docs)
    .then(drafts => (drafts.length ? drafts[0] : {}))
    .then(() => draftsInfoDb.close());

  dispatch(setActiveDraft(draftName));

  const draftDb = new PouchDB(draftName);

  return draftDb
    .allDocs({ include_docs: true })
    .then(result => result.rows.map(row => row.doc))
    .then(items => dispatch(addItems(items)))
    .then(() => draftDb.close());
};

export const fetchMappingList = integration => dispatch => {
  const mappings = integration.stores
    .map(store => store.mappings)
    .reduce((p, n) => (n ? [...p, ...n] : p), []);
  dispatch(updateMappingList(mappings));
};

const initialState = {
  list: [],
  active: null,
};

const drafts = (state = initialState, action = {}) => {
  switch (action.type) {
    case actions.UPDATE_DRAFTS:
      return { ...state, list: action.payload.draftList };
    case actions.SET_ACTIVE_DRAFT:
      return { ...state, active: action.payload.draftName };
    default:
      return state;
  }
};

const mappings = (state = initialState, action = {}) => {
  switch (action.type) {
    case actions.UPDATE_MAPPINGS:
      return { ...state, list: action.payload.mappingList };
    default:
      return state;
  }
};

const baseMappingList = (state = [], action = {}) => {
  switch (action.type) {
    case actions.UPDATE_DRAFTS:
      return action.payload.draftList.map(draft => ({
        label: draft.name,
        value: draft,
      }));
    case actions.UPDATE_MAPPINGS:
      return action.payload.mappingList.map(mapping => ({
        label: generateMappingName(mapping),
        value: mapping,
      }));
    default:
      return state;
  }
};

const generateMappingName = ({
  version,
  baseVersion,
  createdBy,
  storeId,
  createdAt,
}) => `${version}-${baseVersion}-${storeId}-${createdBy}-${createdAt}`;
export default combineReducers({
  drafts,
});
