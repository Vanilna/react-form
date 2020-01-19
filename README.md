This project was created to practice React, while creating advanced form.
I've decided not to use third party packages to handle form, but do id with just React.
If it would be code for production, I would probably use "React Final Forms" or "React Hook Form".

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode on [http://localhost:3000](http://localhost:3000).

### `npm run build`

Builds the app for production.

##Project structure:

    ├── src/
    │   ├── index.js             # app entry file
    │   ├── App.js               # main app component
    │   ├── Components/          # ui components
    │   │   ├── Button
    │   │   ├── ErrorTooltip
    │   │   ├── Input            # generic input element
    │   │   ├── InputWrapper
    │   │   ├── UIMassage
    │   ├── Containers/          # module assets (processed by webpack)
    │   │   └── Form
    │   │       └──Form.js       # main application logic - generate inputs, handle change, validate, submit
    │   ├── Data
    │   │   ├── categories.json  # mock data
    │   │   ├── employees.json   # mock data
    │   │   └── formStructure    # config for input fields, their state and initial data transformation
    ├── public/
    │   ├── index.html           # index.html template
    │   └── ...
    ├── .gitignore               # defaults for gitignore
    ├── package.json             # build scripts and dependencies
    └── README.md                # README file
