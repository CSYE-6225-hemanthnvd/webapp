CSYE 6225 WEBAPP
## Installation

  Install dependencies:

```console
$ npm install
```

  Start the server:

```console
$ npm start
```

  Start the development server:

```console
$ npm run dev
```

## Testing the api endpoints

  Testing using Jest and supertest:

```console
$ npm test
```

## Packer commands

  Download Packer plugin binaries:

```console
$ cd packer
$ packer init build.pkr.hcl
```

  Format HCL2 configuration files to canonical format and style:

```console
$ cd packer
$ packer fmt .
```

  Validate the syntax and configuration:

```console
$ cd packer
$ packer validate .
```

## Building the packer custom image

  Create a values.pkrvars.hcl file and include this key value pair
  credentials_file = "C:/Users/user/Downloads/nameofgcpcredentialfile.json"

  Build the packer custom image:

```console
$ cd packer
$ packer build -var-file=values.pkrvars.hcl build.pkr.hcl
```
Test
