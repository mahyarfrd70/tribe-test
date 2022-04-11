# Tribe Test

The project has been created based on Nextjs. the reason why I've used Nextjs is that I wanted to create some internal API service , so I had to either create another Nodejs server repository or use Nextjs. as I didn't want to create another repository I prefered to configure the project with Nextjs. This project is not a project that just works with my credential, you can setup your credential and run you Tribe's app on top of it, but it's not been compeleted, I just implemented some feature like create post, upvote and downvote, signin and signup. what I'll work on if I have a chance to contnue this project is that, first of all I'll implement leaving comments under the posts, then filtering and sorting posts. moreover , I havn't used state management in this project, I thought that I don't need to use them.

## Stack

- Nextjs
- Typescript
- Tailwind
- Storybook
- Jest
- Testing Library
- Eslint
- Prettier

## Run

First of all to run the project you need to follow the below steps:

1. You have to have at least Nodejs 16.13.0 or newer installed.
2. Clone the project from repository and open it with your prefered IDE.
3. Run `yarn install`.
4. Run `npx husky install`.
5. Created a file called `.env.local` and you have to set your credentials there to make the app work. you need to set below values in this file:

````
   CLIENT_SECRET=your-client-secret
   CLIENT_ID=your-client-id
   NETWORK_ID=your-network-id
   NETWORK_DOMAIN=your-network-domain
````

And now the project is ready to be run in different mode and environment, so to run on different mode please follow the below steps.

#### Development

To run on development mode , you just need to run `yarn dev`, then open `http://localhost:3000` on your browser.

#### Production

To run on production mode , please run `yarn build` and then `yarn start`, afterward, open `http://localhost:3000` on your browser.

#### Test

To run test cases , please run `yarn test` .

NOTE: Application is not fully tested , I've just written tests for some of the codes but I tried to do that in the way that demonstrates my capability of writing tests.

#### Storybook

To run stories, please run `yarn storybook` , then navigate to `http://localhost:6006` from your browser.

## Run with docker

To run the project with docker, you have to have docker installed and docker daemon started, the follow the below steps:

1. First, you need to have env file created (follow step 5 of Run section)
2. Run `docker build -t your-tag .`
3. Run `docker run -p 3000:3000 your-tag`

Finally, you can see your app run on top the docker on `http://localhost:3000`.

## Conclusion

I'ver tried to focus on showing the both my technical skills and technologies knowledge in this project.
Cheers.
