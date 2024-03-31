version=$(jq .version package.json)
name=$(jq .name package.json)
echo Publishing $name:$version

npm config set strict-ssl false
npm set //localhost/nexus/repository/npm-hosted/:_authToken=NpmToken.3e792573-0045-34f2-80d6-7c13f82dbd7c

npm publish
