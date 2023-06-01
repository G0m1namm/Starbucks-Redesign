
# Starbucks Redesign

This redesign project was taken in mind to practice ReactJS framework and other libraries.

This site is not an official Starbucks website, it was made as a personal project without any commercial purpose.


## Preview

[Starbucks Redesign web app link](https://starbucks-redesigned.vercel.app/)


## Tech Stack

**Client:** React, React Context, Framer Motion, Ant Design, React Router, React Verification Code Input.

**Services:** AWS Amplify Authentication, Google Maps API.


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`REACT_APP_GOOGLE_MAPS_API_KEY`

## Installing the CLI & Initializing a new AWS Amplify Project

### Installing the CLI

Next, we'll install the AWS Amplify CLI:

```bash
npm install -g @aws-amplify/cli
```

Now we need to configure the CLI with our credentials:

```bash
amplify configure
```

> If you'd like to see a video walkthrough of this configuration process, click [here](https://www.youtube.com/watch?v=fWbM5DLh25U).

Here we'll walk through the `amplify configure` setup. Once you've signed in to the AWS console, continue:
- Specify the AWS Region: __eu-east-2__
- Specify the username of the new IAM user: __starbucks-redesign-username__
> In the AWS Console, click __Next: Permissions__, __Next: Tags__, __Next: Review__, & __Create User__ to create the new IAM user. Then, return to the command line & press Enter.
- Enter the access key of the newly created user:   
  accessKeyId: __(<YOUR_ACCESS_KEY_ID>)__   
  secretAccessKey:  __(<YOUR_SECRET_ACCESS_KEY>)__
- Profile Name: __starbucks-redesign-user__

### Initializing A New Project

```bash
amplify init
```

- Enter a name for the project: __starbucks-redesign__
- Enter a name for the environment: __staging__
- Choose your default editor: __Visual Studio Code (or your default editor)__   
- Please choose the type of app that you're building __javascript__   
- What javascript framework are you using __react__   
- Source Directory Path: __src__   
- Distribution Directory Path: __build__   
- Build Command: __npm run-script build__   
- Start Command: __npm run-script start__   
- Do you want to use an AWS profile? __Y__
- Please choose the profile you want to use: __starbucks-redesign-user__

Now, the AWS Amplify CLI has iniatilized a new project & you will see a new folder: __amplify__ & a new file called `aws-exports.js` in the __src__ directory. These files hold your project configuration.

## Adding Authentication

To add authentication, we can use the following command:

```sh
amplify add auth
```
- Do you want to use default authentication and security configuration?  __Default configuration__
- How do you want users to be able to sign in when using your Cognito User Pool? __Email__
- What attributes are required for signing up? __Email__ and __Name__

Now, we'll run the push command and the cloud resources will be created in our AWS account.

```bash
amplify push
```

To view the service you can run the `console` command the feature you'd like to view:

```bash
amplify console auth
```

### Configuring the React applicaion

Now, our resources are created & we can start using them!

The first thing we need to do is to configure our React application to be aware of our new AWS Amplify project. We can do this by referencing the auto-generated `aws-exports.js` file that is now in our src folder.

To configure the app, open __src/App.js__, the following code below is already imported:

```js
import Amplify from 'aws-amplify'
import config from './aws-exports'
Amplify.configure(config)
```

Now, our app is ready to start using AWS services.

## Run Locally

Clone the project

```bash
  git clone https://github.com/G0m1namm/Starbucks-Redesign
```

Go to the project directory

```bash
  cd Starbucks-Redesign
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## Authors

- [@G0m1namm](https://github.com/G0m1namm) - Front-End Developer
- [Konstantin Zhuck](https://www.behance.net/konstantinzhuck) - UI/UX Designer

