// Parses svg 'd' attribute for simple svg icon and adds it to JSON file in src/assets/
// Requires npm installation of material design icons svg (package name is '@mdi/svg')
// https://materialdesignicons.com

const fs = require('fs');
const prompts = require('prompts');
const xmlParser = require('xml2json');

(async () => {
  const response = await prompts({
    type: 'text',
    name: 'value',
    message: 'Icon name in kebab-case:',
  });
  try {
    const iconName = response.value;
    const data = fs.readFileSync(
      `./node_modules/@mdi/svg/svg/${iconName}.svg`,
      'utf-8'
    );
    const dataAsString = xmlParser.toJson(data);
    const dataAsObject = JSON.parse(dataAsString);
    const oldJson = fs.readFileSync('./src/assets/svgInfo.json', 'utf-8');
    const parsedJson = JSON.parse(oldJson);
    const dValue = dataAsObject.svg.path.d;
    parsedJson[iconName] = dValue;
    fs.writeFile(
      './src/assets/svgInfo.json',
      JSON.stringify(parsedJson),
      (error) => {
        if (error) {
          return console.log(error);
        }
        console.log(`Done! New svg icon data for ${iconName} in JSON`);
      }
    );
  } catch (error) {
    console.log('Error:', error.stack);
  }
})();
