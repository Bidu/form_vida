import * as yup from 'yup';
// import { i18n } from 'src/i18n';
import moment from 'moment';
import {
  textMaskPhone,
  textMaskDateBirth,
  textMaskNumber,
  textMaskCpf,
  textMaskCEP,
  onlyNumbers,
  CheckCPF,
  checkDateBirth,
  onlyLetters,
  nameField,
} from "../helpers/user";

const yupFormSchemas = {
  generic(label) {
    return yup.mixed().label(label);
  },
  string(label, config) {
    config = config || {};

    let yupChain = yup
      .string()
      .transform((cv, ov) => {
        return ov === '' ? null : cv;
      })
      .nullable(true)
      .trim()
      .label(label)
     

    if (config.required == true) {
      yupChain = yupChain.required(
          label
      );
    }

    if (config.min || config.min === 0) {
      yupChain = yupChain.min(config.min);
    }

    if (config.max) {
      yupChain = yupChain.max(config.max);
    }

    if (config.matches) {
      yupChain = yupChain.matches(config.matches);
    }
    if (config.when) {
      console.log(config.when)
      yupChain = yupChain.when( config.when );
    }
    if(config.test){
      
      yupChain = yupChain.test('is-incorrect', `Valor inválido para ${config.test.toUpperCase()}`, async value =>{
      let res = {}
        switch (config.test) {
          case "cpf":
             res = CheckCPF(value)
            break;
         case "nome completo":
            res = nameField(value)
           break;
        case "data de nascimento":
          res = checkDateBirth(value)
          break;
          default:
            break;
        }

      return res

      })
    }

    return yupChain;
  },
  boolean(label, config) {
    return yup.bool().default(false).label(label);
  },
  relationToOne(label, config) {
    config = config || {};

    let yupChain = yup
      .mixed()
      .nullable(true)
      .label(label)
      .transform((value, originalValue) => {
        if (!originalValue) {
          return null;
        }

        return originalValue.id;
      });

    if (config.required) {
      yupChain = yupChain.required();
    }

    return yupChain;
  },
  stringArray(label, config) {
    config = config || {};

    let yupChain = yup
      .array()
      .compact()
      .ensure()
      .of(
        yup
          .string()
          .transform((cv, ov) => {
            return ov === '' ? null : cv;
          })
          .trim(),
      )
      .label(label);

    if (config.required || config.min) {
      yupChain = yupChain.required();
    }

    if (config.min || config.min === 0) {
      yupChain = yupChain.min(config.min);
    } else if (config.required) {
      yupChain = yupChain.min(1);
    }

    if (config.max) {
      yupChain = yupChain.max(config.max);
    }

    return yupChain;
  },
  relationToMany(label, config) {
    config = config || {};

    let yupChain = yup
      .array()
      .nullable(true)
      .label(label)
      .transform((value, originalValue) => {
        if (!originalValue || !originalValue.length) {
          return [];
        }

        return originalValue.map((item) => item.id);
      });

    if (config.required || config.min) {
      yupChain = yupChain.required();
    }

    if (config.min || config.min === 0) {
      yupChain = yupChain.min(config.min);
    } else if (config.required) {
      yupChain = yupChain.min(1);
    }

    if (config.max) {
      yupChain = yupChain.max(config.max);
    }

    return yupChain;
  },
  integer(label, config) {
    config = config || {};

    let yupChain = yup
      .number()
      .transform((cv, ov) => {
        return ov === '' ? null : cv;
      })
      .integer()
      .nullable(true)
      .label(label);

    if (config.required) {
      yupChain = yupChain.required();
    }

    if (config.min || config.min === 0) {
      yupChain = yupChain.min(config.min);
    }

    if (config.max) {
      yupChain = yupChain.max(config.max);
    }

    return yupChain;
  },
  images(label, config) {
    config = config || {};

    let yupChain = yup.array().nullable(true).label(label);

    if (config.required || config.min) {
      yupChain = yupChain.required();
    }

    if (config.min || config.min === 0) {
      yupChain = yupChain.min(config.min);
    } else if (config.required) {
      yupChain = yupChain.min(1);
    }

    if (config.max) {
      yupChain = yupChain.max(config.max);
    }
    if (config.test){

    }

    return yupChain;
  },
  files(label, config) {
    config = config || {};

    let yupChain = yup
      .array()
      .compact()
      .ensure()
      .nullable(true)
      .label(label);

    if (config.required || config.min) {
      yupChain = yupChain.required();
    }

    if (config.min || config.min === 0) {
      yupChain = yupChain.min(config.min);
    } else if (config.required) {
      yupChain = yupChain.min(1);
    }

    if (config.max) {
      yupChain = yupChain.max(config.max);
    }

    return yupChain;
  },
  enumerator(label, config) {
    config = config || {};

    let yupChain = yup
      .string()
      .transform((cv, ov) => {
        return ov === '' ? null : cv;
      })
      .label(label)
      .nullable(true)
      .oneOf([null, ...(config.options || [])]);

    if (config.required) {
      yupChain = yupChain.required(
       "erro",
      );
    }

    return yupChain;
  },
  email(label, config) {
    config = config || {};

    let yupChain = yup
      .string()
      .transform((cv, ov) => {
        return ov === '' ? null : cv;
      })
      .nullable(true)
      .trim()
      .label(label)
      .email();

    if (config.required) {
      yupChain = yupChain.required();
    }

    if (config.min || config.min === 0) {
      yupChain = yupChain.min(config.min);
    }

    if (config.max) {
      yupChain = yupChain.max(config.max);
    }

    if (config.matches) {
      yupChain = yupChain.matches(config.matches);
    }

    return yupChain;
  },
  decimal(label, config) {
    config = config || {};
    let yupChain = yup
      .number()
      .transform((cv, ov) => {
        return ov === '' ? null : cv;
      })
      .nullable(true)
      .label(label);

    if (config.required) {
      yupChain = yupChain.required();
    }

    if (config.min || config.min === 0) {
      yupChain = yupChain.min(config.min);
    }

    if (config.max) {
      yupChain = yupChain.max(config.max);
    }

    return yupChain;
  },
  datetime(label, config) {
    config = config || {};
    let yupChain = yup
      .mixed()
      .nullable(true)
      .label(label)
      .transform((value, originalValue) =>
        value
          ? moment(
              originalValue,
              'YYYY-MM-DD HH:mm',
            ).toISOString()
          : null,
      );

    if (config.required) {
      yupChain = yupChain.required();
    }

    return yupChain;
  },
  date(label, config) {
    config = config || {};
    let yupChain = yup
      .mixed()
      .nullable(true)
      .label(label)
      .test(
        'is-date',
        "Erro data",
        (value) => {
          if (!value) {
            return true;
          }

          return moment(value, 'YYYY-MM-DD').isValid();
        },
      )
      .transform((value) =>
        value ? moment(value).format('YYYY-MM-DD') : null,
      );

    if (config.required) {
      yupChain = yupChain.required();
    }

    return yupChain;
  },
};

export default yupFormSchemas;
