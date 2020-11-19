/**
 * Page.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
const fs = require('fs');
const _ = require('lodash');
let pageData = [];
module.exports = {
  attributes: {
    name: { type: 'string', required: true, maxLength: 255 },
    desc: { type: 'string', maxLength: 255, columnName :'description' },
    form: { type: 'json', columnType: 'text' },
    schema: { type: 'json', columnType: 'text' },
    buttons: { type: 'json', columnType: 'text' },
    type: { type: 'string', maxLength: 255 },
    read: { type: 'string', maxLength: 255 },
    submit: { type: 'string', maxLength: 255 },
    roles: { type: 'json', defaultsTo: [] },
    apis: { type: 'json', columnType: 'text' },
    procedures: { type: 'json', defaultsTo: [], columnType: 'text' },
    grid: { type: 'json', columnType: 'text' }
  },
  // afterCreate: async (inst, cb) => {
  //   Page.refreshCache();
  //   cb();
  // },
  // afterUpdate: async (inst, cb) => {
  //   Page.refreshCache();
  //   cb();
  // },
  getPage: async (id) => {
    id = Number(id);
    for (var i = 0; i < pageData.length; i++) {
      if (pageData[i].id === id) {
        return pageData[i];
      }
    }
  },
  refreshCache: async () => {
    pageData = await Page.find();
  },
  bootstrap: async () => {
    Page.refreshCache();
    setInterval(() => {
      Page.refreshCache()
    }, 60000);
    // Page.convertNewPage();
  },
  initialize: async () => {
  },
  convertNewPage: async () => {
    let pageInfos = await Page.find();
    let uiMap = {
      'text': 'Text',
      'ModelSelectWidget': 'SingleModel',
      'CheckboxWidget': 'Checkbox',
      'date': 'Date',
      'textarea': 'TextArea',
      'RichTextWidget': 'RichText',
      'LocationWidget': 'Location',
      'ImageWidget': 'Image',
      'UploadWidget': 'Upload',
      'EnumWidget': 'Enum',
      'updown': 'Text',
      'range': 'Text',
      'JSONWidget': 'JSON'
    }
    let typeMap = {
      'number': 'number',
      'integer': 'number',
      'string': 'string',
      'array': 'number',
      'boolean': 'boolean'
    }
    //process on page
    for (var i = 0; i < pageInfos.length; i++) {
      let pageInfo = pageInfos[i];
      let schema = [];
      if (pageInfo.form && pageInfo.form.schema && pageInfo.form.schema.properties) {
        for (var p in pageInfo.form.schema.properties) {
          let widget = 'Text';
          if (pageInfo.form.uiSchema[p]) {
            widget = uiMap[pageInfo.form.uiSchema[p]['ui:widget']];
          }
          let props = pageInfo.form.schema.properties[p];
          let input = {
            name: props.title,
            required: _.includes(pageInfo.form.schema.required, p),
            field: p,
            items: props.items,
            type: typeMap[props.type],
            api: props.api,
            modelSelectField: props.modelSelectField,
            default: props.default,
            widget,
            imageWidth: props.imageWidth,
            imageHeight: props.imageHeight
          }
          schema.push(input);
        }
      }
      await Page.update({ id: pageInfo.id }).set({ schema });
    }
  }
};