/* eslint-env node */
const path = require('path');

/**
 * This whole file is one ginormous hack. Multiple things are happening here.
 *
 * The goal is to load the original defintion of the `addon` blueprint that
 * ships with the user installed version of ember-cli.
 *
 * 1) `Blueprint`
 *
 *     By using `require.main.require` we can lookup the `Blueprint` model
 *     from ember-cli without actually having to add ember-cli as a dependency
 *     to this package.
 *
 *     How does that work?
 *
 *     `require.main` is a reference to the main module, meaning the module that
 *     was first required by the node binary. In our case, that is the ember bin
 *     command.
 *
 *     More info: https://nodejs.org/dist/latest-v8.x/docs/api/modules.html#modules_accessing_the_main_module
 *
 *     Then on that module (the ember bin command) we call `require`. This
 *     method provides a way to load a module as if `require` was called from
 *     the original module.
 *
 *     More info: https://nodejs.org/dist/latest-v8.x/docs/api/modules.html#modules_module_require_id
 *
 *     Using this trick we get access to the ember-cli package that the user has
 *     installed and therefore also to all its files.
 *
 * 2) Addon Blueprint lookup
 *
 *     We need the original definition of the `addon` blueprint, so we can use
 *     it properly in `Blueprint.extend(addon, { ... })`.
 */

const Blueprint = require.main.require('ember-cli/lib/models/blueprint');

const AddonBlueprint = require.main.require('ember-cli/blueprints/addon');

// const AddonBlueprint = (lookupPaths => {
//   for (const lookupPath of lookupPaths) {
//     const blueprintPath = path.resolve(lookupPath, 'addon');
//     if (Blueprint._existsSync(blueprintPath)) {
//       return require(blueprintPath);
//     }
//   }
//
//   throw new Error('Could find `addon` blueprint.');
// })(Blueprint.defaultLookupPaths());

module.exports = {
  Blueprint, AddonBlueprint
};
