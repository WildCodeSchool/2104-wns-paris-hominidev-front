# INSTALLATION INFO

## La popote d'installation
### La base vue en cours
```bash
npx create-react-app pygmalink-chrome --template typescript

yarn add -D @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-airbnb-typescript@6.3.2 eslint-plugin-jest eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react-hooks eslint-plugin-react prettier eslint-config-prettier eslint-plugin-prettier
npx install-peerdeps --dev eslint-config-airbnb
yarn add typescript @types/node @types/react @types/react-dom @types/jest
yarn add -D prettier eslint-config-prettier eslint-plugin-prettier
npx eslint --init
```

On update .eslintrc.js [ressource](https://brygrill.medium.com/create-react-app-with-typescript-eslint-prettier-and-github-actions-f3ce6a571c97)

On installe ce qu'il faut pour avoir un fichier de conf externe pour webpack sans faire de eject (à tester)
```bash
$# yarn add -D customize-cra react-app-rewired copy-webpack-plugin react-app-rewire-multiple-entry @types/copy-webpack-plugin
```
On crée ```config-overrides.js``` On suit ce [tuto](https://www.jamalx31.com/tech-posts/use-create-react-app-to-develop-chrome-extensions) pour le contenu. 

Sur le même lien, on met à jour les scripts de package.json.

