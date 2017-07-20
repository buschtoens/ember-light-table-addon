/* eslint-env node */
const { AddonBlueprint, Blueprint } = require('./shim');

const ELTAddonBlueprint = Blueprint.mixin({
  description: 'Blueprint for initializing a new ember-light-table addon',

  currentELTVersion: '1.9.2'
}, AddonBlueprint);

ELTAddonBlueprint.locals = function(options) {
  return Object.assign({}, AddonBlueprint.locals.call(this, options), {
    description: options.description || this.description,
    welcome: false
  });
};

ELTAddonBlueprint.updatePackageJson = function(content) {
  const contents = JSON.parse(AddonBlueprint.updatePackageJson.call(this, content));
  const locals = this.locals(this.options);

  // overwrite default description
  contents.description = locals.description;

  // add ember-light-table-addon keyword
  if (!contents.keywords.includes('ember-light-table-addon')) {
    contents.keywords.push('ember-light-table-addon');
  }

  // add ember-light-table as a dev dependency
  contents.devDependencies['ember-disable-prototype-extensions'] = `^${this.currentELTVersion}`;
};

module.exports = Blueprint.extend(ELTAddonBlueprint);
