/**
 * Province.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: { type: 'string' },
    type: { type: 'string' },
    sortIndex: { type: 'number' },
    mapId: { type: 'string' }
  },
  convertMapIdToId: async mapId => {
    let province = await Province.getByMapId(mapId);
    if (!province) return 0;
    return province.id;
  },
  getByMapId: async mapId => {
    let { provinces } = await Province.getAllProvinces();
    for (var i = 0; i < provinces.length; i++) {
      if (provinces[i].mapId === mapId) {
        return provinces[i];
      }
    }
  },
  getAllProvinces: async () => {
    let raw = sails.helpers.cache.with({
      action: 'get',
      key: `ALL_PROVINCES`
    });
    if (!raw) {
      raw = await Province.refreshProvinces();
    }
    return raw;
  },
  refreshProvinces: async () => {
    let all = await Promise.all([
      Province.find({ where: { id: { '!=': 100 } }, select: ['id', 'name', 'mapId'] }).sort([{ sortIndex: 'desc' }, { name: 'asc' }]),
      District.find({ select: ['id', 'name', 'province'] }).sort([{ name: 'asc' }]),
      Ward.find({ select: ['id', 'name', 'district'] }).sort([{ name: 'asc' }])
    ])
    let raw = { provinces: all[0], districts: all[1], wards: all[2] };
    sails.helpers.cache.with({
      action: 'set',
      key: `ALL_PROVINCES`,
      val: raw,
      ttl: Conf.get(`ALL_PROVINCES_TTL`, 5000)
    });
    return raw;
  }

};

