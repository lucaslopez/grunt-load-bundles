var path = require('path');
var fs = require('fs');
var glob = require('glob');
var _ = require('lodash');
var loadGruntConfig = require('load-grunt-config');

var defaults =
{
	bundlesPath : path.join(process.cwd(), 'grunt_bundles'),
	configPath: 'config',
	tasksPath: 'tasks'
};

module.exports = function (grunt, options)
{
	options = options || {};
	
	options = _.merge(defaults, options);
	
	var loadBundle = function(bundlePath)
	{
		grunt.verbose.writeln("Loading bundle " + bundlePath);
		// Load config
		var config = loadGruntConfig(grunt,
		{
			init: false,
			configPath: path.join(bundlePath, options.configPath)
		});
		grunt.config.merge(config);
		
		//Load tasks
		grunt.loadTasks(path.join(bundlePath, options.tasksPath));
	}
	
	var loadBundles = function(bundlesPath)
	{
		grunt.verbose.subhead("Loading bundles");
		glob.sync('*',
		{
			cwd : bundlesPath
		}).forEach(function (bundle)
		{
			loadBundle(path.join(bundlesPath, bundle));
		});
	}
	
	loadBundles(options.bundlesPath);
};
