# Protests Map

Online app available at [vdemo.kessler.tech](https://vdemo.kessler.tech).

## Setup and running locally

1. [Create Google Maps API key](https://developers.google.com/maps/documentation/javascript/get-api-key)
2. Replace the key in [index.html](/src/index.html#L10) with your key.
3. Create a Firebase project.  
3.1. Create a Firestore database.   
3.2. Start a collection named `flags` .  
3.3. Enable Authentication in your newly created Firebase project.  
3.4. Add the following auth methods:
    1. Email/Password
    2. Anonymous
    3. Google    
    

    3.5. In your project settings, register your app.  
    3.6. Add your project configuration to [src/environments/environment.ts](/src/environments/environment.ts).  

4. Run `yarn && yarn start` to run the app locally.
