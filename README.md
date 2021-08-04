# NFT Vanilla Web App

The repository consists of Web Components that uses the BEP 721 & BEP 1155 Protocol Minting Contracts from nft-minter-contracts

# Overview
We considered use cases of NFTs being owned and transacted by individuals as well as consignment to third party brokers/wallets/auctioneers (“operators”). NFTs can represent ownership over digital or physical assets. We considered a diverse universe of assets, and we know you will dream up many more:

- Physical property — houses, unique artwork
- Virtual collectables — unique pictures of kittens, collectable cards
- “Negative value” assets — loans, burdens and other responsibilities
- In general, all houses are distinct and no two kittens are alike. NFTs are distinguishable and you must track the ownership of each one separately.

The contracts here are based on EVM industry standard BEP721 and BEP1155 protocol to create the Non-fungible tokens for a given digital asset. 

# Related Components
- nft-minter-marketplace - the main vanilla marketplace of this NFT contract project.
- nft-minter-contracts - the main vanilla contracts of this NFT project.
- nft-minter - the main example frontend of the minting engine. Deployed version of this can be seen [here](https://nft.proofsys.io)
- nft-minter-service - REST Service endpoint for consumers who wants to upload directly from their application via REST API.

## Run The Code

The repository requires Truffle v5.0.3 to run

For Deploying the contracts

```sh
truffle migrate --network testnet
```

For Compiling 

```sh
truffle compile
```

## Plugins

We've used the following plugins

| Plugin
| ------ 
| Truffle
| Gnache
| Solhint

## Development

- Visit the below contract on BSC Testnet https://testnet.bscscan.com/address/0x1c80c296627ae5CF01e4eD2dF69557c51AAE78b2#contracts 
- Visit the BEP 1155 Protocol - Proof Token Contract at https://testnet.bscscan.com/address/0x713da13df3ea464610e2944dcee3cf1f5b86d923


## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

# Integration
Building your own NFT Minting Engine, Marketplace or Offering it as a Service? Reach out at info@proofsys.io for implementation and integration inquiries.
