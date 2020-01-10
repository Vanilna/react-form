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
    errorMassage: "",
    value: "",
    validationRules: {
      required: true
    },
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
      rows: 4
    },
    isLabelVisible: false,
    errorMassage: "",
    value: "",
    validationRules: {
      required: true,
      maxlength: 140
    },
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
          id: 0,
          name: "Cycling"
        },
        {
          id: 1,
          name: "Hiking"
        },
        {
          id: 2,
          name: "Cooking"
        },
        {
          id: 3,
          name: "Rock climbing"
        },
        {
          id: 4,
          name: "Yoga"
        }
      ]
    },
    isLabelVisible: false,
    value: "",
    validationRules: {},
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
            checked: true,
            "aria-label": "free event"
          },
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
          label: "Paid event",
          id: 2
        }
      ],
      name: "payment"
    },
    isLabelVisible: false,
    value: "free",
    validationRules: {},
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
    errorMassage: "",
    value: "",
    validationRules: {
      isNumber: true
    },
    valid: true,
    touched: false
  },
  responsible: {
    elementType: "select",
    elementConfig: {
      name: "responsible",
      "aria-label": "Responsible",
      options: [
        {
          id: 0,
          name: "Daniel",
          lastname: "Mitchell",
          email: "daniel.mitchell@hussa.rs"
        },
        {
          id: 1,
          name: "Albert",
          lastname: "Alexander",
          email: "albert.alexander@hussa.rs"
        },
        {
          id: 2,
          name: "Philip",
          lastname: "Hughes",
          email: "philip.hughes@hussa.rs"
        },
        {
          id: 3,
          name: "Walter",
          lastname: "Nelson",
          email: "walter.nelson@hussa.rs"
        }
      ]
    },
    value: "first",
    validationRules: {
      required: true
    },
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
      required: true,
      isEmail: true
    },
    valid: true,
    touched: false
  },
  startsOn: {
    elementType: "input",
    elementConfig: {
      type: "date",
      name: "date",
      "aria-label": "Date"
    },
    value: "",
    validationRules: {
      required: true,
      isDate: true
    },
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
    validationRules: {
      required: true,
      isNumber: true
    },
    valid: true,
    touched: false
  }
};

export default formStructure;
