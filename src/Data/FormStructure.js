import categories from "./categories.json";
import employees from "./employees.json";

const currentlyLoggedId = 3;
const notLoggedEmployees = employees.filter(employee => employee.id !== 3);
const loggedPerson = employees[currentlyLoggedId];
//employees with the logged one at the beginning
const loggedEmployees = [
  {
    id: 100,
    name: `Me - ${loggedPerson.name} ${loggedPerson.lastname}`,
    disabled: true,
    style: { display: "none" }
  },
  {
    id: 101,
    name: "Me",
    disabled: true
  },
  loggedPerson,
  {
    id: 102,
    name: "Others",
    disabled: true
  },
  ...notLoggedEmployees
];

//events can't be created previous to the actual date
//so we need actual date in format valid for min attribute in date input
const date = new Date();
let month = date.getMonth() + 1;
month = `${month}`.length <= 1 ? `0${month}` : month;
const today = `${date.getFullYear()}-${month}-${date.getDate()}`;

const formStructure = {
  title: {
    elementType: "input",
    elementConfig: {
      type: "text",
      name: "title",
      placeholder: "Make it short and clear",
      "aria-label": "Title"
    },
    isLabelVisible: false,
    value: "",
    validationRules: [{ type: "REQUIRED", payload: { name: "title" } }],
    errorMassage: "",
    valid: true,
    touched: false
  },
  description: {
    elementType: "textarea",
    elementConfig: {
      maxLength: 140,
      name: "description",
      placeholder: "Write about your event, be creative",
      "aria-label": "Description",
      rows: 6
    },
    isLabelVisible: false,
    value: "",
    validationRules: [{ type: "REQUIRED", payload: { name: "description" } }],
    errorMassage: "",
    valid: true,
    touched: false
  },
  category: {
    elementType: "select",
    elementConfig: {
      name: "category",
      "aria-label": "Category",
      options: [
        {
          id: 100,
          name: "Select category",
          disabled: true,
          style: { display: "none" }
        },
        ...categories
      ]
    },
    isLabelVisible: false,
    value: "Select category",
    validationRules: null,
    valid: true,
    touched: false
  },
  payment: {
    elementType: "radio__group",
    elementConfig: {
      options: [
        {
          elementConfig: {
            type: "radio",
            value: "free",
            name: "payment",
            "aria-label": "free event"
          },
          isLabelVisible: true,
          label: "Free event",
          id: 1
        },
        {
          elementConfig: {
            type: "radio",
            name: "payment",
            value: "paid",
            "aria-label": "paid event"
          },
          isLabelVisible: true,
          label: "Paid event",
          id: 2
        }
      ],
      name: "payment"
    },
    value: "free",
    validationRules: [{ type: "FEE_CLEAR_UP", payload: { name: "payment" } }],
    valid: true,
    touched: false
  },
  fee: {
    elementType: "input",
    elementConfig: {
      type: "number",
      name: "fee",
      placeholder: "Number",
      "aria-label": "Fee"
    },
    isLabelVisible: true,
    label: "$",
    value: "",
    validationRules: [
      //important more specific validations should come last
      { type: "REQUIRED", payload: { name: "fee" } },
      { type: "NATIVE", payload: { name: "fee" } },
      { type: "DECIMALS", payload: { name: "fee", quantity: 2 } }
    ],
    errorMassage: "",
    valid: true,
    touched: false
  },
  reward: {
    elementType: "input",
    elementConfig: {
      type: "number",
      name: "reward",
      placeholder: "Number",
      "aria-label": "Reward"
    },
    isLabelVisible: true,
    label: "reward points for attendance",
    value: "",
    validationRules: [
      //important more specific validations should come last
      { type: "NATIVE", payload: { name: "reward" } },
      { type: "DECIMALS", payload: { name: "reward", quantity: 0 } }
    ],
    errorMassage: "",
    valid: true,
    touched: false
  },
  responsible: {
    elementType: "select",
    elementConfig: {
      name: "responsible",
      "aria-label": "Responsible",
      options: loggedEmployees
    },
    value: `Me - ${loggedPerson.name} ${loggedPerson.lastname}`,
    validationRules: [{ type: "REQUIRED", payload: { name: "responsible" } }],
    isLabelVisible: false,
    errorMassage: "",
    valid: true,
    touched: false
  },
  email: {
    elementType: "input",
    elementConfig: {
      type: "email",
      name: "email",
      placeholder: "Email",
      "aria-label": "Email"
    },
    value: "",
    validationRules: [{ type: "IS_EMAIL", payload: { name: "email" } }],
    isLabelVisible: false,
    errorMassage: "",
    valid: true,
    touched: false
  },
  date: {
    elementType: "input",
    elementConfig: {
      type: "date",
      name: "date",
      min: today,
      "aria-label": "Date"
    },
    value: "",
    validationRules: [{ type: "REQUIRED", payload: { name: "date" } }],
    isLabelVisible: false,
    valid: true,
    touched: false
  },
  time: {
    elementType: "input",
    elementConfig: {
      type: "time",
      name: "time",
      min: "00:00",
      max: "11:59",
      "aria-label": "Time"
    },
    value: "",
    validationRules: [
      //important more specific validations should come last
      { type: "REQUIRED", payload: { name: "time" } },
      { type: "NATIVE", payload: { name: "time" } }
    ],
    isLabelVisible: false,
    valid: true,
    touched: false
  },
  period: {
    elementType: "radio__group",
    elementConfig: {
      options: [
        {
          elementConfig: {
            type: "radio",
            value: "AM",
            name: "period",
            checked: true,
            "aria-label": "AM"
          },
          isLabelVisible: true,
          label: "AM",
          id: 1
        },
        {
          elementConfig: {
            type: "radio",
            name: "period",
            value: "PM",
            checked: false,
            "aria-label": "PM"
          },
          isLabelVisible: true,
          label: "PM",
          id: 2
        }
      ],
      name: "period"
    },
    value: "AM",
    validationRules: null,
    valid: true,
    touched: false
  },
  duration: {
    elementType: "input",
    elementConfig: {
      type: "number",
      name: "duration",
      placeholder: "Number",
      "aria-label": "Duration"
    },
    value: "",
    validationRules: [
      //important more specific validations should come last
      { type: "NATIVE", payload: { name: "duration" } },
      { type: "DECIMALS", payload: { name: "duration", quantity: 0 } }
    ],
    isLabelVisible: true,
    label: "hour",
    errorMassage: "",
    valid: true,
    touched: false
  }
};

export default formStructure;
