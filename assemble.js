const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

const datasources_dir = "datasources";
const plugins_dir = "plugins";
const mesh_config_file = ".meshrc.yaml";

function loadConfiguration(configPath){
    try {
        return yaml.load(fs.readFileSync(configPath, 'utf8'));
    } catch (e) {
        return null;
    }
}

function getAllConfigurations(dirPath) {
    const files = fs.readdirSync(dirPath); // Get filenames synchronously
    const results =  files.map(file => loadConfiguration(path.join(dirPath, file)));
    return results;
}

function writeConfiguration(config, configPath){
    const yamlString = yaml.dump(config);
    fs.writeFileSync(configPath, yamlString);
}

function assembleSchema(){
    let datasources = getAllConfigurations(datasources_dir);

    // Data Sources
    datasources = datasources.map((datasource) => {
        datasource.transforms = Object.keys(datasource.transforms).map(key => ({
            [key]: datasource.transforms[key]
        }))
    })

    // Plugins
    const plugins = getAllConfigurations(plugins_dir);

    // Final Mesh Configuration
    const meshConfig = loadConfiguration(mesh_config_file);

    console.log(meshConfig);

    meshConfig.sources = datasources;
    meshConfig.plugins = plugins;

    // Write configuration
    writeConfiguration(meshConfig, mesh_config_file);
}

assembleSchema();