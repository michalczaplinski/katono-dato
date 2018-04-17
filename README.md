## Usage

Add an `.env` file containing the read-only API token of your DatoCMS site:

```
echo 'DATO_API_TOKEN=abc123' >> .env
```

Then, you know the drill: 

```
yarn install
yarn run develop
# to build for production
yarn run build
```
