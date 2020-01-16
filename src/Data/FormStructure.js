import categories from "./categories.json";
import employees from "./employees.json";

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
    validationRules: {
      required: true
    },
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
    validationRules: {
      required: true,
      maxlength: 140
    },
    errorMassage: "",
    valid: true,
    touched: false
  },
  category: {
    elementType: "select",
    elementConfig: {
      name: "category",
      "aria-label": "Category",
      options: [...categories]
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
    validationRules: null,
    valid: true,
    touched: false
  },
  fee: {
    elementType: "input",
    elementConfig: {
      type: "number",
      name: "fee",
      step: "0.01",
      placeholder: "Number",
      "aria-label": "Fee"
    },
    isLabelVisible: true,
    label: "$",
    value: "",
    validationRules: {
      decimals: 2
    },
    errorMassage: "",
    valid: true,
    touched: false
  },
  reward: {
    elementType: "input",
    elementConfig: {
      type: "number",
      name: "reward",
      step: 1,
      placeholder: "Number",
      "aria-label": "Reward"
    },
    isLabelVisible: true,
    label: "reward points for attendance",
    value: "",
    validationRules: {
      decimals: 0
    },
    errorMassage: "",
    valid: true,
    touched: false
  },
  responsible: {
    elementType: "select",
    elementConfig: {
      name: "responsible",
      "aria-label": "Responsible",
      options: [...employees]
    },
    value: "",
    validationRules: {
      required: true
    },
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
    validationRules: {
      isEmail: true
    },
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
      "aria-label": "Date"
    },
    value: "",
    validationRules: {
      required: true
    },
    isLabelVisible: false,
    valid: true,
    touched: false
  },
  time: {
    elementType: "input",
    elementConfig: {
      type: "time",
      name: "time",
      "aria-label": "Time"
    },
    value: "",
    validationRules: {
      required: true
    },
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
      step: "0.5",
      placeholder: "Number",
      "aria-label": "Duration"
    },
    value: "",
    validationRules: {
      decimals: 1
    },
    isLabelVisible: true,
    label: "hour",
    errorMassage: "",
    valid: true,
    touched: false
  }
};

export default formStructure;
