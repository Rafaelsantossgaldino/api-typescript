import * as  create  from './Create';
import * as deleteByIdValidation from './DeleteById';
import * as getAll from './GetAll';
import * as  getById  from './GetById';
import * as updateByIdValidation from './UpdateById';

export const CidadesController =  {
  ...updateByIdValidation,
  ...deleteByIdValidation,
  ...getById,
  ...create,
  ...getAll,
};

