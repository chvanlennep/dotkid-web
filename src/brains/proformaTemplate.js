const wrongType = '↑ Are you sure you have entered a valid number?';
const outOfBounds = '↑ Are you sure this measurement is correct?';
const outOfBoundsNeonate = '↑ Are you sure this is a neonatal measurement?';
const cumulative = "↑ We'll need at least one of these";
const required = "↑ We'll need this measurement";
const dateRequired = "↑ We'll need a date of birth";

const proformaTemplate = {
  child: {
    dob: {
      type: {
        param: 'dateObject',
        message: 'Invalid date',
      },
      isRequired: {
        param: true,
        message: dateRequired,
      },
      nullable: {
        param: true,
      },
    },
    dom: {
      type: {
        param: 'dateObject',
        message: 'Invalid date',
      },
      nullable: {
        param: true,
      },
    },
    sex: {
      type: {
        param: 'string',
        message: 'Sex not recognised',
      },
      isRequired: {
        param: true,
        message: required,
      },
    },
    gestationInDays: {
      type: {
        param: 'number',
        message: 'No recognised gestation',
      },
    },
    weight: {
      type: {
        param: 'number',
        message: wrongType,
      },
      countCumulative: {
        param: true,
        minCount: 1,
        message: cumulative,
      },
      min: {
        param: 0.1,
        message: outOfBounds,
      },
      max: {
        param: 250,
        message: outOfBounds,
      },
    },
    height: {
      type: {
        param: 'number',
        message: wrongType,
      },
      countCumulative: {
        param: true,
        minCount: 1,
        message: cumulative,
      },
      min: {
        param: 30,
        message: outOfBounds,
      },
      max: {
        param: 220,
        message: outOfBounds,
      },
    },
    hc: {
      type: {
        param: 'number',
        message: wrongType,
      },
      countCumulative: {
        param: true,
        minCount: 1,
        message: cumulative,
      },
      min: {
        param: 10,
        message: outOfBounds,
      },
      max: {
        param: 100,
        message: outOfBounds,
      },
    },
    systolic: {
      type: {
        param: 'number',
        message: wrongType,
      },
      countCumulative: {
        param: true,
        minCount: 1,
        message: cumulative,
      },
      min: {
        param: 30,
        message: outOfBounds,
      },
      max: {
        param: 250,
        message: outOfBounds,
      },
    },
    diastolic: {
      type: {
        param: 'number',
        message: wrongType,
      },
      countCumulative: {
        param: true,
        minCount: 1,
        message: cumulative,
      },
      min: {
        param: 10,
        message: outOfBounds,
      },
      max: {
        param: 180,
        message: outOfBounds,
      },
    },
    rrinterval: {
      type: {
        param: 'number',
        message: wrongType,
      },
      isRequired: {
        param: true,
        message: required,
      },
      min: {
        param: 0.15,
        message: outOfBounds,
      },
      max: {
        param: 3,
        message: outOfBounds,
      },
    },
    qtinterval: {
      type: {
        param: 'number',
        message: wrongType,
      },
      isRequired: {
        param: true,
        message: required,
      },
      min: {
        param: 0.1,
        message: outOfBounds,
      },
      max: {
        param: 20,
        message: outOfBounds,
      },
    },
    correction: {
      type: {
        param: 'number',
        message: wrongType,
      },
      isRequired: {
        param: true,
        message: required,
      },
      min: {
        param: 50,
        message: '↑ Minimum calculator correction = 50% of normal',
      },
      max: {
        param: 150,
        message: '↑ Maximum calculator correction = 150% of normal',
      },
    },
  },
  neonate: {
    dob: {
      type: {
        param: 'dateObject',
        message: 'Invalid date',
      },
      isRequired: {
        param: true,
        message: dateRequired,
      },
      nullable: {
        param: true,
      },
    },
    dom: {
      type: {
        param: 'dateObject',
        message: 'Invalid date',
      },
      nullable: {
        param: true,
      },
    },
    sex: {
      type: {
        param: 'string',
        message: 'Sex not recognised',
      },
      isRequired: {
        param: true,
        message: required,
      },
    },
    gestationInDays: {
      type: {
        param: 'number',
        message: 'No recognised gestation',
      },
      isRequired: {
        param: true,
        message: required,
      },
    },
    weight: {
      type: {
        param: 'number',
        message: wrongType,
      },
      countCumulative: {
        param: true,
        minCount: 1,
        message: cumulative,
      },
      min: {
        param: 0.1,
        message: outOfBoundsNeonate,
      },
      max: {
        param: 8,
        message: outOfBoundsNeonate,
      },
    },
    length: {
      type: {
        param: 'number',
        message: wrongType,
      },
      countCumulative: {
        param: true,
        minCount: 1,
        message: cumulative,
      },
      min: {
        param: 30,
        message: outOfBoundsNeonate,
      },
      max: {
        param: 70,
        message: outOfBoundsNeonate,
      },
    },
    hc: {
      type: {
        param: 'number',
        message: wrongType,
      },
      countCumulative: {
        param: true,
        minCount: 1,
        message: cumulative,
      },
      min: {
        param: 10,
        message: outOfBoundsNeonate,
      },
      max: {
        param: 100,
        message: outOfBoundsNeonate,
      },
    },
    correction: {
      type: {
        param: 'number',
        message: wrongType,
      },
      isRequired: {
        param: true,
        message: required,
      },
      min: {
        param: 50,
        message: '↑ Minimum calculator correction = 50% of normal',
      },
      max: {
        param: 150,
        message: '↑ Maximum calculator correction = 150% of normal',
      },
    },
    sbr: {
      type: {
        param: 'number',
        message: wrongType,
      },
      isRequired: {
        param: true,
        message: required,
      },
      max: {
        param: 1000,
        message: outOfBounds,
      },
    },
    t1: {
      type: {
        param: 'number',
      },
    },
    t2: {
      type: {
        param: 'number',
      },
    },
    t3: {
      type: {
        param: 'number',
      },
    },
    t4: {
      type: {
        param: 'number',
      },
    },
    t5: {
      type: {
        param: 'number',
      },
    },
    p1: {
      type: {
        param: 'number',
      },
    },
    p2: {
      type: {
        param: 'number',
      },
    },
    p3: {
      type: {
        param: 'number',
      },
    },
    p4: {
      type: {
        param: 'number',
      },
    },
    p5: {
      type: {
        param: 'number',
      },
    },
  },
};

export default proformaTemplate;
