# less-openui5-issue
Issue within the less-openui5 library when using subfolders


# Install and Build the example
1. clone repository and execute npm install to setup the environment
2. execute grunt build to execute the build

# Expected Result
- The build of the project should create a library-parameter.json file in the target folder.
- The library-parameter.json file is expected to have the following content:
```shell
{
    "variable1": "1"
    "variable2": "2"
}
```
- These variables should be read during the build process from the library.source.less file and the linked Subfolder.less file.
- The library.source.less contains "variable1" and the Subfolder.less file contains "variable2".
- The library.source.less also imports the Subfolder.less with this line: "@import (less) "subfolder/Subfolder.less";"

Unfortunately the result looks like this:
```shell
{
    "variable1": "1"
}
```

# Explanation of the issue
This issue is caused by the "variable-collector.js" in the less-openui5 library in the function "getVariables" which is used to collect the variables for the results.
Those results are later used by the grunt-openui5 library to build the library-parameter.json.
This only happens if you use sub paths in the origin folder like in this example.
In the variable-collector.js the getVariables function checks if the library.source.less file has been imported for the less file currently read.
The Problem here is that it always checks the directory of the library.source.less file relative to the imported less file.
So in our example it checks if the library.source.less file in "/themes/base/subfolder/library.source.less" was imported.
Corresponding Code (libraryBaseFile is always relative to checked imported less file):
```shell
for (const name in this.mVariables) {
	if (Object.prototype.hasOwnProperty.call(this.mVariables, name)) {
		const oVar = this.mVariables[name];
		const dirname = path.posix.dirname(oVar.filename);
		const baseFileName = path.posix.basename(oVar.rootFilename); // usually library.source.less
		const libraryBaseFile = path.posix.normalize(path.posix.join(dirname, baseFileName));
		// Only add variable if the corresponding library "base file" has been imported
		if (aImports.indexOf(libraryBaseFile) > -1 || libraryBaseFile === oVar.rootFilename) {
			mVariables[name] = oVar.value;

			console.log("value:" + oVar.value + " import0 " + aImports[7] + " |base| " + libraryBaseFile );
		}
	}
}
```



