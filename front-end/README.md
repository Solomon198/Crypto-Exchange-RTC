# **Exchange Currency**

This guide covers how to set-up application and application implementation plan.

## **Installing dependencies**

In the project directory, run the following command:

```bash
   yarn install
   ## or
   npm install
```

## **Runing the application on Developement mode**

```bash
   yarn start:dev
   ## or
   npm run start:dev
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## **Testing Application**

You can lauch test in both interactive an non-interactive mode.

```bash
   yarn test ## non-interactive mode
   yarn test:watch ## interactive mode
   ## or
   npm test ## non-interactive mode
   npm run test:watch ## interactive mode
```

## **Runing Application on Production mode**

```bash
   npm run build
   ## or
   yarn build
```

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\

```bash
   npm start
   ## or
   yarn start
```

Runs the application on production mode. you can view app locally on `http://localhost:5000`

## **Interface Designs**

- [Toolbar outlook](https://www.figma.com/file/YMRGT8t3GlxDMH8cN7BTw9/Technical-Assessment?node-id=24%3A1295)
- [Table outlook](https://www.figma.com/file/YMRGT8t3GlxDMH8cN7BTw9/Technical-Assessment?node-id=21%3A2715)
- [Completed outlook](https://www.figma.com/file/YMRGT8t3GlxDMH8cN7BTw9/Technical-Assessment?node-id=2%3A1161)

### **TODO**

- [x] Design Responsive Toolbar Component for collecting exchange values
- [x] Desgin Responsive Table component for displaying historical data
- [x] Design Filter Component for table
- [x] Create Widget with designed components
- [x] Add Sorting capability
- [ ] Connect UI to business logic (Stream data from backend using web sockets)
- [ ] Add pagination logic to Table component
- [ ] Test Components
- [ ] Create video of working application
