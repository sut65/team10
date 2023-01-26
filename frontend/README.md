### `npm start`

To run project

### `npm install`

To install dependencies

### `npm update`
will only update minor versions.

Eg: It will update version 1.2.3 to 1.5.2
But it will not update version 1.2.3 to 2.0.1 because there can be breaking changes.

To check new major releases of the packages, you run 
### `npm outdated`

To update to a new major versions for all the packages, you can use npm-check-updates

### `npm install -g npm-check-updates`
Then run 
### `ncu -u`

This will upgrade all the versions in the package.json file, to dependencies and devDependencies, so npm can install the new major version. Now you can update packages to new major releases by npm update

all in all you have to do it in Application Folder