'use strict';

/* global require, module */

var _ = require('underscore');
var topojson = require('topojson');

var s = require('underscore.string');
_.mixin(s.exports());

var fips = require('../fips.json');
var fipsInverse = _.invert(fips);

var districts = require('../districts.json');
var districtFeatures = topojson.feature(districts, districts.objects.districts);

function encodeDistrict(state, district) {
  return parseInt(fips[state]) * 100 + (parseInt(district) || 0);
}

function decodeDistrict(district) {
  district = _.sprintf('%04d', district);
  return {
    state: fipsInverse[district.substring(0, 2)],
    district: parseInt(district.substring(2, 4))
  };
}

/**
 * Find district feature matching `district`.
 */
function findDistrict(district) {
  return _.find(districtFeatures.features, function(feature) {
    return feature.id === district;
  });
}

/**
 * Find district features matching `districts`.
 * Note: To handle occasional irregularities in district numbering, include
 *  districts that are exact matches, as well as district that match after
 *  rounding to the nearest 100.
 */
function findDistricts(districts) {
  return _.filter(districtFeatures.features, function(feature) {
    return districts.indexOf(feature.id) !== -1 ||
      districts.indexOf(Math.floor(feature.id / 100) * 100) !== -1;
  });
}

module.exports = {
  findDistrict: findDistrict,
  findDistricts: findDistricts,
  districtFeatures: districtFeatures,
  encodeDistrict: encodeDistrict,
  decodeDistrict: decodeDistrict
};
